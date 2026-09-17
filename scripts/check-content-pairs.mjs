import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { parse } from 'yaml'

const blogDir = fileURLToPath(new URL('../content/blog', import.meta.url))

function readFrontmatter(filePath) {
  const raw = readFileSync(filePath, 'utf-8')
  const match = raw.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return null
  return parse(match[1])
}

const files = readdirSync(blogDir).filter(f => f.endsWith('.md'))

const groups = new Map()
for (const file of files) {
  const base = file.replace(/\.en\.md$/, '.md').replace(/\.md$/, '')
  if (!groups.has(base)) groups.set(base, [])
  groups.get(base).push(file)
}

let hasError = false

for (const [base, group] of groups) {
  if (group.length < 2) {
    console.warn(`[check:content] "${base}" has only ${group.length} locale file(s): ${group.join(', ')}`)
    continue
  }

  const parsed = group.map(file => ({ file, data: readFrontmatter(path.join(blogDir, file)) }))
  const [first, ...rest] = parsed

  for (const other of rest) {
    for (const field of ['slug', 'date']) {
      if (first.data[field] !== other.data[field]) {
        hasError = true
        console.error(
          `[check:content] Mismatch in "${field}" between ${first.file} (${first.data[field]}) and ${other.file} (${other.data[field]})`,
        )
      }
    }
  }
}

if (hasError) {
  console.error('[check:content] Locale-pair frontmatter drift detected.')
  process.exit(1)
}

console.log(`[check:content] OK — checked ${groups.size} article group(s).`)
