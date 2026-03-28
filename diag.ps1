$file = "C:\Users\Administrator\Downloads\LamHung-main\LamHung-main\src\App.tsx"
$enc = [System.Text.Encoding]::UTF8
$lines = [System.IO.File]::ReadAllLines($file, $enc)
Write-Host "Total lines: $($lines.Length)"
Write-Host "Line 557 (idx 556): [$($lines[556])]"
Write-Host "Line 558 (idx 557): [$($lines[557])]"
Write-Host "Line 559 (idx 558): [$($lines[558])]"
