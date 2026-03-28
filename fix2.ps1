$file = "c:\Users\Administrator\Downloads\LamHung-main\LamHung-main\src\App.tsx"
$lines = [System.IO.File]::ReadAllLines($file)
Write-Host "Original: $($lines.Count) lines"

# Remove old export code: lines 1567-1635 (0-indexed: 1566-1634)
$newLines = New-Object System.Collections.ArrayList
for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($i -ge 1566 -and $i -le 1634) { continue }
    [void]$newLines.Add($lines[$i])
}

Write-Host "New: $($newLines.Count) lines"
[System.IO.File]::WriteAllLines($file, $newLines.ToArray(), [System.Text.UTF8Encoding]::new($true))
Write-Host "Done!"
