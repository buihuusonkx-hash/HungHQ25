$f = "C:\Users\Administrator\Downloads\LamHung-main\LamHung-main\src\App.tsx"
$content = [System.IO.File]::ReadAllText($f, [System.Text.Encoding]::UTF8)
$content = $content.Replace('Them Bai Moi', "Th\u00eam B\u00e0i M\u1edbi")
$content = $content.Replace('Tu Dong Phan Bo', "T\u1ef1 \u0110\u1ed9ng Ph\u00e2n B\u1ed5")
$content = $content.Replace('Xuat File Word', "Xu\u1ea5t File Word")
[System.IO.File]::WriteAllText($f, $content, [System.Text.Encoding]::UTF8)
Write-Host "Done Vietnamese restore"
