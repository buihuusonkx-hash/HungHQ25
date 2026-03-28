$f = "C:\Users\Administrator\Downloads\LamHung-main\LamHung-main\src\App.tsx"
$lines = [System.IO.File]::ReadAllLines($f, [System.Text.Encoding]::UTF8)
$newLines = [System.Collections.Generic.List[string]]::new()
# Add lines 0..555 unchanged
for ($i = 0; $i -lt 556; $i++) { $newLines.Add($lines[$i]) }
# Add fixed content replacing lines 556..559 (0-indexed)
$newLines.Add('                   <button onClick={() => {')
$newLines.Add('                     if (data.length === 0) themChuongMoi();')
$newLines.Add('                     else themNoiDung(data.length - 1);')
$newLines.Add('                   }} className="px-5 py-2.5 bg-indigo-500 text-white rounded-lg font-bold text-xs flex items-center hover:bg-indigo-600 transition-all shadow-md">')
$newLines.Add('                     <Plus className="w-3.5 h-3.5 mr-2" /> Them Bai Moi')
$newLines.Add('                   </button>')
$newLines.Add('                   <button onClick={tuDongPhanBo} className="px-5 py-2.5 bg-emerald-500 text-white rounded-lg font-bold text-xs flex items-center hover:bg-emerald-600 transition-all shadow-md">')
$newLines.Add('                     <FileText className="w-3.5 h-3.5 mr-2" /> Tu Dong Phan Bo')
$newLines.Add('                   </button>')
$newLines.Add('                   <button onClick={exportToWord} className="px-5 py-2.5 bg-sky-600 text-white rounded-lg font-bold text-xs flex items-center hover:bg-sky-700 transition-all shadow-md">')
$newLines.Add('                     <Download className="w-3.5 h-3.5 mr-2" /> Xuat File Word')
$newLines.Add('                   </button>')
$newLines.Add('                 </div>')
$newLines.Add('               </div>')
$newLines.Add('')
$newLines.Add('              <div className="overflow-x-auto rounded-2xl border border-slate-200">')
$newLines.Add('                <table id="ma-tran-table" className="w-full border-collapse text-[11px] min-w-[1200px]">')
# Skip lines 556..559, continue from 560 onward
for ($i = 560; $i -lt $lines.Length; $i++) { $newLines.Add($lines[$i]) }
[System.IO.File]::WriteAllLines($f, $newLines, [System.Text.Encoding]::UTF8)
Write-Host "Fixed. New line count: $($newLines.Count)"
