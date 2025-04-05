$ErrorActionPreference = "Stop"

Set-Location wasm
wasm-pack build --dev --target web --out-dir ../public/wasm

$confirm = Read-Host "Do you want to visualize? (Y/N)"

if ($confirm -eq "N") {
  Set-Location ..
}
else {
  Write-Host "Visualizing..."
  Set-Location ..
  yarn dev
}
