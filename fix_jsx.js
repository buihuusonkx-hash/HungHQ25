const fs = require('fs');
const path = 'C:\\Users\\Administrator\\Downloads\\LamHung-main\\LamHung-main\\src\\App.tsx';
let lines = fs.readFileSync(path, 'utf8').split('\n');
console.log('Total lines:', lines.length);
console.log('Line 557:', JSON.stringify(lines[556]));
console.log('Line 558:', JSON.stringify(lines[557]));
console.log('Line 559:', JSON.stringify(lines[558]));
console.log('Line 560:', JSON.stringify(lines[559]));

// Fix: replace lines 556-559 (0-indexed) with correct content
const fixedLines = [
  '                   <button onClick={() => {',
  '                     if (data.length === 0) themChuongMoi();',
  '                     else themNoiDung(data.length - 1);',
  '                   }} className="px-5 py-2.5 bg-indigo-500 text-white rounded-lg font-bold text-xs flex items-center hover:bg-indigo-600 transition-all shadow-md">',
  '                     <Plus className="w-3.5 h-3.5 mr-2" /> Th\u00eam B\u00e0i M\u1edbi',
  '                   </button>',
  '                   <button onClick={tuDongPhanBo} className="px-5 py-2.5 bg-emerald-500 text-white rounded-lg font-bold text-xs flex items-center hover:bg-emerald-600 transition-all shadow-md">',
  '                     <FileText className="w-3.5 h-3.5 mr-2" /> T\u1ef1 \u0110\u1ed9ng Ph\u00e2n B\u1ed5',
  '                   </button>',
  '                   <button onClick={exportToWord} className="px-5 py-2.5 bg-sky-600 text-white rounded-lg font-bold text-xs flex items-center hover:bg-sky-700 transition-all shadow-md">',
  '                     <Download className="w-3.5 h-3.5 mr-2" /> Xu\u1ea5t File Word',
  '                   </button>',
  '                 </div>',
  '               </div>',
  '',
  '              <div className="overflow-x-auto rounded-2xl border border-slate-200">',
  '                <table id="ma-tran-table" className="w-full border-collapse text-[11px] min-w-[1200px]">',
];

// Remove lines 556..559 (the 4 broken lines) and splice in fixedLines
lines.splice(556, 4, ...fixedLines);

fs.writeFileSync(path, lines.join('\n'), 'utf8');
console.log('DONE! New total lines:', lines.length);
