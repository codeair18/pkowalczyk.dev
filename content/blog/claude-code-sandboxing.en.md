---
title: "Claude Code in a Sandbox: How to Configure It and Why It Actually Matters"
description: "A practical guide to sandboxing in Claude Code and real-world prompt injection incidents that show why isolating AI agents is essential."
locale: "en"
slug: "claude-code-sandboxing"
date: "2026-07-18"
image: "/images/blog/claude-code-sandboxing.svg"
author:
  name: "Przemek Kowalczyk"
  role: "Senior Full Stack Developer"
  avatar: "/android-chrome-512x512.png"
tags:
  - Claude Code
  - AI Security
  - Sandboxing
---

Claude Code can read your codebase, execute shell commands, connect to MCP servers, and push changes to your repository. That's exactly what makes it useful as an agent — and exactly what makes it an attractive attack target. Below: how to actually configure sandboxing in Claude Code, followed by a series of documented, real-world prompt injection incidents that show why this is worth doing before, not after, an incident.

## Why a sandbox, not just "trusting the model"

By default, a coding agent asks for approval before every shell command. That gets tiring — and leads to approval fatigue: after enough prompts, users start clicking "approve" without reading them. Sandboxing flips this model: instead of asking every time, you define boundaries up front (which files, which domains), and the operating system enforces them at the process level — regardless of what the model "intended" to do, and even if an allowed command does more than its name suggests.

This distinction matters: permission rules are evaluated *before* a command runs, based on the command string. The sandbox enforces the boundary on the process that's already running, at the kernel level. In other words — even if a prompt injection tricks Claude Code into running a malicious command, the sandbox can still block actual access to files or the network.

## Quick start: `/sandbox`

The sandbox runs natively on macOS (via the built-in Seatbelt framework), Linux, and WSL2 (via bubblewrap). Native Windows isn't supported — there, you need to run Claude Code inside a WSL2 distribution.

```
/sandbox
```

This opens a panel with three tabs:

- **Mode** — whether sandboxed commands are auto-approved or still go through regular permission prompts
- **Overrides** — whether commands that can't run sandboxed are allowed to fall back to running unsandboxed (`allowUnsandboxedCommands`)
- **Config** — a view of the resolved configuration

On Linux/WSL2, two packages are required:

```bash
sudo apt-get install bubblewrap socat   # Ubuntu/Debian
sudo dnf install bubblewrap socat        # Fedora
```

`bubblewrap` enforces filesystem isolation, `socat` relays network traffic through the sandbox's proxy. The optional seccomp filter (which blocks Unix sockets) is installed via `npm install -g @anthropic-ai/sandbox-runtime`.

Choosing a mode in the panel writes to `.claude/settings.local.json` (not checked into git). To enable the sandbox globally across all projects, set `sandbox.enabled: true` in `~/.claude/settings.json`.

## Two operating modes

**Auto-allow** — commands attempt to run inside the sandbox and are automatically allowed without prompting. If a command needs a domain outside the allowed list, it falls back to the regular permission flow. Even in this mode, the following always apply: explicit deny rules, a confirmation prompt for `rm`/`rmdir` targeting `/` or the home directory, and content-scoped ask rules (e.g. `Bash(git push *)`).

**Regular permissions** — all Bash commands go through the normal approval flow, even when sandboxed. More control, more clicking.

In both modes, the filesystem and network boundaries are identical — the only difference is whether they need manual approval.

## Filesystem configuration

By default, sandboxed commands can write only to the current working directory and the session's temp directory. Read access is much broader — essentially the whole disk, except explicitly blocked paths (note: this default does *not* block reading files like `~/.aws/credentials` or `~/.ssh/`).

Example: widening write access for tools like `kubectl` or `terraform`:

```json
{
  "sandbox": {
    "enabled": true,
    "filesystem": {
      "allowWrite": ["~/.kube", "/tmp/build"]
    }
  }
}
```

Blocking read access to the whole home directory except the project itself:

```json
{
  "sandbox": {
    "enabled": true,
    "filesystem": {
      "denyRead": ["~/"],
      "allowRead": ["."]
    }
  }
}
```

Conflict resolution rule: the more specific path wins. A narrow `allowRead` can re-open part of a broader `denyRead`, but an exact `denyRead` (e.g. `~/.env`) always wins over a broad `allowRead` — meaning a wide allow can't silently expose a secret.

## Protecting credentials

A dedicated `sandbox.credentials` block (Claude Code ≥ 2.1.187) lets you explicitly name files and environment variables to protect:

```json
{
  "sandbox": {
    "enabled": true,
    "credentials": {
      "files": [
        { "path": "~/.aws/credentials", "mode": "deny" },
        { "path": "~/.ssh", "mode": "deny" }
      ],
      "envVars": [
        { "name": "GITHUB_TOKEN", "mode": "deny" },
        { "name": "NPM_TOKEN", "mode": "deny" }
      ]
    }
  }
}
```

Important: there's no built-in default list of secrets to protect — only what you explicitly list is restricted. The `mask` mode (Claude Code ≥ 2.1.199) keeps tools like `gh` or `npm` working by substituting the real token only at the network proxy layer, and only for the hosts you list (`injectHosts`) — the command itself never sees the real secret.

## Network — a "default deny" model

No domain is allowed by default. The first time a new domain is needed, Claude Code prompts for approval; you can pre-authorize this with `allowedDomains`:

```json
{
  "sandbox": {
    "enabled": true,
    "network": {
      "allowedDomains": ["*.github.com", "registry.npmjs.org"]
    }
  }
}
```

**Important security limitation**: the built-in proxy does not, by default, terminate or inspect TLS traffic — it makes its allow decision purely on the client-supplied hostname. That means a broad rule like `github.com` theoretically opens a path for techniques such as domain fronting. If your threat model requires stronger guarantees, you need to configure a custom proxy that terminates TLS.

## Enforcing sandboxing at the organization level

For administrators — configuration through managed settings, which developers cannot locally loosen (for boolean keys like `enabled`):

```json
{
  "sandbox": {
    "enabled": true,
    "failIfUnavailable": true,
    "allowUnsandboxedCommands": false
  }
}
```

- `failIfUnavailable` — a missing dependency (e.g. bubblewrap) blocks Claude Code from starting instead of silently falling back to running unsandboxed
- `allowUnsandboxedCommands: false` — disables the `dangerouslyDisableSandbox` escape hatch entirely, so no command can "escape" the sandbox

It's worth also setting `allowManagedDomainsOnly` and `allowManagedReadPathsOnly` to prevent developers from widening the allowed domains/paths locally — array-type keys (like `excludedCommands`) merge across every settings scope by default, so a developer can still append entries.

## What the sandbox does NOT do

- It only covers the Bash process and its child processes — Read/Edit/Write tools operate through a separate permission system
- It is not full isolation: with `enableWeakerNestedSandbox` (e.g. inside a container without privileged namespaces), isolation is noticeably weaker
- `allowAppleEvents` on macOS removes isolation around launching other applications
- Exposing `docker.sock` via `allowUnixSockets` effectively grants full access to the host
- It reduces risk, it is not an impenetrable fortress — Anthropic's own documentation is explicit about this

---

## Real-World Prompt Injection Cases

Below are documented, publicly disclosed incidents — not academic hypotheticals, but concrete CVEs and security researcher reports.

### 1. EchoLeak — Microsoft 365 Copilot (CVE-2025-32711, CVSS 9.3)

In June 2025, researchers at Aim Security disclosed the first documented zero-click prompt injection exploit against a production AI system. A single crafted email, with no user interaction required, was enough for Copilot to access internal files and transmit their contents to an attacker-controlled server. The hidden instructions reached the model during routine email summarization — antivirus software, firewalls, and static scanning were all irrelevant here, since the attack operated entirely in natural language, not code.

### 2. Slack AI — data leak from private channels (August 2024)

Researchers at PromptArmor disclosed a vulnerability in Slack AI that allowed an attacker to exfiltrate data from private channels they had no access to — including API keys shared in private developer channels — by placing a malicious instruction in a public channel or embedding it in an uploaded document.

### 3. Poisoning Claude Code — a software supply chain attack via GitHub Action

In January 2026, security researcher RyotaK (GMO Flatt Security) disclosed a critical flaw in Anthropic's `claude-code-action`. Eight days after disclosure, an unknown actor exploited the still-unpatched vulnerability to publish an unauthorized release that installed the OpenClaw AI agent on every developer and CI/CD system that updated the Cline CLI. The malicious package stayed live for roughly eight hours before the npm token was revoked. This is one of the first fully documented cases of an AI coding tool's own distribution infrastructure being compromised through an agent the project itself was running.

### 4. API key leak via `/proc/self/environ` in the Claude Code GitHub Action

Microsoft's Security Blog described (June 2026) an attack where a prompt injection embedded in public repository content (an issue or PR) caused Claude Code to directly read `/proc/self/environ` using the Read tool. The returned environ blob contained an unscrubbed ANTHROPIC_API_KEY. The attacker could then use whichever exfiltration channel the target workflow allowed — an attacker-controlled domain via WebFetch or Bash, a comment on an issue via GitHub MCP, or the action log itself. Anthropic mitigated this in Claude Code 2.1.128 by blocking access to sensitive `/proc` files.

### 5. Agentjacking via Sentry — an attack hitting Claude Code, Cursor, and Codex at once

Disclosed in June 2026 by Tenet Security, this attack required no breach of any kind. A single crafted error event, sent through a public Sentry credential requiring no authentication, injected attacker instructions into error data that Claude Code, Cursor, and Codex then executed as trusted diagnostic output. Tenet tested over 100 targets under controlled conditions and achieved an 85% success rate, while identifying nearly 2,400 organizations with publicly exposed Sentry credentials susceptible to this technique. Sentry itself called the flaw "technically not defensible."

### 6. Check Point — remote code execution via repository setting hooks

CVE-2025-59536 allowed remote code execution through malicious hooks planted in a repository's settings file — code that ran before the user even had a chance to see the trust dialog. A second flaw, CVE-2026-21852, allowed API key exfiltration by overriding a single environment variable, redirecting authenticated traffic to attacker-controlled infrastructure before any consent prompt appeared. In both cases, simply cloning and opening an untrusted repository was enough to trigger the attack.

### 7. "Claudy Day" — invisible prompt injection via a URL parameter on claude.ai

Researchers at Oasis Security described, in March 2026, a full attack chain against a default, out-of-the-box claude.ai session. Claude.ai lets you open a new chat pre-filled via a URL parameter. Researchers found that certain HTML tags could be embedded in that parameter — invisible in the text box, but fully processed by Claude once the user hit Enter. An attacker could hide arbitrary instructions, including data-extraction commands, inside what looked like a normal prompt — no integrations, tools, or MCP servers required. The issue has since been fixed.

### 8. Perplexity Comet — an agentic browser hijacked via a calendar invite

Zenity Labs disclosed that Perplexity Comet's agentic browser could be hijacked through a malicious calendar invite containing a prompt injection payload, causing it to access the local filesystem, browse directories, open and read files, and exfiltrate data. The attack requires no user interaction beyond accepting what looks like a legitimate meeting invite.

### 9. Microsoft Semantic Kernel — RCE from any prompt injection vector

Microsoft's Defender Security Research Team identified two critical vulnerabilities in Semantic Kernel — CVE-2026-26030 (Python SDK) and CVE-2026-25592 (.NET SDK) — where an attacker with any prompt injection vector at all could achieve remote code execution on the machine hosting the agent.

### 10. The scale of the problem, in numbers

According to CrowdStrike's 2026 Global Threat Report, threat actors injected malicious prompts into legitimate generative AI tools at more than 90 organizations in 2025, using those injections to generate commands that stole credentials and cryptocurrency. The report's summary is blunt: prompts are the new malware, and overall AI-enabled attack volume grew 89% year over year in that period.

---

## Practical Takeaways

The common thread across these incidents: the attacker almost never talks to the model directly. The payload arrives through content the agent has to process anyway as part of a legitimate task — a code comment, a bug report, an email, a calendar invite, a repository settings file. That's exactly why OS-level sandboxing is worth having regardless of how well-trained the model is: the sandbox doesn't try to recognize a malicious instruction in the content — it limits what any command, malicious or not, can actually do.

A practical minimum checklist for working with untrusted content (external repositories, third-party issues, MCP data):

1. Enable the sandbox (`sandbox.enabled: true`) and treat auto-allow as the default working mode
2. Explicitly block reads of credential directories (`~/.ssh`, `~/.aws`) via `sandbox.credentials`
3. Restrict `allowedDomains` to specific, trusted hosts — avoid broad wildcards like `*.github.com` where possible
4. In CI/CD, disable `allowUnsandboxedCommands` and set `failIfUnavailable: true`
5. Audit MCP servers before installing them the same way you'd audit any npm dependency — for file access, network calls, and injected system prompts
