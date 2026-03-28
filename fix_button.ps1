$f = "C:\Users\Administrator\Downloads\LamHung-main\LamHung-main\src\App.tsx"
$lines = [System.IO.File]::ReadAllLines($f, [System.Text.Encoding]::UTF8)
$lines[556] = '                   <button onClick={() => {'
$lines[557] = '                     if (data.length === 0) themChuongMoi();'
$lines[558] = '                     else themNoiDung(data.length - 1);'
$lines[559] = '                   }} className="px-5 py-2.5 bg-indigo-500 text-white rounded-lg font-bold text-xs flex items-center hover:bg-indigo-600 transition-all shadow-md">'
[System.IO.File]::WriteAllLines($f, $lines, [System.Text.Encoding]::UTF8)
Write-Host "Done line fix"
