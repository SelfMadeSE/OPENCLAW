/**
 * Post-build script: patches Next.js .nft.json files to include
 * sql.js's WASM binary, which Next.js tracing doesn't pick up
 * automatically.
 */
const path = require('path')
const fs = require('fs')

const NFT_GLOB = '.next/server/**/route.js.nft.json'
const WASM_REL = '../../../../../../node_modules/sql.js/dist/sql-wasm.wasm'

// Simple recursive glob since glob may not be installed
function findFiles(dir, pattern) {
  const results = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.name === 'node_modules') continue
    if (entry.isDirectory()) {
      results.push(...findFiles(fullPath, pattern))
    } else if (entry.name.endsWith('nft.json')) {
      results.push(fullPath)
    }
  }
  return results
}

const nftFiles = findFiles('.next', /\.nft\.json$/)
let patchedCount = 0

for (const nftPath of nftFiles) {
  const manifest = JSON.parse(fs.readFileSync(nftPath, 'utf8'))
  if (manifest.files.some((f) => f.includes('sql-wasm.wasm'))) continue

  const hasSqlJs = manifest.files.some((f) => f.includes('sql.js'))
  if (!hasSqlJs) continue

  manifest.files.push(WASM_REL)
  fs.writeFileSync(nftPath, JSON.stringify(manifest, null, 2))
  patchedCount++
}

console.log(`Patched ${patchedCount} .nft.json files with sql-wasm.wasm reference.`)
