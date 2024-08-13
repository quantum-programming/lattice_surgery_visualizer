$ErrorActionPreference = "Stop"

Set-Location visualizer/wasm
wasm-pack build --target web --out-dir ../public/wasm

$confirm = Read-Host "Do you want to visualize? (Y/N)"

if ($confirm -eq "N") {
  Set-Location ../..
}
else {
  Write-Host "Visualizing..."
  Set-Location ..
  yarn dev
  Set-Location ..
}
