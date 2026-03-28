$f = "C:\Users\Administrator\Downloads\LamHung-main\LamHung-main\src\App.tsx"
$lines = [System.IO.File]::ReadAllLines($f, [System.Text.Encoding]::UTF8)
Write-Host "L556: [" + $lines[555] + "]"
Write-Host "L557: [" + $lines[556] + "]"
Write-Host "L558: [" + $lines[557] + "]"
Write-Host "L559: [" + $lines[558] + "]"
Write-Host "L560: [" + $lines[559] + "]"
# Count leading spaces
$sp = ($lines[558] -replace "^(\s+).*", '$1').Length
Write-Host "L559 leading spaces: $sp"
$sp2 = ($lines[559] -replace "^(\s+).*", '$1').Length
Write-Host "L560 leading spaces: $sp2"
