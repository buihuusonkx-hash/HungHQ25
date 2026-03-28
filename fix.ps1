$file = "c:\Users\Administrator\Downloads\LamHung-main\LamHung-main\src\App.tsx"
$lines = [System.IO.File]::ReadAllLines($file)
Write-Host "Original line count: $($lines.Count)"

# Keep lines 1-1991 (index 0..1990) and lines 2305+ (index 2304+)
$newLines = New-Object System.Collections.ArrayList
for ($i = 0; $i -lt $lines.Count; $i++) {
    # Skip lines 1992-2304 (0-indexed: 1991-2303)
    if ($i -ge 1991 -and $i -le 2303) { continue }
    [void]$newLines.Add($lines[$i])
}

Write-Host "New line count: $($newLines.Count)"
[System.IO.File]::WriteAllLines($file, $newLines.ToArray(), [System.Text.UTF8Encoding]::new($true))
Write-Host "File saved successfully!"
