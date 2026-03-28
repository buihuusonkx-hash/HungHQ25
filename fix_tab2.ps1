$file = "C:\Users\Administrator\Downloads\LamHung-main\LamHung-main\src\App.tsx"
$enc = [System.Text.Encoding]::UTF8
$lines = [System.IO.File]::ReadAllLines($file, $enc)

$newLines = [System.Collections.Generic.List[string]]::new()

# Copy lines 0..555 (unchanged)
for ($i = 0; $i -lt 556; $i++) { $newLines.Add($lines[$i]) }

# Insert fixed buttons + new table header with 2 separate columns
$fixed = @(
'                   <button onClick={() => {',
'                     if (data.length === 0) themChuongMoi();',
'                     else themNoiDung(data.length - 1);',
'                   }} className="px-5 py-2.5 bg-indigo-500 text-white rounded-lg font-bold text-xs flex items-center hover:bg-indigo-600 transition-all shadow-md">',
'                     <Plus className="w-3.5 h-3.5 mr-2" /> Them Bai Moi',
'                   </button>',
'                   <button onClick={tuDongPhanBo} className="px-5 py-2.5 bg-emerald-500 text-white rounded-lg font-bold text-xs flex items-center hover:bg-emerald-600 transition-all shadow-md">',
'                     <FileText className="w-3.5 h-3.5 mr-2" /> Tu Dong Phan Bo',
'                   </button>',
'                   <button onClick={exportToWord} className="px-5 py-2.5 bg-sky-600 text-white rounded-lg font-bold text-xs flex items-center hover:bg-sky-700 transition-all shadow-md">',
'                     <Download className="w-3.5 h-3.5 mr-2" /> Xuat File Word',
'                   </button>',
'                 </div>',
'               </div>',
'',
'              <div className="overflow-x-auto rounded-2xl border border-slate-200">',
'                <table id="ma-tran-table" className="w-full border-collapse text-[11px] min-w-[1400px]">',
'                  <thead>',
'                    <tr className="bg-slate-900 text-white text-center text-[11px] font-black">',
'                      <th className="border border-slate-700 p-3" rowSpan={3}>STT</th>',
'                      <th className="border border-slate-700 p-3" rowSpan={3}>SO TIET</th>',
'                      <th className="border border-slate-700 p-3 text-center" rowSpan={3}>Noi dung kien thuc</th>',
'                      <th className="border border-slate-700 p-3 text-center" rowSpan={3}>Don vi kien thuc</th>',
'                      <th className="border border-slate-700 p-2 tracking-wide" colSpan={8}>SO CAU HOI THEO MUC DO NHAN THUC</th>',
'                      <th className="border border-slate-700 p-3 w-20" rowSpan={3}>TONG SO CAU</th>',
'                      <th className="border border-slate-700 p-3 w-16" rowSpan={3}>TY LE (%)</th>',
'                    </tr>',
'                    <tr className="text-white text-center text-[10px] font-black tracking-wide">',
'                      <th className="border border-slate-600 p-2" colSpan={2} style={{background:"#065f46"}}>TRAC NGHIEM NHIEU PHUONG AN</th>',
'                      <th className="border border-slate-600 p-2" colSpan={3} style={{background:"#92400e"}}>TRAC NGHIEM DUNG/SAI</th>',
'                      <th className="border border-slate-600 p-2" colSpan={3} style={{background:"#7f1d1d"}}>TRA LOI NGAN</th>',
'                    </tr>',
'                    <tr className="text-center text-[10px] font-black">',
'                      <th className="border border-slate-300 p-2 w-12" style={{background:"#d1fae5",color:"#065f46"}}>Biet</th>',
'                      <th className="border border-slate-300 p-2 w-12" style={{background:"#d1fae5",color:"#065f46"}}>Hieu</th>',
'                      <th className="border border-slate-300 p-2 w-12" style={{background:"#fef3c7",color:"#92400e"}}>Biet</th>',
'                      <th className="border border-slate-300 p-2 w-12" style={{background:"#fef3c7",color:"#92400e"}}>Hieu</th>',
'                      <th className="border border-slate-300 p-2 w-16" style={{background:"#fef3c7",color:"#92400e"}}>Van dung</th>',
'                      <th className="border border-slate-300 p-2 w-12" style={{background:"#ffe4e6",color:"#7f1d1d"}}>Hieu</th>',
'                      <th className="border border-slate-300 p-2 w-16" style={{background:"#ffe4e6",color:"#7f1d1d"}}>Van dung</th>',
'                      <th className="border border-slate-300 p-2 w-16" style={{background:"#ffe4e6",color:"#7f1d1d"}}>VD/VDC</th>',
'                    </tr>',
'                  </thead>'
)

foreach ($line in $fixed) { $newLines.Add($line) }

# Skip old lines 556..594 (the broken button + old table headers), keep from 595 onward
# But we need to update the tbody rows to add the extra column (don vi kien thuc)
# For now: find the tbody and update row mapping

for ($i = 594; $i -lt $lines.Length; $i++) {
    $line = $lines[$i]
    # In tbody rows: find the line that renders tenNoiDung and split into 2 cells
    if ($line -match '(.*)<td.*font-semibold text-slate-800.*>(.*tenNoiDung.*)</td>(.*)') {
        # The chuong name goes in first td, nd.tenNoiDung in second td
        $prefix = $matches[1]
        $newLines.Add("$prefix<td className=""border border-slate-200 p-3 font-semibold text-slate-700"">{nd.chuong || ''}</td>")
        $newLines.Add("$prefix<td className=""border border-slate-200 p-3 font-semibold text-slate-800"">{nd.tenNoiDung || <span className=""text-slate-300 italic font-normal"">Chua nhap...</span>}</td>")
    } elseif ($line -match 'colSpan=\{3\}.*TONG CONG' -or $line -match 'colspan.*3.*TONG') {
        $newLines.Add($line -replace 'colSpan=\{3\}', 'colSpan={4}')
    } elseif ($line -match 'colSpan=\{12\}') {
        $newLines.Add($line -replace 'colSpan=\{12\}', 'colSpan={13}')
    } elseif ($line -match 'colSpan=\{13\}') {
        $newLines.Add($line -replace 'colSpan=\{13\}', 'colSpan={14}')
    } else {
        $newLines.Add($line)
    }
}

[System.IO.File]::WriteAllLines($file, $newLines, $enc)
Write-Host "DONE! Fixed file. New lines: $($newLines.Count)"
