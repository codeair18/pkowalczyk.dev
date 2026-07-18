---
title: "Claude Code w piaskownicy: jak skonfigurować sandboxing i dlaczego to naprawdę ma znaczenie"
description: "Praktyczny przewodnik po sandboxingu w Claude Code oraz rzeczywistych incydentach prompt injection, które pokazują, dlaczego izolacja agentów AI jest niezbędna."
locale: "pl"
slug: "claude-code-sandboxing"
date: "2026-07-18"
image: "/images/blog/claude-code-sandboxing.svg"
author:
  name: "Przemek Kowalczyk"
  role: "Senior Full Stack Developer"
  avatar: "/android-chrome-512x512.png"
tags:
  - Claude Code
  - Bezpieczeństwo AI
  - Sandboxing
---

Claude Code potrafi czytać Twój kod, wykonywać polecenia w powłoce, łączyć się z serwerami MCP i pushować zmiany do repozytorium. To właśnie czyni go użytecznym agentem — i to samo czyni go atrakcyjnym celem ataku. Poniżej: jak realnie skonfigurować sandbox w Claude Code oraz seria udokumentowanych, prawdziwych przypadków prompt injection, które pokazują, dlaczego warto to zrobić zanim, a nie po incydencie.

## Dlaczego sandbox, a nie tylko "zaufanie do modelu"

Domyślnie agent kodujący prosi o zgodę na każdą komendę powłoki. To męczące — i prowadzi do tzw. approval fatigue: użytkownik po którejś z kolei prośbie klika "zatwierdź" bez czytania. Sandbox odwraca ten model: zamiast pytać za każdym razem, z góry definiujesz granice (które pliki, które domeny), a system operacyjny egzekwuje je na poziomie procesu — niezależnie od tego, co model "chciał" zrobić i czy dana komenda robi więcej, niż sugeruje jej nazwa.

To rozróżnienie jest kluczowe: reguły uprawnień (permissions) są oceniane *przed* uruchomieniem komendy na podstawie jej treści; sandbox egzekwuje granicę na uruchomionym już procesie, na poziomie jądra systemu. Innymi słowy — nawet jeśli prompt injection nakłoni Claude Code do wykonania złośliwej komendy, sandbox może i tak zablokować faktyczny dostęp do plików czy sieci.

## Szybki start: `/sandbox`

Sandbox działa natywnie na macOS (przez wbudowany framework Seatbelt), Linuksie i WSL2 (przez bubblewrap). Natywny Windows nie jest wspierany — tam trzeba uruchomić Claude Code wewnątrz dystrybucji WSL2.

```
/sandbox
```

Otwiera to panel z trzema zakładkami:
- **Mode** — czy sandboksowane komendy mają być auto-zatwierdzane, czy nadal przechodzić przez zwykłe pytania o zgodę
- **Overrides** — czy komendy, które nie dają się uruchomić w sandboksie, mogą "spaść" do trybu bez izolacji (`allowUnsandboxedCommands`)
- **Config** — podgląd wynikowej konfiguracji

Na Linuksie/WSL2 potrzebne są dwa pakiety:

```bash
sudo apt-get install bubblewrap socat   # Ubuntu/Debian
sudo dnf install bubblewrap socat        # Fedora
```

`bubblewrap` egzekwuje izolację systemu plików, `socat` przekierowuje ruch sieciowy przez proxy sandboksa. Opcjonalny filtr seccomp (blokujący gniazda Unix) instaluje się przez `npm install -g @anthropic-ai/sandbox-runtime`.

Wybór trybu w panelu zapisuje się lokalnie, w `.claude/settings.local.json` (nie trafia do gita). Żeby włączyć sandbox globalnie dla wszystkich projektów, ustaw `sandbox.enabled: true` w `~/.claude/settings.json`.

## Dwa tryby pracy

**Auto-allow** — komendy próbują uruchomić się w sandboksie i są automatycznie dopuszczane, bez pytania. Jeśli komenda potrzebuje dostępu do domeny spoza listy dozwolonych, wraca do zwykłego procesu zatwierdzania. Nawet w tym trybie zawsze obowiązują: jawne reguły odmowy (`deny`), potwierdzenie dla `rm`/`rmdir` celujących w `/` lub katalog domowy, oraz reguły `ask` dotyczące konkretnej treści (np. `Bash(git push *)`).

**Regular permissions** — wszystkie komendy Bash przechodzą przez zwykły proces zatwierdzania, nawet jeśli działają w sandboksie. Więcej kontroli, więcej klikania.

W obu trybach granice systemu plików i sieci są identyczne — różnica dotyczy wyłącznie tego, czy trzeba je ręcznie zatwierdzać.

## Konfiguracja systemu plików

Domyślnie sandboksowane komendy mogą zapisywać wyłącznie do bieżącego katalogu roboczego i katalogu tymczasowego sesji. Odczyt jest szerszy — obejmuje praktycznie cały dysk, poza wyraźnie zablokowanymi ścieżkami (i uwaga: to domyślnie *nie* blokuje odczytu plików takich jak `~/.aws/credentials` czy `~/.ssh/`).

Przykład rozszerzenia dostępu zapisu dla narzędzi typu `kubectl` czy `terraform`:

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

Blokowanie odczytu całego katalogu domowego z wyjątkiem projektu:

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

Zasada rozstrzygania konfliktów: bardziej szczegółowa ścieżka wygrywa. Wąski `allowRead` potrafi "odsłonić" fragment szerszego `denyRead`, ale dokładny `denyRead` (np. `~/.env`) zawsze wygrywa nad szerokim `allowRead` — czyli szeroki allow nie może po cichu odsłonić sekretu.

## Ochrona danych uwierzytelniających

Osobny blok `sandbox.credentials` (Claude Code ≥ 2.1.187) pozwala jawnie wskazać pliki i zmienne środowiskowe do ochrony:

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

Ważne: nie ma wbudowanej domyślnej listy sekretów do ochrony — chronione jest tylko to, co jawnie wymienisz. Tryb `mask` (Claude Code ≥ 2.1.199) pozwala zachować działanie narzędzi typu `gh` czy `npm`, podstawiając prawdziwy token dopiero na poziomie proxy sieciowego, tylko dla wskazanych hostów (`injectHosts`) — sama komenda nigdy nie widzi prawdziwego sekretu.

## Sieć — model "domyślnie zero zaufania"

Żadna domena nie jest dozwolona domyślnie. Pierwsze użycie nowej domeny wywołuje pytanie o zgodę; można to obejść z góry, wypełniając `allowedDomains`:

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

**Istotne ograniczenie bezpieczeństwa**: wbudowane proxy domyślnie *nie* terminuje ani nie inspekcjonuje ruchu TLS — decyzję o dopuszczeniu podejmuje wyłącznie na podstawie nazwy hosta podanej przez klienta. Oznacza to, że szeroka reguła w stylu `github.com` teoretycznie otwiera drogę do technik takich jak domain fronting. Jeśli model zagrożenia tego wymaga, trzeba skonfigurować własne proxy terminujące TLS.

## Wymuszanie sandboksa w organizacji

Dla administratorów — konfiguracja przez managed settings, której deweloperzy nie mogą lokalnie poluzować (dla kluczy logicznych typu `enabled`):

```json
{
  "sandbox": {
    "enabled": true,
    "failIfUnavailable": true,
    "allowUnsandboxedCommands": false
  }
}
```

- `failIfUnavailable` — brak wymaganej zależności (np. bubblewrap) blokuje start Claude Code zamiast ciche uruchomienie bez izolacji
- `allowUnsandboxedCommands: false` — wyłącza furtkę `dangerouslyDisableSandbox`, więc żadna komenda nie może "uciec" z sandboksa

Warto dodać `allowManagedDomainsOnly` i `allowManagedReadPathsOnly`, żeby zablokować deweloperom możliwość rozszerzania listy dozwolonych domen/ścieżek lokalnie — pola tablicowe (np. `excludedCommands`) domyślnie łączą się ze wszystkich zakresów ustawień, więc deweloper i tak może coś dopisać.

## Czego sandbox NIE robi

- Obejmuje wyłącznie proces Bash i jego procesy potomne — narzędzia Read/Edit/Write działają przez osobny system uprawnień
- Nie jest pełną izolacją: przy `enableWeakerNestedSandbox` (np. w kontenerze bez uprzywilejowanych namespace'ów) izolacja jest wyraźnie słabsza
- `allowAppleEvents` na macOS usuwa izolację uruchamiania innych aplikacji
- Zmienna `docker.sock` udostępniona przez `allowUnixSockets` praktycznie daje pełny dostęp do hosta
- To redukcja ryzyka, nie twierdza nie do zdobycia — dokumentacja Anthropic wprost to podkreśla

---

## Realne przypadki prompt injection z życia

Poniżej udokumentowane, publicznie ujawnione incydenty — nie hipotezy z artykułów akademickich, tylko konkretne CVE i raporty badaczy bezpieczeństwa.

### 1. EchoLeak — Microsoft 365 Copilot (CVE-2025-32711, CVSS 9.3)
W czerwcu 2025 badacze Aim Security ujawnili pierwszy udokumentowany atak typu zero-click prompt injection na produkcyjny system AI. Wystarczył jeden spreparowany e-mail, bez żadnej interakcji użytkownika, by Copilot uzyskał dostęp do plików wewnętrznych i przesłał ich zawartość na serwer kontrolowany przez atakującego. Ukryte instrukcje trafiały do modelu podczas rutynowego podsumowywania wiadomości — antywirusy, firewalle i skanowanie statyczne nie miały tu nic do powiedzenia, bo atak działał w naturalnym języku, nie w kodzie.

### 2. Slack AI — wyciek z prywatnych kanałów (sierpień 2024)
Badacze PromptArmor ujawnili lukę w Slack AI, która pozwalała atakującemu wykraść dane z prywatnych kanałów Slacka, do których nie miał dostępu — w tym klucze API udostępnione w prywatnych kanałach deweloperskich — poprzez umieszczenie złośliwej instrukcji na kanale publicznym lub w załączonym dokumencie.

### 3. Poisoning Claude Code — łańcuch dostaw przez GitHub Action
W styczniu 2026 badacz RyotaK (GMO Flatt Security) ujawnił krytyczną lukę w `claude-code-action` Anthropica. Osiem dni po ujawnieniu, nieznany podmiot wykorzystał niezałataną lukę, by opublikować nieautoryzowane wydanie instalujące agenta OpenClaw na każdym systemie deweloperskim i CI/CD, który zaktualizował Cline CLI. Pakiet pozostawał aktywny przez około osiem godzin, zanim token npm został unieważniony. To jeden z pierwszych w pełni udokumentowanych przypadków kompromitacji własnej infrastruktury dystrybucji narzędzia AI, przeprowadzonej przez agenta, który to narzędzie samo obsługiwało.

### 4. Wyciek klucza API przez `/proc/self/environ` w Claude Code GitHub Action
Microsoft Security Blog opisał (czerwiec 2026) atak, w którym prompt injection z publicznego repozytorium (treść issue/PR) skłoniła Claude Code do bezpośredniego odczytu `/proc/self/environ` narzędziem Read. Zwrócony blob environ zawierał nieoczyszczony klucz ANTHROPIC_API_KEY. Atakujący mógł następnie wykorzystać dowolny kanał eksfiltracji dostępny w danym workflow — kontrolowaną domenę przez WebFetch lub Bash, komentarz w issue przez GitHub MCP, albo log akcji. Anthropic załatało to w Claude Code 2.1.128, blokując dostęp do wrażliwych plików `/proc`.

### 5. Agentjacking przez Sentry — atak na Claude Code, Cursor i Codex jednocześnie
Ujawniony w czerwcu 2026 przez Tenet Security atak nie wymagał żadnego naruszenia zabezpieczeń. Pojedyncze, spreparowane zdarzenie błędu wysłane przez publiczny klucz uwierzytelniający Sentry — nie wymagający żadnego złamania zabezpieczeń ani autoryzacji — wstrzykiwało instrukcje atakującego do danych o błędzie, które Claude Code, Cursor i Codex następnie wykonywały jako zaufane dane diagnostyczne. Tenet przetestował ponad 100 celów w kontrolowanych warunkach, osiągając 85% skuteczności, a firma zidentyfikowała blisko 2400 organizacji z publicznie wystawionymi danymi uwierzytelniającymi Sentry podatnymi na tę technikę. Sentry określiło tę lukę jako "technicznie nie do obrony".

### 6. Check Point — zdalne wykonanie kodu przez hooki w ustawieniach repo
CVE-2025-59536 pozwalało na zdalne wykonanie kodu poprzez złośliwe hooki umieszczone w pliku ustawień repozytorium — kod uruchamiał się jeszcze zanim użytkownik zdążył przeczytać okno dialogowe zaufania. Drugie, CVE-2026-21852, umożliwiało wykradzenie klucza API poprzez nadpisanie jednej zmiennej środowiskowej, przekierowując uwierzytelniony ruch do infrastruktury atakującego jeszcze przed jakimkolwiek promptem zgody. W obu przypadkach samo sklonowanie i otwarcie niezaufanego repozytorium wystarczało, by wyzwolić atak.

### 7. "Claudy Day" — inwazyjny prompt injection przez parametr URL na claude.ai
Badacze Oasis Security opisali w marcu 2026 pełny łańcuch ataku na domyślnej, standardowej sesji claude.ai. Claude.ai pozwala otworzyć nowy czat z wcześniej wypełnionym promptem poprzez parametr URL. Odkryto, że pewne znaczniki HTML dało się osadzić w tym parametrze — niewidoczne w polu tekstowym, ale w pełni przetwarzane przez Claude po naciśnięciu Enter. Atakujący mógł ukryć dowolne instrukcje, łącznie z poleceniami ekstrakcji danych, w tym co wyglądało jak normalny prompt — bez żadnych integracji, narzędzi czy serwerów MCP. Podatność została naprawiona.

### 8. Perplexity Comet — przeglądarka agentowa przejęta przez zaproszenie kalendarzowe
Zenity Labs ujawniło, że agentowa przeglądarka Perplexity Comet może zostać przejęta poprzez złośliwe zaproszenie kalendarzowe zawierające ładunek prompt injection, co powodowało dostęp do lokalnego systemu plików, przeglądanie katalogów, otwieranie i odczyt plików oraz eksfiltrację danych. Atak nie wymaga żadnej interakcji użytkownika poza zaakceptowaniem tego, co wygląda na zwyczajne zaproszenie na spotkanie.

### 9. Microsoft Semantic Kernel — RCE z dowolnego wektora prompt injection
Zespół Microsoft Defender Security Research zidentyfikował dwie krytyczne podatności w Semantic Kernel — CVE-2026-26030 (SDK Python) i CVE-2026-25592 (SDK .NET) — gdzie atakujący dysponujący jakimkolwiek wektorem prompt injection mógł osiągnąć zdalne wykonanie kodu na maszynie hostującej agenta.

### 10. Skala zjawiska w liczbach
Według raportu CrowdStrike 2026 Global Threat Report, przeciwnicy wstrzykiwali złośliwe prompty do legalnych narzędzi generatywnej AI w ponad 90 organizacjach w 2025 roku, wykorzystując te wstrzyknięcia do generowania poleceń kradnących dane uwierzytelniające i kryptowaluty. Raport podsumowuje to wprost: prompty to nowe malware, a wolumen ataków wspieranych przez AI wzrósł w tym okresie o 89% rok do roku.

---

## Wnioski praktyczne

Wspólny mianownik tych incydentów: atakujący prawie nigdy nie rozmawia bezpośrednio z modelem. Ładunek trafia przez treść, którą agent i tak musi przetworzyć jako część legalnego zadania — komentarz w kodzie, zgłoszenie błędu, e-mail, zaproszenie kalendarzowe, plik ustawień repozytorium. To właśnie dlatego warstwa OS-level sandboxingu ma sens niezależnie od tego, jak dobrze wytrenowany jest model: sandbox nie próbuje rozpoznać złośliwej instrukcji w treści, tylko ogranicza, co jakakolwiek komenda — złośliwa czy nie — może faktycznie zrobić.

Praktyczny minimalny zestaw działań przy pracy z niezaufaną treścią (obce repozytoria, zewnętrzne issue, dane z MCP):

1. Włącz sandbox (`sandbox.enabled: true`) i traktuj auto-allow jako domyślny tryb pracy
2. Jawnie zablokuj odczyt katalogów z sekretami (`~/.ssh`, `~/.aws`) przez `sandbox.credentials`
3. Ogranicz `allowedDomains` do konkretnych, zaufanych hostów — unikaj szerokich wildcardów typu `*.github.com`, jeśli to możliwe
4. W CI/CD wyłącz `allowUnsandboxedCommands` i ustaw `failIfUnavailable: true`
5. Audytuj serwery MCP przed instalacją tak samo, jak dowolną zależność npm — pod kątem dostępu do plików, wywołań sieciowych i wstrzykniętych promptów systemowych
