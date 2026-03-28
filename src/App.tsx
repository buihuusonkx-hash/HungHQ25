/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// @ts-ignore
import React, { useState, useEffect } from 'react';
// @ts-ignore
import { PenSquare, FileText, Download, Plus, Trash2, ChevronRight, Sparkles, RefreshCw, CheckCircle, AlertCircle, BookOpen, Settings, X, Key, Search } from 'lucide-react';
import TabKiemTra from './components/TabKiemTra';
import SearchQuestion from './components/SearchQuestion';
// @ts-ignore
import { motion, AnimatePresence } from 'motion/react';
import { QUESTION_BANK, type QBankEntry } from './questionBank';
import { useMathRender } from './MathText';

// --- CƠ SỞ DỮ LIỆU CHUẨN CT 2018 (SÁCH CÁNH DIỀU) ---
const curriculumData: Record<string, Record<string, { nhanBiet: string; thongHieu: string; vanDung: string }>> = {
  "Chương VI. Một số yếu tố của xác suất": {
    "Xác suất có điều kiện": {
      nhanBiet: "- Nhận biết được khái niệm xác suất có điều kiện.",
      thongHieu: "- Tính được xác suất có điều kiện trong những trường hợp đơn giản.\n- Nhận biết được hai biến cố độc lập.",
      vanDung: "- Giải quyết được một số bài toán thực tế có sử dụng xác suất có điều kiện."
    },
    "Xác suất toàn phần": {
      nhanBiet: "- Nhận biết được công thức xác suất toàn phần.\n- Nhận biết được công thức Bayes.",
      thongHieu: "- Vận dụng được công thức xác suất toàn phần và công thức Bayes để tính toán xác suất trong các bài toán đơn giản.",
      vanDung: "- Giải quyết được một số bài toán thực tiễn gắn với công thức xác suất toàn phần và công thức Bayes."
    }
  },
  "Chương 1. Nguyên hàm, tích phân": {
    "Nguyên hàm": {
      nhanBiet: "- Nhận biết được khái niệm nguyên hàm của một hàm số.\n- Nhận biết được bảng nguyên hàm cơ bản.",
      thongHieu: "- Tính được nguyên hàm trong những trường hợp đơn giản.",
      vanDung: "- Giải quyết bài toán thực tiễn gắn với nguyên hàm."
    },
    "Tích phân": {
      nhanBiet: "- Nhận biết được khái niệm và tính chất của tích phân.",
      thongHieu: "- Tính được tích phân bằng bảng nguyên hàm và tính chất.",
      vanDung: "- Sử dụng phương pháp đổi biến, từng phần.\n- Ứng dụng tích phân giải quyết bài toán thực tế."
    }
  }
};

const defaultLevels = () => [
  { tenMucDo: 'Nhận biết', yeuCau: '', color: 'text-emerald-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-100', qs: { nlc: '', ds: '', tln: '' } },
  { tenMucDo: 'Thông hiểu', yeuCau: '', color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-100', qs: { nlc: '', ds: '', tln: '' } },
  { tenMucDo: 'Vận dụng', yeuCau: '', color: 'text-rose-600', bgColor: 'bg-rose-50', borderColor: 'border-rose-100', qs: { nlc: '', ds: '', tln: '' } }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('nhap-lieu');
  const [data, setData] = useState<any[]>([]);
  const [monHoc, setMonHoc] = useState('Toán');
  const [showAIConfig, setShowAIConfig] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');
  const [selectedModel, setSelectedModel] = useState(() => localStorage.getItem('gemini_model') || 'gemini-3-flash');

  // === ĐĂNG NHẬP ===
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('mmp_logged_in') === 'true');
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = () => {
    if (loginUser.trim() === 'Bui Thi Kiên' && loginPass === '12345') {
      setIsLoggedIn(true);
      localStorage.setItem('mmp_logged_in', 'true');
      setLoginError('');
    } else {
      setLoginError('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('mmp_logged_in');
    setLoginUser('');
    setLoginPass('');
  };

  const handleSaveAIConfig = () => {
    localStorage.setItem('gemini_api_key', apiKey);
    localStorage.setItem('gemini_model', selectedModel);
    setShowAIConfig(false);
  };

  // Khởi tạo 1 chương trống khi load app
  useEffect(() => {
    setData([{ tenChuong: '', noiDungs: [{ tenNoiDung: '', donVi: '', soTiet: 0, mucDos: defaultLevels() }] }]);
  }, []);

  const themChuongMoi = () => {
    setData([...data, { tenChuong: '', noiDungs: [{ tenNoiDung: '', soTiet: 0, mucDos: defaultLevels() }] }]);
  };

  const xoaChuong = (cIdx: number) => {
    const newData = data.filter((_, index) => index !== cIdx);
    setData(newData.length ? newData : [{ tenChuong: '', noiDungs: [{ tenNoiDung: '', soTiet: 0, mucDos: defaultLevels() }] }]);
  };

  const themNoiDung = (chuongIndex: number) => {
    const newData = [...data];
    newData[chuongIndex].noiDungs.push({ tenNoiDung: '', soTiet: 0, mucDos: defaultLevels() });
    setData(newData);
  };

  const xoaNoiDung = (chuongIndex: number, ndIndex: number) => {
    const newData = [...data];
    newData[chuongIndex].noiDungs = newData[chuongIndex].noiDungs.filter((_: any, index: number) => index !== ndIndex);
    if (newData[chuongIndex].noiDungs.length === 0) {
      newData[chuongIndex].noiDungs = [{ tenNoiDung: '', soTiet: 0, mucDos: defaultLevels() }];
    }
    setData(newData);
  };

  // HÀM XỬ LÝ LÕI: Tự động map Yêu cầu cần đạt
  const handleChonNoiDung = (chuongIndex: number, ndIndex: number, tenNoiDungSelected: string) => {
    const newData = JSON.parse(JSON.stringify(data));
    const chuong = newData[chuongIndex];
    const noiDung = chuong.noiDungs[ndIndex];
    
    noiDung.tenNoiDung = tenNoiDungSelected;

    const chuongData = curriculumData[chuong.tenChuong];
    if (chuongData && chuongData[tenNoiDungSelected]) {
      const yc = chuongData[tenNoiDungSelected];
      noiDung.mucDos[0].yeuCau = yc.nhanBiet;
      noiDung.mucDos[1].yeuCau = yc.thongHieu;
      noiDung.mucDos[2].yeuCau = yc.vanDung;
    } else {
      noiDung.mucDos.forEach((md: any) => md.yeuCau = '');
    }
    
    setData(newData);
  };

  // Cập nhật số câu hỏi
  const handleUpdateQS = (cIdx: number, nIdx: number, mIdx: number, field: string, value: string) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData[cIdx].noiDungs[nIdx].mucDos[mIdx].qs[field] = value;
    setData(newData);
  };

  // Cập nhật số tiết
  const handleUpdateSoTiet = (cIdx: number, nIdx: number, value: number) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData[cIdx].noiDungs[nIdx].soTiet = value;
    setData(newData);
  };

  // Hàm đếm số câu từ chuỗi (ví dụ: "Câu 1, 2" -> 2 câu)
  const countQuestions = (input: string) => {
    if (!input || !input.trim()) return 0;
    // Tách theo dấu phẩy, chấm phẩy hoặc từ "và", loại bỏ các phần tử rỗng
    return input.split(/[,;\s]+(v\u00E0)?\s*/).filter(s => s && s.match(/\d/)).length;
  };

  // Tính tổng số câu và điểm
  // p1 = TNPA (câu 1-12), p2 = Đúng/Sai số câu (câu 13-16), p3 = TLN (câu 17-22)
  // Mỗi câu Đúng/Sai có 4 ý (NB + TH + TH + VD), điểm mỗi câu = 1đ
  // Mỗi câu TLN: NB×0.5đ, TH×0.5đ, VD×0.5đ, VDC×0.5đ
  const getTotals = () => {
    let p1 = 0, p2 = 0, p3 = 0;
    data.forEach(c => {
      c.noiDungs.forEach((nd: any) => {
        // TNPA: chỉ đếm mức NB và TH (mức 0 và 1)
        p1 += countQuestions(nd.mucDos[0].qs.nlc);
        p1 += countQuestions(nd.mucDos[1].qs.nlc);
        // DS: tổng số câu (mọi mức)
        nd.mucDos.forEach((md: any) => {
          p2 += countQuestions(md.qs.ds);
        });
        // TLN: tổng câu từ cả 3 mức (NB câu 17,18 + TH câu 19,20 + VD/VDC câu 21,22)
        nd.mucDos.forEach((md: any) => {
          p3 += countQuestions(md.qs.tln);
        });
      });
    });
    return { 
      p1, p2, p3, 
      total: p1 + p2 + p3,
      score1: p1 * 0.25,
      score2: p2 * 1.0,
      score3: p3 * 0.5,
      totalScore: (p1 * 0.25) + (p2 * 1.0) + (p3 * 0.5)
    };
  };

  const totals = getTotals();

  // THUAT TOAN TU DONG PHAN BO (CHUAN 2025)
  const tuDongPhanBo = () => {
    const newData = JSON.parse(JSON.stringify(data));
    const totalSotiet = newData.reduce((acc: number, c: any) => acc + c.noiDungs.reduce((sum: number, nd: any) => sum + (nd.soTiet || 0), 0), 0);

    if (totalSotiet === 0) {
      alert("Vui long nhap 'So tiet' truoc khi tu dong phan bo!");
      return;
    }

    // Flat list
    const allItems: any[] = [];
    newData.forEach((c: any, cIdx: number) => {
      c.noiDungs.forEach((nd: any, nIdx: number) => {
        allItems.push({ cIdx, nIdx, soTiet: nd.soTiet || 0 });
      });
    });

    // Largest Remainder Method
    const lrm = (total: number): number[] => {
      const exact = allItems.map(it => (it.soTiet / totalSotiet) * total);
      const fl = exact.map(v => Math.floor(v));
      let rem = total - fl.reduce((a, b) => a + b, 0);
      exact.map((v, i) => ({ r: v - fl[i], i }))
           .sort((a, b) => b.r - a.r)
           .slice(0, rem)
           .forEach(({ i }) => fl[i]++);
      return fl;
    };

    const alloc1 = lrm(12); // TNPA: cau 1-12
    const alloc2 = lrm(4);  // DS: cau 13-16
    const alloc3 = lrm(6);  // TLN: cau 17-22

    let nlc = 1, ds = 13, tln = 17;

    allItems.forEach((item, i) => {
      const { cIdx, nIdx } = item;
      const nd = newData[cIdx].noiDungs[nIdx];
      nd.mucDos.forEach((md: any) => { md.qs.nlc = ''; md.qs.ds = ''; md.qs.tln = ''; });

      // TNPA: NB (~60%) => mucDos[0], TH (~40%) => mucDos[1]
      const c1 = alloc1[i];
      const c1NB = Math.ceil(c1 * 0.6), c1TH = c1 - c1NB;
      for (let k = 0; k < c1NB; k++) {
        const cur = nd.mucDos[0].qs.nlc;
        nd.mucDos[0].qs.nlc = (cur ? cur + ', ' : '') + `Cau ${nlc++}`;
      }
      for (let k = 0; k < c1TH; k++) {
        const cur = nd.mucDos[1].qs.nlc;
        nd.mucDos[1].qs.nlc = (cur ? cur + ', ' : '') + `Cau ${nlc++}`;
      }

      // DS: tat ca vao mucDos[0] (1 cau = 4 y: a=NB, b,c=TH, d=VD)
      const c2 = alloc2[i];
      for (let k = 0; k < c2; k++) {
        const cur = nd.mucDos[0].qs.ds;
        nd.mucDos[0].qs.ds = (cur ? cur + ', ' : '') + `Cau ${ds++}`;
      }

      // TLN (chuan 2025): TH (cau 17,18) => mucDos[1]; VD+VDC (cau 19-22) => mucDos[2]
      // Khong co NB trong TLN
      const c3 = alloc3[i];
      const c3TH  = Math.round(c3 * 2 / 6); // ~2 cau TH
      const c3VD  = c3 - c3TH;               // phan con lai = VD+VDC (4 cau)
      // mucDos[0].qs.tln = '' (khong co NB)
      for (let k = 0; k < c3TH; k++) {
        const cur = nd.mucDos[1].qs.tln;
        nd.mucDos[1].qs.tln = (cur ? cur + ', ' : '') + `Cau ${tln++}`;
      }
      for (let k = 0; k < c3VD; k++) {
        const cur = nd.mucDos[2].qs.tln;
        nd.mucDos[2].qs.tln = (cur ? cur + ', ' : '') + `Cau ${tln++}`;
      }
    });

    setData(newData);
  };

  const calculateRowSpan = (chuong: any) => {
    return chuong.noiDungs.reduce((total: number, nd: any) => total + nd.mucDos.length, 0);
  };

  let globalRowIdx = 0; // Để tính STT liên tục cho bài học

  const exportToWord = () => {
    const tableElement = document.getElementById('ma-tran-table');
    if (!tableElement) {
      alert("Không tìm thấy bảng để xuất!");
      return;
    }

    const cloneTable = tableElement.cloneNode(true) as HTMLTableElement;
    cloneTable.setAttribute('border', '1');
    cloneTable.style.borderCollapse = 'collapse';
    cloneTable.style.width = '100%';

    const html = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Ma trận Đề kiểm tra</title>
        <style>
          table { border-collapse: collapse; width: 100%; font-family: "Times New Roman", Times, serif; font-size: 11pt; }
          th, td { border: 1px solid black; padding: 5px; text-align: center; vertical-align: middle; }
          th { font-weight: bold; }
        </style>
      </head>
      <body>
        <h2 style="text-align: center; font-family: 'Times New Roman', Times, serif; font-weight: bold;">MA TRẬN ĐỀ KIỂM TRA MÔN TOÁN 12</h2>
        ${cloneTable.outerHTML}
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', html], {
      type: 'application/msword'
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Ma_Tran_De_Thi.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportToWordDacTa = () => {
    const tableElement = document.getElementById('dac-ta-table');
    if (!tableElement) {
      alert("Không tìm thấy bảng đặc tả để xuất!");
      return;
    }

    const cloneTable = tableElement.cloneNode(true) as HTMLTableElement;
    cloneTable.setAttribute('border', '1');
    cloneTable.style.borderCollapse = 'collapse';
    cloneTable.style.width = '100%';

    const html = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Bản Đặc tả Đề kiểm tra</title>
        <style>
          table { border-collapse: collapse; width: 100%; font-family: "Times New Roman", Times, serif; font-size: 11pt; }
          th, td { border: 1px solid black; padding: 5px; text-align: center; vertical-align: middle; }
          .text-left { text-align: left; }
          th { font-weight: bold; }
        </style>
      </head>
      <body>
        <h2 style="text-align: center; font-family: 'Times New Roman', Times, serif; font-weight: bold;">BẢN ĐẶC TẢ ĐỀ KIỂM TRA MÔN TOÁN 12</h2>
        ${cloneTable.outerHTML}
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', html], {
      type: 'application/msword'
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Ban_Dac_Ta_De_Thi.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // === TRANG ĐĂNG NHẬP ===
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-white mb-2 tracking-tight italic">Math Matrix <span className="text-indigo-400">Pro</span></h1>
            <div className="h-1 w-16 bg-indigo-500 mx-auto mb-4 rounded-full"></div>
            <p className="text-slate-400 text-sm">Đăng nhập để truy cập hệ thống</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 block">Tên đăng nhập</label>
                <input
                  type="text"
                  value={loginUser}
                  onChange={e => setLoginUser(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  placeholder="Nhập tên đăng nhập..."
                  className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-slate-500 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 block">Mật khẩu</label>
                <input
                  type="password"
                  value={loginPass}
                  onChange={e => setLoginPass(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  placeholder="Nhập mật khẩu..."
                  className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-slate-500 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all text-sm"
                />
              </div>
              {loginError && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-rose-400 text-sm font-bold flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4" /> {loginError}
                </motion.p>
              )}
              <button
                onClick={handleLogin}
                className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-2xl font-black text-sm uppercase tracking-wider hover:from-indigo-600 hover:to-violet-600 transition-all shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                ĐĂNG NHẬP
              </button>
            </div>
            <p className="text-center text-[10px] text-slate-500 mt-6">Thiết kế bởi <span className="text-slate-300 font-bold">Bùi Thị Kiên</span></p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-[#F8FAFC] font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className="max-w-4xl mx-auto text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-indigo-600 font-bold tracking-[0.2em] text-[10px] uppercase mb-3">Smarter Education Tools</p>
          <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight italic">Math Matrix <span className="text-indigo-600">Pro</span></h1>
          <div className="h-1 w-20 bg-indigo-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed">
            Hệ thống chuyên dụng tối ưu hóa quy trình xây dựng ma trận và đặc tả đề thi theo chuẩn chương trình GDPT 2018.
          </p>
          <button
            onClick={handleLogout}
            className="mt-4 px-5 py-2.5 bg-slate-200 text-slate-600 rounded-xl font-bold text-xs flex items-center mx-auto hover:bg-slate-300 transition-all"
          >
            Đăng xuất
          </button>
        </motion.div>
      </header>

      {/* Tabs */}
      <div className="flex justify-center space-x-2 mb-10 overflow-x-auto py-2">
        <button 
          onClick={() => setActiveTab('nhap-lieu')} 
          style={{ fontFamily: "'Times New Roman', Times, serif" }}
          className={`px-6 py-3 rounded-full font-bold text-sm flex items-center transition-all duration-300 whitespace-nowrap ${activeTab === 'nhap-lieu' ? 'bg-slate-900 text-white shadow-xl shadow-slate-200 scale-105' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200'}`}
        >
          <PenSquare className="w-4 h-4 mr-2" /> Nhập liệu
        </button>
        <button 
          onClick={() => setActiveTab('ma-tran')} 
          style={{ fontFamily: "'Times New Roman', Times, serif" }}
          className={`px-6 py-3 rounded-full font-bold text-sm flex items-center transition-all duration-300 whitespace-nowrap ${activeTab === 'ma-tran' ? 'bg-slate-900 text-white shadow-xl shadow-slate-200 scale-105' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200'}`}
        >
          <Plus className="w-4 h-4 mr-2" /> Ma trận đề thi
        </button>
        <button 
          onClick={() => setActiveTab('dac-ta')} 
          style={{ fontFamily: "'Times New Roman', Times, serif" }}
          className={`px-6 py-3 rounded-full font-bold text-sm flex items-center transition-all duration-300 whitespace-nowrap ${activeTab === 'dac-ta' ? 'bg-slate-900 text-white shadow-xl shadow-slate-200 scale-105' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200'}`}
        >
          <FileText className="w-4 h-4 mr-2" /> Bảng ma trận đặc tả
        </button>
        <button 
          onClick={() => setActiveTab('tao-de')} 
          style={{ fontFamily: "'Times New Roman', Times, serif" }}
          className={`px-6 py-3 rounded-full font-bold text-sm flex items-center transition-all duration-300 whitespace-nowrap ${activeTab === 'tao-de' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 scale-105' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200'}`}
        >
          <Sparkles className="w-4 h-4 mr-2" /> Tạo đề tự động
        </button>
        <button 
          onClick={() => setActiveTab('kiem-tra')} 
          style={{ fontFamily: "'Times New Roman', Times, serif" }}
          className={`px-6 py-3 rounded-full font-bold text-sm flex items-center transition-all duration-300 whitespace-nowrap ${activeTab === 'kiem-tra' ? 'bg-rose-600 text-white shadow-xl shadow-rose-200 scale-105' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200'}`}
        >
          <CheckCircle className="w-4 h-4 mr-2" /> Kiểm tra đề
        </button>
      </div>

      <main className="max-w-[1400px] mx-auto">
        <AnimatePresence mode="wait">
          {/* TAB 1: NHẬP LIỆU */}
          {activeTab === 'nhap-lieu' && (
            <motion.div 
              key="nhap-lieu"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Cấu trúc Ma trận</h2>
                  <p className="text-slate-500 text-sm">Thiết lập các chương, nội dung và phân bổ câu hỏi.</p>
                </div>
                <button 
                  onClick={themChuongMoi} 
                  className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" /> Thêm Chương Mới
                </button>
              </div>
              
              {data.map((chuong, cIdx) => (
                <motion.div 
                  layout
                  key={`c-${cIdx}`} 
                  className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div className="flex-1 w-full">
                      <label className="block text-[10px] font-black text-indigo-600 mb-2 uppercase tracking-widest">Chương / Chủ đề {cIdx + 1}</label>
                      <div className="flex gap-3 relative">
                        <input 
                          list={`chuong-suggestions-${cIdx}`}
                          className="flex-1 p-4 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 outline-none bg-slate-50 font-bold text-slate-800 transition-all pr-12"
                          value={chuong.tenChuong}
                          placeholder="Chọn hoặc nhập tên Chương / Chủ đề..."
                          onChange={(e) => {
                            const newData = JSON.parse(JSON.stringify(data));
                            newData[cIdx].tenChuong = e.target.value;
                            setData(newData);
                          }}
                        />
                        <ChevronRight className="absolute right-16 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 rotate-90 pointer-events-none" />
                        <datalist id={`chuong-suggestions-${cIdx}`}>
                          {Object.keys(curriculumData).map(c => <option key={c} value={c}>{c}</option>)}
                        </datalist>
                        <button 
                          onClick={() => xoaChuong(cIdx)}
                          className="p-4 text-rose-500 hover:bg-rose-50 rounded-2xl transition-colors border-2 border-transparent hover:border-rose-100"
                          title="Xóa chương"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {chuong.tenChuong && chuong.noiDungs.map((nd: any, nIdx: number) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={`n-${nIdx}`} 
                        className="ml-0 md:ml-10 mt-6 p-6 bg-slate-50/50 rounded-3xl border border-slate-100 relative"
                      >
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                          <div className="flex-[3] w-full">
                            <div className="flex justify-between items-center mb-3">
                              <label className="block text-[10px] font-black text-indigo-400 uppercase tracking-widest">Nội dung kiến thức {nIdx + 1}</label>
                              <button 
                                onClick={() => xoaNoiDung(cIdx, nIdx)}
                                className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                            <div className="relative group">
                              <input 
                                list={`nd-suggestions-${cIdx}-${nIdx}`}
                                className="w-full p-4 border-2 border-slate-50 rounded-2xl focus:border-indigo-500 outline-none bg-white shadow-xl shadow-slate-100/50 font-bold text-slate-800 transition-all pr-12"
                                value={nd.tenNoiDung}
                                placeholder="Nhập hoặc chọn nội dung kiến thức..."
                                onChange={(e) => {
                                  const newData = JSON.parse(JSON.stringify(data));
                                  newData[cIdx].noiDungs[nIdx].tenNoiDung = e.target.value;
                                  setData(newData);
                                }}
                                onBlur={(e) => {
                                  // Nếu nội dung khớp với gợi ý thì tự động map yêu cầu
                                  handleChonNoiDung(cIdx, nIdx, e.target.value);
                                }}
                              />
                              <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 rotate-90" />
                              <datalist id={`nd-suggestions-${cIdx}-${nIdx}`}>
                                {Object.keys(curriculumData[chuong.tenChuong] || {}).map(n => <option key={n} value={n}>{n}</option>)}
                              </datalist>
                            </div>
                          </div>
                          <div className="flex-1 w-full">
                            <label className="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest text-center">SỐ TIẾT</label>
                            <div className="p-1 bg-white rounded-3xl border-2 border-slate-50 shadow-xl shadow-slate-100/50">
                              <input 
                                type="number"
                                className="w-full p-4 border-none rounded-2xl outline-none bg-transparent font-black text-slate-800 text-center text-xl"
                                value={nd.soTiet || ''}
                                placeholder="0"
                                onChange={(e) => handleUpdateSoTiet(cIdx, nIdx, parseInt(e.target.value) || 0)}
                              />
                            </div>
                          </div>
                        </div>

                        {nd.tenNoiDung && (
                          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                            {nd.mucDos.map((md: any, mIdx: number) => (
                              <div key={`m-${mIdx}`} className={`p-5 rounded-2xl border-2 ${md.borderColor} ${md.bgColor} transition-all hover:shadow-md`}>
                                <div className="flex items-center mb-4">
                                  <div className={`w-2 h-2 rounded-full mr-2 ${md.color.replace('text', 'bg')}`}></div>
                                  <p className={`font-black text-xs uppercase tracking-wider ${md.color}`}>{md.tenMucDo}</p>
                                </div>
                                <div className="space-y-4">
                                  <div>
                                    <label className="block text-[9px] font-bold text-slate-400 uppercase mb-2 ml-1">Yêu cầu cần đạt (Sửa nội dung)</label>
                                    <textarea 
                                      className="w-full p-3 bg-white/50 border border-slate-200 rounded-xl text-[10px] focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none leading-relaxed text-slate-600 h-24"
                                      value={md.yeuCau}
                                      onChange={(e) => {
                                        const newData = JSON.parse(JSON.stringify(data));
                                        newData[cIdx].noiDungs[nIdx].mucDos[mIdx].yeuCau = e.target.value;
                                        setData(newData);
                                      }}
                                    />
                                  </div>
                                  <div className="grid grid-cols-1 gap-3">
                                    <div className="group">
                                      <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1 ml-1">
                                        {mIdx === 0 ? 'Nhiều lựa chọn (Câu NB)' : mIdx === 1 ? 'Nhiều lựa chọn (Câu TH)' : 'Nhiều lựa chọn (Câu VD — hiếm)'}
                                      </label>
                                      <input 
                                        placeholder={mIdx === 0 ? 'Câu 1, 2, 3...' : mIdx === 1 ? 'Câu 8, 9...' : 'Câu...'} 
                                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                        value={md.qs.nlc} 
                                        onChange={e => handleUpdateQS(cIdx, nIdx, mIdx, 'nlc', e.target.value)}
                                      />
                                    </div>
                                    <div className="group">
                                      <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1 ml-1">
                                        {mIdx === 0 ? 'Đúng-Sai: ý a — NB (câu 13–16)' : mIdx === 1 ? 'Đúng-Sai: ý b,c — TH' : 'Đúng-Sai: ý d — VD'}
                                      </label>
                                      <input 
                                        placeholder={mIdx === 0 ? 'Câu 13, 14, 15, 16' : mIdx === 1 ? 'Câu 13, 14...' : 'Câu 13, 14...'} 
                                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                        value={md.qs.ds} 
                                        onChange={e => handleUpdateQS(cIdx, nIdx, mIdx, 'ds', e.target.value)}
                                      />
                                    </div>
                                    <div className="group">
                                      <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1 ml-1">
                                        {mIdx === 0 ? 'Trả lời ngắn NB (câu 17, 18)' : mIdx === 1 ? 'Trả lời ngắn TH (câu 19, 20)' : 'Trả lời ngắn VD+VDC (câu 21, 22)'}
                                      </label>
                                      <input 
                                        placeholder={mIdx === 0 ? 'Câu 17, 18' : mIdx === 1 ? 'Câu 19, 20' : 'Câu 21, 22'} 
                                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                        value={md.qs.tln} 
                                        onChange={e => handleUpdateQS(cIdx, nIdx, mIdx, 'tln', e.target.value)}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {chuong.tenChuong && (
                    <button 
                      onClick={() => themNoiDung(cIdx)} 
                      className="mt-8 ml-0 md:ml-10 px-6 py-3 border-2 border-dashed border-slate-200 text-slate-500 font-bold text-xs rounded-2xl hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/30 transition-all flex items-center group"
                    >
                      <Plus className="w-3 h-3 mr-2 group-hover:rotate-90 transition-transform" /> Thêm nội dung kiến thức khác
                    </button>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* TAB 2: MA TRẬN ĐỀ THI */}
          {activeTab === 'ma-tran' && (
            <motion.div 
              key="ma-tran"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl relative"
            >
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Ma trận Đề kiểm tra Môn {monHoc} 12</h2>
                <p className="text-slate-400 text-xs mt-2 italic font-medium">(Dành cho kỳ thi tốt nghiệp THPT và kiểm tra định kỳ)</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {['Toán', 'Lý', 'Hóa', 'Sinh', 'Sử', 'Địa', 'KTPL', 'Anh'].map(mon => (
                    <button
                      key={mon}
                      onClick={() => setMonHoc(mon)}
                      className={`px-4 py-2 rounded-full font-bold text-xs transition-all border-2 ${
                        monHoc === mon
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200 scale-105'
                          : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
                      }`}
                    >
                      {mon}
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button onClick={themChuongMoi} className="px-5 py-2.5 bg-slate-600 text-white rounded-lg font-bold text-xs flex items-center hover:bg-slate-700 transition-all shadow-md">
                    <Plus className="w-3.5 h-3.5 mr-2" /> Thêm Chương
                  </button>
                   <button onClick={() => {
                     if (data.length === 0) themChuongMoi();
                     else themNoiDung(data.length - 1);
                   }} className="px-5 py-2.5 bg-indigo-500 text-white rounded-lg font-bold text-xs flex items-center hover:bg-indigo-600 transition-all shadow-md">
                     <Plus className="w-3.5 h-3.5 mr-2" /> Thêm Bài Mới
                   </button>
                   <button onClick={tuDongPhanBo} className="px-5 py-2.5 bg-emerald-500 text-white rounded-lg font-bold text-xs flex items-center hover:bg-emerald-600 transition-all shadow-md">
                     <FileText className="w-3.5 h-3.5 mr-2" /> Tự Động Phân Bổ
                   </button>
                   <button onClick={exportToWord} className="px-5 py-2.5 bg-sky-600 text-white rounded-lg font-bold text-xs flex items-center hover:bg-sky-700 transition-all shadow-md">
                     <Download className="w-3.5 h-3.5 mr-2" /> Xuất File Word
                   </button>
                 </div>
               </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table id="ma-tran-table" className="w-full border-collapse text-[11px] min-w-[1200px]">
                  <thead>
                    {/* Hàng 1: tiêu đề lớn */}
                    <tr className="bg-slate-900 text-white text-center text-[11px] font-black">
                      <th className="border border-slate-700 p-3" rowSpan={3}>STT</th>
                      <th className="border border-slate-700 p-3" rowSpan={3}>SỐ<br/>TIẾT</th>
                      <th className="border border-slate-700 p-3 text-center" rowSpan={3}>NỘI DUNG KIẾN THỨC,<br/>ĐƠN VỊ KIẾN THỨC</th>
                      <th className="border border-slate-700 p-2 tracking-wide" colSpan={9}>SỐ CÂU HỎI THEO MỨC ĐỘ NHẬN THỨC</th>
                      <th className="border border-slate-700 p-3 w-20" rowSpan={3}>TỔNG<br/>SỐ CÂU</th>
                      <th className="border border-slate-700 p-3 w-16" rowSpan={3}>TỶ LỆ<br/>(%)</th>
                    </tr>
                    {/* Hàng 2: nhóm phần */}
                    <tr className="text-white text-center text-[10px] font-black tracking-wide">
                      <th className="border border-slate-600 p-2" colSpan={2} style={{background:'#065f46'}}>
                        TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN<br/>
                        <span className="text-[9px] font-semibold opacity-80">(Câu 1 → Câu 12)</span>
                      </th>
                      <th className="border border-slate-600 p-2" colSpan={3} style={{background:'#92400e'}}>
                        TRẮC NGHIỆM ĐÚNG/SAI<br/>
                        <span className="text-[9px] font-semibold opacity-80">(Câu 13 → Câu 16) — 16 ý</span>
                      </th>
                      <th className="border border-slate-600 p-2" colSpan={4} style={{background:'#7f1d1d'}}>
                        TRẢ LỜI NGẮN<br/>
                        <span className="text-[9px] font-semibold opacity-80">(Câu 17 → Câu 22)</span>
                      </th>
                    </tr>
                    {/* Hàng 3: sub-header */}
                    <tr className="text-center text-[10px] font-black">
                      {/* TNPA */}
                      <th className="border border-slate-300 p-2 w-14" style={{background:'#d1fae5',color:'#065f46'}}>Nhận biết<br/><span className="font-normal text-[9px]">(NB)</span></th>
                      <th className="border border-slate-300 p-2 w-14" style={{background:'#d1fae5',color:'#065f46'}}>Thông hiểu<br/><span className="font-normal text-[9px]">(TH)</span></th>
                      {/* Đúng/Sai — tính theo ý */}
                      <th className="border border-slate-300 p-2 w-14" style={{background:'#fef3c7',color:'#92400e'}}>NB<br/><span className="font-normal text-[9px]">4 ý (a)</span></th>
                      <th className="border border-slate-300 p-2 w-14" style={{background:'#fef3c7',color:'#92400e'}}>TH<br/><span className="font-normal text-[9px]">8 ý (b,c)</span></th>
                      <th className="border border-slate-300 p-2 w-14" style={{background:'#fef3c7',color:'#92400e'}}>VD<br/><span className="font-normal text-[9px]">4 ý (d)</span></th>
                      {/* Trả lời ngắn */}
                      <th className="border border-slate-300 p-2 w-14" style={{background:'#ffe4e6',color:'#7f1d1d'}}>NB<br/><span className="font-normal text-[9px]">(câu 17,18)</span></th>
                      <th className="border border-slate-300 p-2 w-14" style={{background:'#ffe4e6',color:'#7f1d1d'}}>TH<br/><span className="font-normal text-[9px]">(câu 19,20)</span></th>
                      <th className="border border-slate-300 p-2 w-14" style={{background:'#ffe4e6',color:'#7f1d1d'}}>VD<br/><span className="font-normal text-[9px]">(câu 21)</span></th>
                      <th className="border border-slate-300 p-2 w-14" style={{background:'#ffe4e6',color:'#7f1d1d'}}>VDC<br/><span className="font-normal text-[9px]">(câu 22)</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      let globalCounter = 0;
                      const rows = data.flatMap((chuong, cIdx) =>
                        chuong.noiDungs.map((nd: any, nIdx: number) => {
                          globalCounter++;
                          // === TNPA (Trắc nghiệm nhiều phương án): Câu 1-12 ===
                          const nlcNB = countQuestions(nd.mucDos[0].qs.nlc); // Nhận biết
                          const nlcTH = countQuestions(nd.mucDos[1].qs.nlc); // Thông hiểu

                          // === Đúng/Sai: 4 câu × 4 ý = 16 ý ===
                          // Cấu trúc: câu 13a,14a,15a,16a = NB (4 ý)
                          //           câu 13b,13c,14b,14c,15b,15c,16b,16c = TH (8 ý)
                          //           câu 13d,14d,15d,16d = VD (4 ý)
                          // Mỗi câu DS nhập ở mức NB: tổng số câu DS
                          const dsCauTotal = countQuestions(nd.mucDos[0].qs.ds)
                                          + countQuestions(nd.mucDos[1].qs.ds)
                                          + countQuestions(nd.mucDos[2].qs.ds);
                          // Phân phối ý theo tỷ lệ chuẩn: NB=1ý, TH=2ý, VD=1ý
                          const dsYNB = dsCauTotal * 1; // 4 ý NB (ý a)
                          const dsYTH = dsCauTotal * 2; // 8 ý TH (ý b,c)
                          const dsYVD = dsCauTotal * 1; // 4 ý VD (ý d)

                          // === Trả lời ngắn: Câu 17-22 (6 câu) ===
                          // NB: câu 17,18 (mức 0)
                          // TH: câu 19,20 (mức 1)
                          // VD: câu 21   (mức 2 — phần đầu)
                          // VDC: câu 22  (mức 2 — phần sau)
                          const tlnNB  = countQuestions(nd.mucDos[0].qs.tln);
                          const tlnTH  = countQuestions(nd.mucDos[1].qs.tln);
                          const tlnVDRaw = countQuestions(nd.mucDos[2].qs.tln);
                          const tlnVD  = Math.ceil(tlnVDRaw / 2);  // câu 21
                          const tlnVDC = Math.floor(tlnVDRaw / 2); // câu 22

                          const rowTotal = nlcNB + nlcTH + dsCauTotal + tlnNB + tlnTH + tlnVDRaw;
                          return (
                            <tr key={`mt-${cIdx}-${nIdx}`} className="hover:bg-indigo-50/30 transition-colors">
                              <td className="border border-slate-200 p-3 text-center text-slate-500 font-bold">{globalCounter}</td>
                              <td className="border border-slate-200 p-3 text-center font-black text-indigo-700">{nd.soTiet || ''}</td>
                              <td className="border border-slate-200 p-3 font-semibold text-slate-800">
                                {nd.tenNoiDung || <span className="text-slate-300 italic font-normal">Chưa nhập nội dung...</span>}
                              </td>
                              {/* TNPA */}
                              <td className="border border-slate-200 p-3 text-center font-black text-emerald-800" style={{background:'#f0fdf4'}}>{nlcNB || ''}</td>
                              <td className="border border-slate-200 p-3 text-center font-black text-emerald-800" style={{background:'#f0fdf4'}}>{nlcTH || ''}</td>
                              {/* Đúng/Sai (ý) */}
                              <td className="border border-slate-200 p-3 text-center font-black text-amber-800" style={{background:'#fffbeb'}}>{dsYNB || ''}</td>
                              <td className="border border-slate-200 p-3 text-center font-black text-amber-800" style={{background:'#fffbeb'}}>{dsYTH || ''}</td>
                              <td className="border border-slate-200 p-3 text-center font-black text-amber-800" style={{background:'#fffbeb'}}>{dsYVD || ''}</td>
                              {/* Trả lời ngắn */}
                              <td className="border border-slate-200 p-3 text-center font-black text-rose-800" style={{background:'#fff1f2'}}>{tlnNB || ''}</td>
                              <td className="border border-slate-200 p-3 text-center font-black text-rose-800" style={{background:'#fff1f2'}}>{tlnTH || ''}</td>
                              <td className="border border-slate-200 p-3 text-center font-black text-rose-800" style={{background:'#fff1f2'}}>{tlnVD || ''}</td>
                              <td className="border border-slate-200 p-3 text-center font-black text-rose-800" style={{background:'#fff1f2'}}>{tlnVDC || ''}</td>
                              {/* Tổng */}
                              <td className="border border-slate-200 p-3 text-center font-black text-indigo-700 bg-indigo-50">{rowTotal > 0 ? rowTotal : ''}</td>
                              <td className="border border-slate-200 p-3 text-center text-slate-500 font-medium">
                                {totals.total > 0 ? ((rowTotal / totals.total) * 100).toFixed(0) + '%' : ''}
                              </td>
                            </tr>
                          );
                        })
                      );
                      if (rows.length === 0) {
                        return (
                          <tr>
                            <td colSpan={14} className="text-center p-16">
                              <div className="flex flex-col items-center text-slate-300">
                                <FileText className="w-12 h-12 mb-3 opacity-20" />
                                <p className="italic font-medium text-slate-400">Chưa có dữ liệu. Vui lòng nhập tại tab Nhập liệu.</p>
                              </div>
                            </td>
                          </tr>
                        );
                      }
                      return rows;
                    })()}

                    {/* Hàng TỔNG CỘNG */}
                    {(() => {
                      const sumNlcNB   = data.reduce((a, c) => a + c.noiDungs.reduce((s: number, nd: any) => s + countQuestions(nd.mucDos[0].qs.nlc), 0), 0);
                      const sumNlcTH   = data.reduce((a, c) => a + c.noiDungs.reduce((s: number, nd: any) => s + countQuestions(nd.mucDos[1].qs.nlc), 0), 0);
                      const sumDsCau   = data.reduce((a, c) => a + c.noiDungs.reduce((s: number, nd: any) =>
                        s + countQuestions(nd.mucDos[0].qs.ds) + countQuestions(nd.mucDos[1].qs.ds) + countQuestions(nd.mucDos[2].qs.ds), 0), 0);
                      const sumDsYNB   = sumDsCau * 1;
                      const sumDsYTH   = sumDsCau * 2;
                      const sumDsYVD   = sumDsCau * 1;
                      const sumTlnNB   = data.reduce((a, c) => a + c.noiDungs.reduce((s: number, nd: any) => s + countQuestions(nd.mucDos[0].qs.tln), 0), 0);
                      const sumTlnTH   = data.reduce((a, c) => a + c.noiDungs.reduce((s: number, nd: any) => s + countQuestions(nd.mucDos[1].qs.tln), 0), 0);
                      const sumTlnVDRaw = data.reduce((a, c) => a + c.noiDungs.reduce((s: number, nd: any) => s + countQuestions(nd.mucDos[2].qs.tln), 0), 0);
                      const sumTlnVD   = Math.ceil(sumTlnVDRaw / 2);
                      const sumTlnVDC  = Math.floor(sumTlnVDRaw / 2);
                      const grandTotal = sumNlcNB + sumNlcTH + sumDsCau + sumTlnNB + sumTlnTH + sumTlnVDRaw;
                      return (
                        <tr className="bg-slate-900 text-white font-black text-center text-sm">
                          <td className="border border-slate-700 p-4 text-center" colSpan={3}>TỔNG CỘNG</td>
                          <td className="border border-slate-700 p-4">{sumNlcNB}</td>
                          <td className="border border-slate-700 p-4">{sumNlcTH}</td>
                          <td className="border border-slate-700 p-4">{sumDsYNB}</td>
                          <td className="border border-slate-700 p-4">{sumDsYTH}</td>
                          <td className="border border-slate-700 p-4">{sumDsYVD}</td>
                          <td className="border border-slate-700 p-4">{sumTlnNB}</td>
                          <td className="border border-slate-700 p-4">{sumTlnTH}</td>
                          <td className="border border-slate-700 p-4">{sumTlnVD}</td>
                          <td className="border border-slate-700 p-4">{sumTlnVDC}</td>
                          <td className="border border-slate-700 p-4 bg-indigo-600">{grandTotal}</td>
                          <td className="border border-slate-700 p-4">100%</td>
                        </tr>
                      );
                    })()}

                    {/* Hàng chú thích cấu trúc câu hỏi */}
                    {(() => {
                      const sumNlcNB   = data.reduce((a, c) => a + c.noiDungs.reduce((s: number, nd: any) => s + countQuestions(nd.mucDos[0].qs.nlc), 0), 0);
                      const sumNlcTH   = data.reduce((a, c) => a + c.noiDungs.reduce((s: number, nd: any) => s + countQuestions(nd.mucDos[1].qs.nlc), 0), 0);
                      const sumDsCau   = data.reduce((a, c) => a + c.noiDungs.reduce((s: number, nd: any) =>
                        s + countQuestions(nd.mucDos[0].qs.ds) + countQuestions(nd.mucDos[1].qs.ds) + countQuestions(nd.mucDos[2].qs.ds), 0), 0);
                      const sumTlnNB   = data.reduce((a, c) => a + c.noiDungs.reduce((s: number, nd: any) => s + countQuestions(nd.mucDos[0].qs.tln), 0), 0);
                      const sumTlnTH   = data.reduce((a, c) => a + c.noiDungs.reduce((s: number, nd: any) => s + countQuestions(nd.mucDos[1].qs.tln), 0), 0);
                      const sumTlnVDRaw = data.reduce((a, c) => a + c.noiDungs.reduce((s: number, nd: any) => s + countQuestions(nd.mucDos[2].qs.tln), 0), 0);
                      return (
                        <tr className="text-center text-[10px] font-bold" style={{background:'#1e3a5f', color:'#93c5fd'}}>
                          <td className="border border-slate-600 p-2 text-left" colSpan={3} style={{paddingLeft:'1rem'}}>
                            <span className="font-black">Số câu:</span>&nbsp;
                            TNPA <strong>{sumNlcNB + sumNlcTH}</strong>/12&nbsp;·&nbsp;
                            Đ/S <strong>{sumDsCau}</strong>/4 câu ({sumDsCau*4}/16 ý)&nbsp;·&nbsp;
                            TLN <strong>{sumTlnNB + sumTlnTH + sumTlnVDRaw}</strong>/6
                          </td>
                          <td className="border border-slate-600 p-2" colSpan={2}>
                            Câu 1→12
                          </td>
                          <td className="border border-slate-600 p-2" colSpan={3}>
                            Câu 13→16 (a,b,c,d)
                          </td>
                          <td className="border border-slate-600 p-2" colSpan={4}>
                            Câu 17→22
                          </td>
                          <td className="border border-slate-600 p-2" colSpan={2}></td>
                        </tr>
                      );
                    })()}
                  </tbody>
                </table>
              </div>


              {/* Bottom Cards Summary */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border-2 border-emerald-100 shadow-lg flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-black text-base">I</span>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-0.5">PHẦN I: TRẮC NGHIỆM</h3>
                    <p className="text-xl font-black text-slate-900">{totals.p1}<span className="text-xs text-slate-400 font-bold"> / 12 câu</span></p>
                    <p className="text-[10px] text-slate-400 font-medium">Câu 1 → 12</p>
                    <p className="text-xs text-slate-500">Điểm: <span className="text-emerald-600 font-black">{(totals.p1 * 0.25).toFixed(2)} / 3.00đ</span></p>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border-2 border-amber-100 shadow-lg flex items-center space-x-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-black text-base">II</span>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black text-amber-700 uppercase tracking-widest mb-0.5">PHẦN II: ĐÚNG/SAI</h3>
                    <p className="text-xl font-black text-slate-900">{totals.p2}<span className="text-xs text-slate-400 font-bold"> / 4 câu</span></p>
                    <p className="text-[10px] text-slate-400 font-medium">Câu 13→16 · NB:4ý · TH:8ý · VD:4ý</p>
                    <p className="text-xs text-slate-500">Điểm: <span className="text-amber-600 font-black">{(totals.p2 * 1.0).toFixed(2)} / 4.00đ</span></p>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border-2 border-rose-100 shadow-lg flex items-center space-x-4">
                  <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-black text-base">III</span>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black text-rose-700 uppercase tracking-widest mb-0.5">PHẦN III: TRẢ LỜI NGẮN</h3>
                    <p className="text-xl font-black text-slate-900">{totals.p3}<span className="text-xs text-slate-400 font-bold"> / 6 câu</span></p>
                    <p className="text-[10px] text-slate-400 font-medium">Câu 17,18: TH · Câu 19,20: VD · Câu 21,22: VDC</p>
                    <p className="text-xs text-slate-500">Điểm: <span className="text-rose-600 font-black">{(totals.p3 * 0.5).toFixed(2)} / 3.00đ</span></p>
                  </div>
                </div>
                <div className="bg-slate-900 p-5 rounded-2xl shadow-xl flex items-center space-x-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Tổng điểm</h3>
                    <p className="text-xl font-black text-white">{(totals.p1*0.25 + totals.p2*1.0 + totals.p3*0.5).toFixed(2)}<span className="text-xs text-slate-400 font-bold"> / 10.00đ</span></p>
                    <p className="text-xs text-slate-400">Tổng câu: <span className="text-slate-200 font-black">{totals.total}</span> (22 câu)</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 text-center text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
                App được thiết kế bởi <span className="text-slate-900">Bùi Thị Kiên</span>
              </div>
            </motion.div>
          )}

          {/* TAB 3: BẢNG ĐẶC TẢ */}
          {activeTab === 'dac-ta' && (
            <motion.div 
              key="dac-ta"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Bảng Đặc tả Đề thi</h2>
                  <p className="text-slate-500 text-sm mt-1">Chi tiết yêu cầu cần đạt và cấu trúc phân bổ câu hỏi.</p>
                </div>
                <button onClick={exportToWordDacTa} className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center shadow-lg shadow-slate-200">
                  <Download className="w-4 h-4 mr-2" /> Xuất File Word
                </button>
              </div>

              <div className="overflow-x-auto -mx-8 px-8">
                <table id="dac-ta-table" className="w-full border-collapse text-sm min-w-[1200px]">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="border border-slate-800 p-4 w-12 text-[10px] uppercase font-black" rowSpan={3}>TT</th>
                      <th className="border border-slate-800 p-4 w-56 text-[10px] uppercase font-black" rowSpan={3}>Chương / Chủ đề</th>
                      <th className="border border-slate-800 p-4 w-48 text-[10px] uppercase font-black" rowSpan={3}>Nội dung kiến thức</th>
                      <th className="border border-slate-800 p-4 w-32 text-[10px] uppercase font-black" rowSpan={3}>Mức độ</th>
                      <th className="border border-slate-800 p-4 text-[10px] uppercase font-black" rowSpan={3}>Yêu cầu cần đạt</th>
                      <th className="border border-slate-800 p-2 text-[10px] uppercase font-black text-center" colSpan={8}>Số câu hỏi theo mức độ nhận thức</th>
                    </tr>
                    <tr>
                      <th className="border border-slate-700 p-2 text-[9px] uppercase font-bold text-center" colSpan={2} style={{background:'#065f46',color:'#fff'}}>TNPA (C1–C12)</th>
                      <th className="border border-slate-700 p-2 text-[9px] uppercase font-bold text-center" colSpan={3} style={{background:'#92400e',color:'#fff'}}>Đúng/Sai · 16 ý (C13–C16)</th>
                      <th className="border border-slate-700 p-2 text-[9px] uppercase font-bold text-center" colSpan={3} style={{background:'#7f1d1d',color:'#fff'}}>Trả lời ngắn (C17–C22)</th>
                    </tr>
                    <tr className="bg-slate-100 text-slate-600">
                      <th className="border border-slate-200 p-1.5 w-14 text-[8px] font-black" style={{background:'#d1fae5',color:'#065f46'}}>NB<br/>(Biết)</th>
                      <th className="border border-slate-200 p-1.5 w-14 text-[8px] font-black" style={{background:'#d1fae5',color:'#065f46'}}>TH<br/>(Hiểu)</th>
                      <th className="border border-slate-200 p-1.5 w-14 text-[8px] font-black" style={{background:'#fef3c7',color:'#92400e'}}>NB<br/>4ý(a)</th>
                      <th className="border border-slate-200 p-1.5 w-14 text-[8px] font-black" style={{background:'#fef3c7',color:'#92400e'}}>TH<br/>8ý(bc)</th>
                      <th className="border border-slate-200 p-1.5 w-14 text-[8px] font-black" style={{background:'#fef3c7',color:'#92400e'}}>VD<br/>4ý(d)</th>
                      <th className="border border-slate-200 p-1.5 w-14 text-[8px] font-black" style={{background:'#ffe4e6',color:'#7f1d1d'}}>TH<br/>C17,18</th>
                      <th className="border border-slate-200 p-1.5 w-14 text-[8px] font-black" style={{background:'#ffe4e6',color:'#7f1d1d'}}>VD<br/>C19,20</th>
                      <th className="border border-slate-200 p-1.5 w-14 text-[8px] font-black" style={{background:'#ffe4e6',color:'#7f1d1d'}}>VDC<br/>C21,22</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    {data.map((chuong, cIdx) => (
                      chuong.tenChuong && chuong.noiDungs.map((nd: any, nIdx: number) => (
                        nd.tenNoiDung && nd.mucDos.map((md: any, mIdx: number) => {
                          // TLN mIdx2: split VD(ceil) / VDC(floor)
                          const tlnRaw2 = mIdx === 2 ? (md.qs.tln || '') : '';
                          const tlnTokens2 = tlnRaw2.split(/[,;\s]+/).filter((s:string) => s && s.match(/\d/));
                          const tlnVDCount  = Math.ceil(tlnTokens2.length / 2);
                          const tlnVDCCount = Math.floor(tlnTokens2.length / 2);
                          // TLN mIdx1: TH câu (câu 17,18)
                          const tlnTH = mIdx === 1 ? (md.qs.tln || '') : '';
                          // Label từng câu TLN
                          const labelTH  = tlnTH  ? tlnTH.split(/[,;\s]+/).filter((s:string)=>s&&s.match(/\d/)).map((s:string)=>`C${s.replace(/\D/g,'')}`).join(' ') : '';
                          const labelVD  = tlnVDCount  > 0 ? tlnTokens2.slice(0,tlnVDCount).map((s:string)=>`C${s.replace(/\D/g,'')}`).join(' ') : '';
                          const labelVDC = tlnVDCCount > 0 ? tlnTokens2.slice(tlnVDCount).map((s:string)=>`C${s.replace(/\D/g,'')}`).join(' ') : '';
                          return (
                            <tr key={`row-${cIdx}-${nIdx}-${mIdx}`} className="hover:bg-indigo-50/30 transition-colors group">
                              {nIdx === 0 && mIdx === 0 && (
                                <td className="border border-slate-200 p-4 font-black text-center bg-slate-50" rowSpan={calculateRowSpan(chuong)}>{cIdx + 1}</td>
                              )}
                              {nIdx === 0 && mIdx === 0 && (
                                <td className="border border-slate-200 p-4 font-black text-slate-900 bg-slate-50" rowSpan={calculateRowSpan(chuong)}>{chuong.tenChuong}</td>
                              )}
                              {mIdx === 0 && (
                                <td className="border border-slate-200 p-4 font-bold text-indigo-600" rowSpan={nd.mucDos.length}>{nd.tenNoiDung}</td>
                              )}
                              <td className={`border border-slate-200 p-3 text-[11px] font-black text-center uppercase tracking-tighter ${md.color}`}>
                                {md.tenMucDo}
                              </td>
                              <td className="border border-slate-200 p-3 whitespace-pre-line text-[11px] leading-relaxed text-justify text-slate-600">
                                {md.yeuCau || '---'}
                              </td>
                              {/* TNPA NB=mIdx0, TH=mIdx1 */}
                              <td className="border border-slate-200 p-2 text-center font-bold text-emerald-800 text-[10px]" style={{background:'#f0fdf4'}}>{mIdx === 0 ? (md.qs.nlc || '') : ''}</td>
                              <td className="border border-slate-200 p-2 text-center font-bold text-emerald-800 text-[10px]" style={{background:'#f0fdf4'}}>{mIdx === 1 ? (md.qs.nlc || '') : ''}</td>
                              {/* DS: 4 câu 13-16, mỗi câu 4 ý: a=NB, b,c=TH, d=VD */}
                              <td className="border border-slate-200 p-2 text-center font-bold text-amber-800 text-[10px]" style={{background:'#fffbeb'}}>{mIdx === 0 ? (md.qs.ds || '') : ''}</td>
                              <td className="border border-slate-200 p-2 text-center font-bold text-amber-800 text-[10px]" style={{background:'#fffbeb'}}>{mIdx === 1 ? (md.qs.ds || '') : ''}</td>
                              <td className="border border-slate-200 p-2 text-center font-bold text-amber-800 text-[10px]" style={{background:'#fffbeb'}}>{mIdx === 2 ? (md.qs.ds || '') : ''}</td>
                              {/* TLN: TH=mIdx1(câu17,18), VD=mIdx2 ceil, VDC=mIdx2 floor */}
                              <td className="border border-slate-200 p-2 text-center font-bold text-rose-800 text-[10px]" style={{background:'#fff1f2'}}>
                                {mIdx === 1 && labelTH ? <span title={md.qs.tln}>{labelTH}</span> : ''}
                              </td>
                              <td className="border border-slate-200 p-2 text-center font-bold text-rose-800 text-[10px]" style={{background:'#fff1f2'}}>
                                {mIdx === 2 && labelVD ? <span title={tlnTokens2.slice(0,tlnVDCount).join(', ')}>{labelVD}</span> : ''}
                              </td>
                              <td className="border border-slate-200 p-2 text-center font-bold text-rose-800 text-[10px]" style={{background:'#fff1f2'}}>
                                {mIdx === 2 && labelVDC ? <span title={tlnTokens2.slice(tlnVDCount).join(', ')}>{labelVDC}</span> : ''}
                              </td>
                            </tr>
                          );
                        })
                      ))
                    ))}
                    {data.every(c => !c.tenChuong) && (
                      <tr>
                        <td colSpan={14} className="text-center p-20">
                          <div className="flex flex-col items-center justify-center text-slate-300">
                            <FileText className="w-16 h-16 mb-4 opacity-20" />
                            <p className="italic font-medium">Chưa có dữ liệu. Vui lòng thiết lập cấu trúc tại tab Nhập liệu.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* TAB 4: TẠO ĐỀ TỰ ĐỘNG */}
          {activeTab === 'tao-de' && (
            <TabTaoDeTuDong data={data} countQuestions={countQuestions} />
          )}
          {/* TAB 5: KIỂM TRA ĐỀ */}
          {activeTab === 'kiem-tra' && (
            <TabKiemTra data={data} countQuestions={countQuestions} />
          )}
        </AnimatePresence>
      </main>

      <footer className="max-w-4xl mx-auto mt-20 text-center pb-12 border-t border-slate-200 pt-8">
        <p className="text-slate-400 text-[10px] uppercase font-black tracking-[0.3em]">Math Matrix Pro &copy; 2026</p>
        <p className="text-slate-400 text-[10px] mt-2 italic">Dành cho giáo viên tối ưu hóa quy trình kiểm tra đánh giá</p>
        <p className="text-indigo-500 text-xs mt-3 font-bold">Thiết kế bởi <span className="text-slate-900">Bùi Thị Kiên</span></p>
      </footer>

      {/* ═══ MODAL CẤU HÌNH AI ═══ */}
      <AnimatePresence>
        {showAIConfig && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAIConfig(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 pb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                    <Key className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">Cấu hình AI</h3>
                    <p className="text-xs text-slate-400">API Key & Model Selection</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAIConfig(false)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="px-6 pb-6 space-y-5">
                {/* API Key */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-slate-700">Google Gemini API Key <span className="text-red-500">*</span></label>
                    <a
                      href="https://aistudio.google.com/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-indigo-500 font-bold hover:text-indigo-700 transition-colors"
                    >
                      Lấy Key ở đâu?
                    </a>
                  </div>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border-2 border-slate-100 rounded-2xl focus:border-indigo-400 outline-none bg-slate-50 font-mono text-sm text-slate-800 transition-all"
                    placeholder="Nhập API Key..."
                    value={apiKey}
                    onChange={e => setApiKey(e.target.value)}
                  />
                  <p className="text-[11px] text-slate-400 mt-1.5 italic">Key được lưu cục bộ trên trình duyệt của bạn (localStorage).</p>
                </div>

                {/* Model Selection */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Settings className="w-4 h-4 text-slate-500" />
                    <label className="text-sm font-bold text-slate-700">Chọn Model AI</label>
                  </div>
                  <div className="space-y-2">
                    {[
                      { id: 'gemini-3-flash', name: 'Gemini 3 Flash (Preview)', desc: 'Tốc độ cực nhanh, tốt nhất cho Chat & Quiz' },
                      { id: 'gemini-3-pro', name: 'Gemini 3 Pro (Preview)', desc: 'Thông minh hơn, xử lý bài toán phức tạp' },
                      { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', desc: 'Ổn định, tiết kiệm quota' },
                    ].map(model => (
                      <button
                        key={model.id}
                        onClick={() => setSelectedModel(model.id)}
                        className={`w-full text-left px-4 py-3.5 rounded-2xl border-2 transition-all flex items-center justify-between ${
                          selectedModel === model.id
                            ? 'border-indigo-500 bg-indigo-50/50 shadow-md shadow-indigo-100'
                            : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <p className={`font-bold text-sm ${selectedModel === model.id ? 'text-indigo-700' : 'text-slate-800'}`}>{model.name}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">{model.desc}</p>
                        </div>
                        {selectedModel === model.id && (
                          <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSaveAIConfig}
                  className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-2xl font-black text-sm uppercase tracking-wider hover:from-indigo-600 hover:to-violet-600 transition-all shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  LƯU CẤU HÌNH
                </button>

                <p className="text-center text-[10px] text-slate-400 font-bold">Thiết kế bởi <span className="text-slate-700">Bùi Thị Kiên</span></p>
              </div>
            </motion.div>
          </motion.div>
        )}

          {/* TAB 5: KIỂM TRA ĐỀ THI */}
          {activeTab === 'kiem-tra' && (() => {
            const [examData, setExamData] = React.useState<any[]>([]);
            const [userAnswers, setUserAnswers] = React.useState<Record<string, string>>({});
            const [submitted, setSubmitted] = React.useState(false);
            const [score, setScore] = React.useState(0);

            React.useEffect(() => {
              const saved = localStorage.getItem('mmp_exam_data');
              if (saved) {
                try { setExamData(JSON.parse(saved)); } catch { setExamData([]); }
              }
            }, []);

            const dsQs = examData.filter((q: any) => q.phan === 'ds');
            const tlnQs = examData.filter((q: any) => q.phan === 'tln');
            const nlcQs = examData.filter((q: any) => q.phan === 'nlc');

            const handleSubmit = () => {
              let s = 0;
              // Chấm NLC
              nlcQs.forEach((q: any, i: number) => {
                const key = `nlc_${i}`;
                if ((userAnswers[key] || '').toUpperCase() === q.dapAn.trim().toUpperCase()) s++;
              });
              // Chấm DS
              dsQs.forEach((q: any, idx: number) => {
                const daParts = (q.dapAn || '').split(/\s+/);
                let correct = 0;
                ['a','b','c','d'].forEach((_, k) => {
                  const key = `ds_${idx}_${k}`;
                  const userVal = userAnswers[key] || '';
                  const correctVal = (daParts[k] || '').toUpperCase();
                  const isCorrect = correctVal === 'Đ' || correctVal === 'D';
                  if ((userVal === 'Đ' && isCorrect) || (userVal === 'S' && !isCorrect)) correct++;
                });
                if (correct === 4) s += 1;
                else if (correct === 3) s += 0.5;
                else if (correct === 2) s += 0.25;
                else if (correct === 1) s += 0.1;
              });
              // Chấm TLN
              tlnQs.forEach((q: any, i: number) => {
                const key = `tln_${i}`;
                const userVal = (userAnswers[key] || '').toLowerCase().trim();
                const correctVal = q.dapAn.replace(/\$|\\dfrac|\\pi|\\pm|\\sqrt/g, '').toLowerCase().trim();
                if (userVal && (userVal === correctVal || correctVal.includes(userVal) || userVal.includes(correctVal))) s += 0.5;
              });
              setScore(s);
              setSubmitted(true);
            };

            const handleReset = () => {
              setUserAnswers({});
              setSubmitted(false);
              setScore(0);
            };

            const totalPoints = nlcQs.length * 0.25 + dsQs.length * 1 + tlnQs.length * 0.5;

            return (
              <motion.div
                key="kiem-tra"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h2 className="text-3xl font-black text-slate-900">🎯 Kiểm tra Đề thi</h2>
                      <p className="text-slate-500 text-sm mt-1">Làm bài và kiểm tra độ chính xác đề thi từ Tab 4</p>
                    </div>
                    <div className="flex gap-3">
                      {submitted && (
                        <button onClick={handleReset} className="px-5 py-2.5 bg-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-300 transition-all flex items-center">
                          <RefreshCw className="w-4 h-4 mr-2" /> Làm lại
                        </button>
                      )}
                      {!submitted && examData.length > 0 && (
                        <button onClick={handleSubmit} className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-rose-200 hover:from-rose-600 hover:to-pink-600 transition-all flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" /> Nộp bài chấm điểm
                        </button>
                      )}
                    </div>
                  </div>

                  {examData.length === 0 ? (
                    <div className="text-center py-16">
                      <AlertCircle className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                      <p className="text-slate-400 font-bold text-lg">Chưa có đề thi</p>
                      <p className="text-slate-300 text-sm mt-1">Vui lòng vào Tab 4 để tạo đề trước.</p>
                    </div>
                  ) : (
                    <>
                      {/* Kết quả */}
                      {submitted && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white text-center mb-8"
                        >
                          <p className="text-sm font-bold opacity-80 mb-1">TỔNG ĐIỂM</p>
                          <p className="text-5xl font-black">{score.toFixed(2)} <span className="text-2xl opacity-70">/ {totalPoints.toFixed(2)}</span></p>
                          <p className="text-sm mt-2 opacity-80">
                            NLC: {nlcQs.length} câu · DS: {dsQs.length} câu · TLN: {tlnQs.length} câu
                          </p>
                        </motion.div>
                      )}

                      {/* PHẦN I: NLC */}
                      {nlcQs.length > 0 && (
                        <div className="mb-8">
                          <h3 className="text-lg font-black text-emerald-700 mb-4 flex items-center gap-2">
                            <span className="bg-emerald-100 px-3 py-1 rounded-lg text-sm">PHẦN I</span> Trắc nghiệm nhiều phương án ({nlcQs.length} câu × 0,25đ)
                          </h3>
                          <div className="space-y-3">
                            {nlcQs.map((q: any, i: number) => {
                              const key = `nlc_${i}`;
                              const raw = q.noiDungCauHoi.replace(/^\[.*?\]\s*–?\s*/, '').trim();
                              const parts = raw.split(/\n?[A-D]\.\s*/);
                              const stem = parts[0].trim();
                              const isCorrect = submitted && (userAnswers[key] || '').toUpperCase() === q.dapAn.trim().toUpperCase();
                              const isWrong = submitted && !isCorrect;
                              return (
                                <div key={i} className={`p-4 rounded-2xl border-2 ${submitted ? (isCorrect ? 'border-emerald-400 bg-emerald-50' : 'border-rose-300 bg-rose-50') : 'border-slate-200 bg-white'}`}>
                                  <p className="font-bold text-sm mb-2"><span className="text-emerald-700">Câu {i+1}.</span> {stem}</p>
                                  <div className="flex gap-4 flex-wrap">
                                    {['A','B','C','D'].map(opt => (
                                      <label key={opt} className={`flex items-center gap-1.5 cursor-pointer text-sm px-3 py-1.5 rounded-xl border ${userAnswers[key] === opt ? 'bg-indigo-100 border-indigo-400 font-bold' : 'border-slate-200'}`}>
                                        <input type="radio" name={key} value={opt} checked={userAnswers[key] === opt} onChange={() => !submitted && setUserAnswers(prev => ({...prev, [key]: opt}))} disabled={submitted} className="accent-indigo-600" />
                                        {opt}
                                      </label>
                                    ))}
                                  </div>
                                  {isWrong && <p className="text-xs text-rose-600 font-bold mt-2">❌ Đáp án đúng: {q.dapAn}</p>}
                                  {isCorrect && <p className="text-xs text-emerald-600 font-bold mt-2">✅ Chính xác!</p>}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* PHẦN II: DS */}
                      {dsQs.length > 0 && (
                        <div className="mb-8">
                          <h3 className="text-lg font-black text-amber-700 mb-4 flex items-center gap-2">
                            <span className="bg-amber-100 px-3 py-1 rounded-lg text-sm">PHẦN II</span> Trắc nghiệm Đúng / Sai ({dsQs.length} câu × 1đ)
                          </h3>
                          <div className="space-y-4">
                            {dsQs.map((q: any, idx: number) => {
                              const raw = q.noiDungCauHoi;
                              const parts = raw.split(/\n(?=[a-d]\))/i);
                              const stem = parts[0].replace(/^\[.*?\]\s*–?\s*/, '').trim();
                              const items = ['a','b','c','d'].map((_: string, k: number) => parts[k+1] ? parts[k+1].replace(/^[a-d]\)\s*/i, '').trim() : '');
                              const daParts = (q.dapAn || '').split(/\s+/);
                              return (
                                <div key={idx} className="p-5 rounded-2xl border-2 border-amber-200 bg-white">
                                  <p className="font-bold text-sm mb-3"><span className="text-amber-700">Câu {idx+1}.</span> {stem}</p>
                                  <div className="space-y-2">
                                    {items.map((it: string, k: number) => {
                                      const key = `ds_${idx}_${k}`;
                                      const correctVal = (daParts[k] || '').toUpperCase();
                                      const isD = correctVal === 'Đ' || correctVal === 'D';
                                      const userVal = userAnswers[key];
                                      const userIsCorrect = submitted && ((userVal === 'Đ' && isD) || (userVal === 'S' && !isD));
                                      const userIsWrong = submitted && userVal && !userIsCorrect;
                                      return (
                                        <div key={k} className={`flex items-center gap-3 p-2.5 rounded-xl ${submitted ? (userIsCorrect ? 'bg-emerald-50 border border-emerald-300' : userIsWrong ? 'bg-rose-50 border border-rose-300' : 'bg-slate-50 border border-slate-200') : 'bg-slate-50 border border-slate-200'}`}>
                                          <span className="font-bold text-sm text-amber-600 w-5">{['a','b','c','d'][k]})</span>
                                          <span className="text-sm flex-1">{it}</span>
                                          <div className="flex gap-2">
                                            {['Đ', 'S'].map(v => (
                                              <button key={v} onClick={() => !submitted && setUserAnswers(prev => ({...prev, [key]: v}))} disabled={submitted}
                                                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${userAnswers[key] === v ? (v === 'Đ' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white') : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-100'}`}
                                              >{v === 'Đ' ? 'Đúng' : 'Sai'}</button>
                                            ))}
                                          </div>
                                          {submitted && <span className={`text-xs font-bold ${userIsCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>{userIsCorrect ? '✅' : '❌'}</span>}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* PHẦN III: TLN */}
                      {tlnQs.length > 0 && (
                        <div className="mb-8">
                          <h3 className="text-lg font-black text-rose-700 mb-4 flex items-center gap-2">
                            <span className="bg-rose-100 px-3 py-1 rounded-lg text-sm">PHẦN III</span> Trả lời ngắn ({tlnQs.length} câu × 0,5đ)
                          </h3>
                          <div className="space-y-3">
                            {tlnQs.map((q: any, i: number) => {
                              const key = `tln_${i}`;
                              const clean = q.noiDungCauHoi.replace(/^\[.*?\]\s*–?\s*/, '').trim();
                              return (
                                <div key={i} className={`p-4 rounded-2xl border-2 ${submitted ? (userAnswers[key] ? 'border-indigo-300 bg-indigo-50' : 'border-slate-200 bg-slate-50') : 'border-slate-200 bg-white'}`}>
                                  <p className="font-bold text-sm mb-2"><span className="text-rose-700">Câu {i+1}.</span> {clean}</p>
                                  <input
                                    type="text"
                                    value={userAnswers[key] || ''}
                                    onChange={e => !submitted && setUserAnswers(prev => ({...prev, [key]: e.target.value}))}
                                    disabled={submitted}
                                    placeholder="Nhập đáp án..."
                                    className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl text-sm outline-none focus:border-rose-400 transition-all"
                                  />
                                  {submitted && (
                                    <p className="text-xs mt-2 font-bold text-indigo-600">📝 Đáp án đúng: {q.dapAn}</p>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  <div className="mt-8 text-center text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
                    Thiết kế bởi <span className="text-slate-900">Bùi Thị Kiên</span>
                  </div>
                </div>
              </motion.div>
            );
          })()}

      </AnimatePresence>
    </div>
  );
}




type CauHoi = {
  id: number;
  phan: 'nlc' | 'ds' | 'tln';
  soThuTu: number;
  chuong: string;
  noiDung: string;
  mucDo: string;
  yeuCau: string;
  noiDungCauHoi: string;
  dapAn: string;
};

function allocateByTiet(quota: number, items: Array<{ soTiet: number }>): number[] {
  if (items.length === 0) return [];
  const totalTiet = items.reduce((s, nd) => s + nd.soTiet, 0);
  if (totalTiet === 0) {
    const base = Math.floor(quota / items.length);
    const alloc = items.map(() => base);
    let rem = quota - base * items.length;
    for (let i = 0; rem > 0 && i < items.length; i++, rem--) alloc[i]++;
    return alloc;
  }
  const exact = items.map(nd => (nd.soTiet / totalTiet) * quota);
  const floor = exact.map(v => Math.floor(v));
  let needed = quota - floor.reduce((a, b) => a + b, 0);
  const order = exact.map((v, i) => ({ rem: v - floor[i], i })).sort((a, b) => b.rem - a.rem);
  for (let k = 0; k < needed; k++) floor[order[k].i]++;
  return floor;
}




// ─── THEO DÕI CÂU HỎI ĐÃ DÙNG (tránh trùng lặp trong 1 lần tạo đề) ─────────
const usedEntries = new Set<QBankEntry>();

function resetUsedEntries() { usedEntries.clear(); }

/** Tìm key ngân hàng phù hợp nhất với tên nội dung bài học */
function findBankKeys(noiDung: string): string[] {
  const noi = noiDung.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const allKeys = Object.keys(QUESTION_BANK).filter(k => k !== 'default');

  // Map từ khóa tiếng Việt => key trong QUESTION_BANK
  const aliases: Record<string, string[]> = {
    'ham so':        ['hàm số'],
    'dao ham':       ['đạo hàm'],
    'nguyen ham':    ['nguyên hàm'],
    'tich phan':     ['tích phân'],
    'ung dung tich phan': ['ứng dụng tích phân'],
    'xac suat':      ['xác suất', 'xác suất có điều kiện'],
    'xac suat co dieu kien': ['xác suất có điều kiện'],
    'to hop':        ['tổ hợp – hoán vị'],
    'hoan vi':       ['tổ hợp – hoán vị'],
    'day so':        ['dãy số'],
    'cap so cong':   ['dãy số'],
    'cap so nhan':   ['dãy số'],
    'phuong trinh mat phang': ['phương trình mặt phẳng'],
    'phuong trinh duong thang': ['phương trình đường thẳng'],
    'phuong trinh mat cau': ['phương trình mặt cầu'],
    'the tich':      ['ứng dụng tích phân'],
    'dien tich':     ['ứng dụng tích phân'],
  };

  // Bước 1: thử ánh xạ alias
  for (const [kw, keys] of Object.entries(aliases)) {
    if (noi.includes(kw)) {
      const found = keys.filter(k => QUESTION_BANK[k]);
      if (found.length > 0) return found;
    }
  }

  // Bước 2: tìm key ngân hàng có từ khóa dài khớp với noiDung
  const matched = allKeys.filter(k => {
    const kNorm = k.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const words = kNorm.split(/\s+/);
    return words.some(w => w.length > 3 && noi.includes(w));
  });
  if (matched.length > 0) return matched;

  return ['default'];
}

/** Lấy 1 câu từ ngân hàng theo nội dung + phần + mức độ, không trùng */
function pickQuestion(noiDung: string, phan: 'nlc'|'ds'|'tln', mucDoTen: string): QBankEntry | undefined {
  const targetMD = mucDoTen === 'Nhận biết' ? 'NB'
    : mucDoTen.includes('Thông') ? 'TH'
    : mucDoTen === 'Vận dụng cao' ? 'VDC' : 'VD';

  const bankKeys = findBankKeys(noiDung);

  // Gom pool từ các key phù hợp (cùng phan + mức)
  let pool: QBankEntry[] = [];
  for (const k of bankKeys) {
    pool = pool.concat((QUESTION_BANK[k] || []).filter(q => q.phan === phan && q.mucDo === targetMD));
  }

  // ★ DS & TLN: luôn thêm CÂU THỰC TẾ từ 'bài toán thực tế' + 'tổng hợp'
  //   Với DS: lấy TẤT CẢ mức độ (vì mỗi câu DS tổng hợp NB+TH+TH+VD)
  //   Với TLN: lấy đúng mức độ trước, nếu không có thì lấy tất cả
  if (phan === 'ds') {
    // DS: ưu tiên câu thực tế, lấy tất cả mức độ
    const dsRealPool = [
      ...(QUESTION_BANK['bài toán thực tế'] || []).filter(q => q.phan === 'ds'),
      ...(QUESTION_BANK['tổng hợp'] || []).filter(q => q.phan === 'ds'),
    ];
    // Ghép câu thực tế vào pool (tránh trùng)
    dsRealPool.forEach(q => { if (!pool.includes(q)) pool.push(q); });
  } else if (phan === 'tln') {
    // TLN: lấy câu thực tế đúng mức độ trước
    const tlnSameMD = [
      ...(QUESTION_BANK['bài toán thực tế'] || []).filter(q => q.phan === 'tln' && q.mucDo === targetMD),
      ...(QUESTION_BANK['tổng hợp'] || []).filter(q => q.phan === 'tln' && q.mucDo === targetMD),
    ];
    tlnSameMD.forEach(q => { if (!pool.includes(q)) pool.push(q); });

    // Nếu vẫn rỗng → lấy TLN thực tế bất kỳ mức
    if (pool.length === 0) {
      const tlnAny = [
        ...(QUESTION_BANK['bài toán thực tế'] || []).filter(q => q.phan === 'tln'),
        ...(QUESTION_BANK['tổng hợp'] || []).filter(q => q.phan === 'tln'),
      ];
      pool = tlnAny;
    }
  }

  // Fallback: cùng phan + mức từ default + tổng hợp
  if (pool.length === 0) {
    for (const fk of ['tổng hợp', 'bài toán thực tế', 'default']) {
      pool = pool.concat((QUESTION_BANK[fk] || []).filter(q => q.phan === phan && q.mucDo === targetMD));
    }
  }

  // Fallback cuối: cùng phan bất kỳ mức
  if (pool.length === 0) {
    const allSources = [...bankKeys, 'bài toán thực tế', 'tổng hợp', 'default'];
    for (const k of allSources) {
      pool = pool.concat((QUESTION_BANK[k] || []).filter(q => q.phan === phan));
    }
  }

  // Ưu tiên câu chưa dùng
  const unused = pool.filter(q => !usedEntries.has(q));
  const chosen = unused.length > 0
    ? unused[Math.floor(Math.random() * unused.length)]
    : pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : undefined;

  if (chosen) usedEntries.add(chosen);
  return chosen;
}



function generateExamQuestions(data: any[], countQuestions: (s: string) => number): CauHoi[] {
  const MUC_DO_MAP: Record<number, string> = { 0: 'Nhận biết', 1: 'Thông hiểu', 2: 'Vận dụng' };
  resetUsedEntries();

  const result: CauHoi[] = [];
  let nlcCount = 0, dsCount = 0, tlnCount = 0;

  data.forEach((chuong: any) => {
    if (!chuong.tenChuong) return;
    chuong.noiDungs.forEach((nd: any) => {
      if (!nd.tenNoiDung) return;

      // ── PHẦN I: Trắc nghiệm nhiều phương án ──────────────────────────
      nd.mucDos.forEach((md: any, mIdx: number) => {
        const n = countQuestions(md.qs.nlc);
        if (n <= 0) return;
        const mucDoTen = MUC_DO_MAP[mIdx] || 'Vận dụng';
        for (let k = 0; k < n; k++) {
          const bq = pickQuestion(nd.tenNoiDung, 'nlc', mucDoTen);
          nlcCount++;
          result.push({
            id: Date.now() + Math.random(),
            phan: 'nlc', soThuTu: nlcCount,
            chuong: chuong.tenChuong,
            noiDung: nd.tenNoiDung,
            mucDo: mucDoTen,
            yeuCau: md.yeuCau || '',
            noiDungCauHoi: bq ? bq.noiDung
              : `[${mucDoTen.toUpperCase()}] ${nd.tenNoiDung}\nA. Phương án A\u2003B. Phương án B\u2003C. Phương án C\u2003D. Phương án D`,
            dapAn: bq ? bq.dapAn : 'A',
          });
        }
      });

      // ── PHẦN II: Đúng/Sai ─────────────────────────────────────────────
      const nDs = nd.mucDos.reduce((s: number, md: any) => s + countQuestions(md.qs.ds), 0);
      for (let k = 0; k < nDs; k++) {
        const bq = pickQuestion(nd.tenNoiDung, 'ds', 'Nhận biết');
        dsCount++;
        result.push({
          id: Date.now() + Math.random(),
          phan: 'ds', soThuTu: dsCount,
          chuong: chuong.tenChuong,
          noiDung: nd.tenNoiDung,
          mucDo: 'Hỗn hợp (NB+TH+TH+VD)',
          yeuCau: nd.mucDos[1]?.yeuCau || '',
          noiDungCauHoi: bq ? bq.noiDung
            : `Cho các mệnh đề sau về "${nd.tenNoiDung}", xác định Đúng (Đ) hoặc Sai (S):\na) Mệnh đề 1\nb) Mệnh đề 2\nc) Mệnh đề 3\nd) Mệnh đề 4`,
          dapAn: bq ? bq.dapAn : 'Đ S Đ S',
        });
      }

      // ── PHẦN III: Trả lời ngắn ─────────────────────────────────────────
      const nTlnTH     = countQuestions(nd.mucDos[1]?.qs?.tln || '');
      const nTlnVD_raw = countQuestions(nd.mucDos[2]?.qs?.tln || '');
      const nTlnVD     = Math.ceil(nTlnVD_raw / 2);
      const nTlnVDC    = Math.floor(nTlnVD_raw / 2);

      for (let k = 0; k < nTlnTH; k++) {
        const bq = pickQuestion(nd.tenNoiDung, 'tln', 'Thông hiểu');
        tlnCount++;
        result.push({
          id: Date.now() + Math.random(),
          phan: 'tln', soThuTu: tlnCount,
          chuong: chuong.tenChuong,
          noiDung: nd.tenNoiDung,
          mucDo: 'NB',
          yeuCau: nd.mucDos[1]?.yeuCau || '',
          noiDungCauHoi: bq ? bq.noiDung : `[NB – TLN] ${nd.tenNoiDung}`,
          dapAn: bq ? bq.dapAn : '...',
        });
      }
      for (let k = 0; k < nTlnVD; k++) {
        const bq = pickQuestion(nd.tenNoiDung, 'tln', 'Vận dụng');
        tlnCount++;
        result.push({
          id: Date.now() + Math.random(),
          phan: 'tln', soThuTu: tlnCount,
          chuong: chuong.tenChuong,
          noiDung: nd.tenNoiDung,
          mucDo: 'TH',
          yeuCau: nd.mucDos[2]?.yeuCau || '',
          noiDungCauHoi: bq ? bq.noiDung : `[TH – TLN] ${nd.tenNoiDung}`,
          dapAn: bq ? bq.dapAn : '...',
        });
      }
      for (let k = 0; k < nTlnVDC; k++) {
        const bq = pickQuestion(nd.tenNoiDung, 'tln', 'Vận dụng cao');
        tlnCount++;
        result.push({
          id: Date.now() + Math.random(),
          phan: 'tln', soThuTu: tlnCount,
          chuong: chuong.tenChuong,
          noiDung: nd.tenNoiDung,
          mucDo: 'VD+VDC',
          yeuCau: nd.mucDos[2]?.yeuCau || '',
          noiDungCauHoi: bq ? bq.noiDung : `[VD+VDC – TLN] ${nd.tenNoiDung}`,
          dapAn: bq ? bq.dapAn : '...',
        });
      }
    });
  });

  // Đánh lại số thứ tự theo từng phần
  let n1 = 0, n2 = 0, n3 = 0;
  return result.map(q => {
    if (q.phan === 'nlc') return { ...q, soThuTu: ++n1 };
    if (q.phan === 'ds')  return { ...q, soThuTu: ++n2 };
    return { ...q, soThuTu: ++n3 };
  });
}






function TabTaoDeTuDong({ data, countQuestions }: { data: any[], countQuestions: (s: string) => number }) {
  const [cauHois, setCauHois] = React.useState<CauHoi[]>([]);
  const [isGenerated, setIsGenerated] = React.useState(false);
  const [tenTruong, setTenTruong] = React.useState('TRƯỜNG THPT ...');
  // KaTeX auto-render sau khi sinh đề
  const mathRef = useMathRender([cauHois, isGenerated]);
  const [tenDe, setTenDe] = React.useState('ĐỀ KIỂM TRA MÔN TOÁN 12');
  const [thoiGian, setThoiGian] = React.useState('90');
  const [nguonTaiLieu, setNguonTaiLieu] = React.useState('giaoandethi.com');
  const [hienThiDapAn, setHienThiDapAn] = React.useState(false);
  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [warnMsg, setWarnMsg] = React.useState<string>('');
  const [soGDDT, setSoGDDT] = React.useState('SỞ GD&ĐT ...');
  const [tenKyThi, setTenKyThi] = React.useState('KIỂM TRA GIỮA HỌC KỲ II');
  const [namHoc, setNamHoc] = React.useState('2025 - 2026');
  const [maDe, setMaDe] = React.useState('112');

  // ── NGUỒN TÀI LIỆU ──────────────────────────────────────────
  const [showNguon, setShowNguon] = React.useState(true);
  const [keywordSearch, setKeywordSearch] = React.useState('');
  const [pasteTxt, setPasteTxt] = React.useState('');
  const [importedCount, setImportedCount] = React.useState(0);
  const [extraBank, setExtraBank] = React.useState<Array<{noiDung: string, dapAn: string, phan: string}>>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const ONLINE_SOURCES = [
    {
      name: 'Giáo án Đề thi',
      url: 'https://giaoandethi.com',
      searchUrl: (kw: string) => `https://giaoandethi.com/?s=${encodeURIComponent(kw)}`,
      color: 'bg-blue-600', hoverColor: 'hover:bg-blue-700',
      icon: '📚', desc: 'Kho giáo án, đề thi & tài liệu giảng dạy',
    },
    {
      name: 'Toanmath.com',
      url: 'https://toanmath.com',
      searchUrl: (kw: string) => `https://toanmath.com/?s=${encodeURIComponent(kw)}`,
      color: 'bg-emerald-600', hoverColor: 'hover:bg-emerald-700',
      icon: '📐', desc: 'Trắc nghiệm & đề thi Toán chuyên sâu',
    },
  ];

  // Xử lý upload file từ ổ D / ổ C
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    let count = 0;
    const newBank: Array<{noiDung: string, dapAn: string, phan: string}> = [];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target?.result as string || '';
        // Phân tích từng dòng: nếu dòng bắt đầu bằng số thứ tự hoặc "Câu" => question
        const lines = text.split(/\r?\n/).filter(l => l.trim().length > 10);
        lines.forEach(line => {
          const trimmed = line.trim();
          // Tìm đáp án ở cuối dòng dạng "ĐA: A" hoặc "Đáp án: ..."
          const dapAnMatch = trimmed.match(/(?:đ[aá]p\s*[aá]n|ĐA|DA)[\s:]+([A-Dd\.\-\w]+)/i);
          const dapAn = dapAnMatch ? dapAnMatch[1].trim() : '...';
          const noiDung = trimmed.replace(/(?:đ[aá]p\s*[aá]n|ĐA|DA)[\s:]+[A-Dd\.\-\w]+/i, '').trim();
          if (noiDung.length > 8) {
            newBank.push({ noiDung, dapAn, phan: 'nlc' });
            count++;
          }
        });
        setExtraBank(prev => [...prev, ...newBank]);
        setImportedCount(prev => prev + count);
      };
      reader.readAsText(file as File, 'utf-8');
    });
    // Reset input để cho phép tải lại cùng file
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Xử lý dán văn bản thủ công
  const handlePasteImport = () => {
    if (!pasteTxt.trim()) return;
    const lines = pasteTxt.split(/\r?\n/).filter(l => l.trim().length > 10);
    const newBank: Array<{noiDung: string, dapAn: string, phan: string}> = [];
    lines.forEach(line => {
      const trimmed = line.trim();
      const dapAnMatch = trimmed.match(/(?:đ[aá]p\s*[aá]n|ĐA|DA)[\s:]+([A-Dd\.\-\w]+)/i);
      const dapAn = dapAnMatch ? dapAnMatch[1].trim() : '...';
      const noiDung = trimmed.replace(/(?:đ[aá]p\s*[aá]n|ĐA|DA)[\s:]+[A-Dd\.\-\w]+/i, '').trim();
      if (noiDung.length > 8) newBank.push({ noiDung, dapAn, phan: 'nlc' });
    });
    setExtraBank(prev => [...prev, ...newBank]);
    setImportedCount(prev => prev + newBank.length);
    setPasteTxt('');
  };

  const QUOTA = { nlc: 12, ds: 4, tln: 6 };
  const hasData = data.some(c => c.tenChuong && c.noiDungs.some((nd: any) => nd.tenNoiDung));
  const nlcQuestions = cauHois.filter(q => q.phan === 'nlc');
  const dsQuestions  = cauHois.filter(q => q.phan === 'ds');
  const tlnQuestions = cauHois.filter(q => q.phan === 'tln');

  const handleGenerate = () => {
    const qs = generateExamQuestions(data, countQuestions);
    setCauHois(qs);
    setIsGenerated(true);
    setEditingId(null);
    // Kiểm tra và cảnh báo nếu thiếu câu
    const nlcRaw = qs.filter(q => q.phan === 'nlc').length;
    const dsRaw  = qs.filter(q => q.phan === 'ds').length;
    const tlnRaw = qs.filter(q => q.phan === 'tln').length;
    const warns: string[] = [];
    if (nlcRaw < QUOTA.nlc) warns.push(`Trắc nghiệm nhiều phương án: ma trận có ${nlcRaw}/${QUOTA.nlc} câu`);
    if (dsRaw  < QUOTA.ds)  warns.push(`Đúng/Sai: ma trận có ${dsRaw}/${QUOTA.ds} câu`);
    if (tlnRaw < QUOTA.tln) warns.push(`Trả lời ngắn: ma trận có ${tlnRaw}/${QUOTA.tln} câu`);
    setWarnMsg(warns.length ? '⚠️ Lưu ý: ' + warns.join(' · ') : '');
    // Lưu đề thi vào localStorage để Tab 5 kiểm tra
    localStorage.setItem('mmp_exam_data', JSON.stringify(qs));
  };

  const handleUpdateCauHoi = (id: number, field: keyof CauHoi, value: string) => {
    setCauHois(prev => prev.map(q => q.id === id ? { ...q, [field]: value } : q));
  };

  const exportExamToWord = () => {
    // Parse NLC questions into stem + options
    const parseNLC = (q: CauHoi) => {
      const raw = q.noiDungCauHoi.replace(/^\[.*?\]\s*–?\s*/, '').trim();
      const parts = raw.split(/\n?[A-D]\.\s*/);
      const stem = parts[0].trim();
      const opts = [...raw.matchAll(/([A-D])\.\s*([^\n]*)/g)];
      const options = opts.length > 0
        ? opts.map(m => ({ l: m[1], t: m[2].trim() }))
        : ['A','B','C','D'].map((l,k) => ({ l, t: parts[k+1]?.trim() || '' }));
      return { stem, options };
    };

    // Parse DS questions into stem + sub-items
    const parseDS = (q: CauHoi) => {
      const raw = q.noiDungCauHoi;
      const parts = raw.split(/\n(?=[a-d]\))/i);
      const stem = parts[0].replace(/^\[.*?\]\s*–?\s*/, '').trim();
      const items = ['a','b','c','d'].map((_, k) => {
        if (parts[k+1]) return parts[k+1].replace(/^[a-d]\)\s*/i, '').trim();
        return '';
      });
      return { stem, items };
    };

    // Build NLC HTML
    const nlcHTML = nlcQuestions.map((q, i) => {
      const { stem, options } = parseNLC(q);
      return `
        <p style="margin:6pt 0 2pt"><b>Câu ${i+1}.</b> ${stem}</p>
        <table style="border:none;width:100%;margin-left:24pt"><tr>
          <td style="border:none;width:50%;padding:2pt"><b>A.</b> ${options[0]?.t||''}</td>
          <td style="border:none;width:50%;padding:2pt"><b>B.</b> ${options[1]?.t||''}</td>
        </tr><tr>
          <td style="border:none;width:50%;padding:2pt"><b>C.</b> ${options[2]?.t||''}</td>
          <td style="border:none;width:50%;padding:2pt"><b>D.</b> ${options[3]?.t||''}</td>
        </tr></table>`;
    }).join('');

    // Build DS HTML
    const dsHTML = dsQuestions.map((q, i) => {
      const { stem, items } = parseDS(q);
      return `
        <p style="margin:6pt 0 2pt"><b>Câu ${i+1}:</b> ${stem}</p>
        <div style="margin-left:24pt">
          ${items.map((it, k) => `<p style="margin:2pt 0">${['a','b','c','d'][k]}) ${it}</p>`).join('')}
        </div>`;
    }).join('');

    // Build TLN HTML
    const tlnHTML = tlnQuestions.map((q, i) => {
      const clean = q.noiDungCauHoi.replace(/^\[.*?\]\s*–?\s*/, '').trim();
      return `<p style="margin:6pt 0 2pt"><b>Câu ${i+1}:</b></p><p style="margin-left:24pt">${clean}</p>`;
    }).join('');

    // Answer key - Phần I table
    const dapAnI = `<table style="border-collapse:collapse;margin:6pt 0">
      <tr>${nlcQuestions.map((_,i) => `<td style="border:1px solid #000;padding:3pt 6pt;text-align:center;font-weight:bold;font-size:9pt">Câu ${i+1}</td>`).join('')}</tr>
      <tr>${nlcQuestions.map(q => `<td style="border:1px solid #000;padding:3pt 6pt;text-align:center;font-weight:bold">${q.dapAn}</td>`).join('')}</tr>
    </table>`;

    // Answer key - Phần II table  
    const dapAnII = `<table style="border-collapse:collapse;margin:6pt 0">
      <tr><td style="border:1px solid #000;padding:3pt 10pt;font-weight:bold"></td>${dsQuestions.map((_,i) => `<td style="border:1px solid #000;padding:3pt 10pt;text-align:center;font-weight:bold">Câu ${i+1}</td>`).join('')}</tr>
      ${['a','b','c','d'].map((label, k) => `<tr><td style="border:1px solid #000;padding:3pt 10pt;text-align:center">${label})</td>${dsQuestions.map(q => {
        const parts = (q.dapAn||'').split(/\s+/);
        const v = (parts[k]||'').toUpperCase();
        const d = v==='Đ'||v==='D'?'Đ':v==='S'?'S':v;
        return `<td style="border:1px solid #000;padding:3pt 10pt;text-align:center">${label}) ${d}</td>`;
      }).join('')}</tr>`).join('')}
    </table>`;

    // Answer key - Phần III table
    const dapAnIII = `<table style="border-collapse:collapse;margin:6pt 0">
      <tr>${tlnQuestions.map((_,i) => `<td style="border:1px solid #000;padding:3pt 14pt;text-align:center;font-weight:bold;font-size:9pt">Câu ${i+1}</td>`).join('')}</tr>
      <tr>${tlnQuestions.map(q => `<td style="border:1px solid #000;padding:3pt 14pt;text-align:center">${q.dapAn}</td>`).join('')}</tr>
    </table>`;

    const html = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>${tenDe}</title>
      <style>
        @page { size: A4; margin: 2cm 2cm 2cm 2cm; }
        body { font-family: "Times New Roman", Times, serif; font-size: 12pt; line-height: 1.5; }
      </style></head>
      <body>
        <!-- HEADER -->
        <table style="border:none;width:100%;margin-bottom:4pt"><tr>
          <td style="border:none;width:50%;text-align:center;font-size:12pt">
            <i>${soGDDT}</i><br/><b><u>${tenTruong}</u></b>
          </td>
          <td style="border:none;width:50%;text-align:center;font-size:12pt">
            <b>${tenKyThi}</b><br/><b>NĂM HỌC ${namHoc}</b>
          </td>
        </tr></table>
        <p style="text-align:center;font-weight:bold;font-size:12pt;margin:2pt 0">MÔN TOÁN - Lớp 12</p>
        <table style="border:none;width:100%"><tr>
          <td style="border:none;font-style:italic;font-size:11pt">(Đề thi có ${Math.ceil((nlcQuestions.length + dsQuestions.length + tlnQuestions.length) / 8)} trang)</td>
          <td style="border:none;text-align:right;font-size:11pt">Thời gian làm bài: ${thoiGian} phút<br/><i>(không kể thời gian phát đề)</i></td>
        </tr></table>
        <p style="text-align:center;margin:12pt 0">
          <span style="border:2px solid #000;padding:4pt 20pt;font-weight:bold;font-size:14pt">Mã đề ${maDe}</span>
        </p>
        <p style="margin-bottom:16pt">Họ và tên học sinh: .......................................................... Số báo danh: .......................</p>

        <!-- PHẦN I -->
        <p><b>PHẦN I. Câu trắc nghiệm nhiều phương án lựa chọn.</b> <i>Thí sinh trả lời từ câu 1 đến câu ${nlcQuestions.length}. Mỗi câu hỏi thí sinh chỉ chọn một phương án.</i></p>
        ${nlcHTML}

        <!-- PHẦN II -->
        <p style="margin-top:14pt"><b>PHẦN II. Câu trắc nghiệm đúng sai.</b> <i>(Thí sinh trả lời từ câu 1 đến câu ${dsQuestions.length}. Trong mỗi ý a), b), c), d) ở mỗi câu, thí sinh chọn đúng hoặc sai.)</i></p>
        ${dsHTML}

        <!-- PHẦN III -->
        <p style="margin-top:14pt"><b>PHẦN III. Câu hỏi trắc nghiệm trả lời ngắn.</b> <i>Thí sinh trả lời từ câu 1 đến câu ${tlnQuestions.length}</i></p>
        ${tlnHTML}

        <!-- HẾT -->
        <p style="text-align:center;margin:30pt 0;font-size:13pt">--------------------<b>HẾT</b>--------------------</p>

        <!-- ĐÁP ÁN -->
        <p style="text-align:center;font-weight:bold;font-size:14pt;border-top:2pt solid #000;padding-top:12pt">ĐÁP ÁN VÀ THANG ĐIỂM CHẤM</p>
        
        <p style="font-weight:bold">PHẦN I</p>
        <p><i>(Mỗi câu trả lời đúng học sinh được <b>0,25 điểm</b>)</i></p>
        ${dapAnI}

        <p style="font-weight:bold;margin-top:12pt">PHẦN II</p>
        <p>Điểm tối đa của 01 câu hỏi là <b>1 điểm</b>.</p>
        <p>- Thí sinh chỉ lựa chọn chính xác 01 ý trong 1 câu hỏi được <b>0,1 điểm</b>.</p>
        <p>- Thí sinh chỉ lựa chọn chính xác 02 ý trong 1 câu hỏi được <b>0,25 điểm</b>.</p>
        <p>- Thí sinh chỉ lựa chọn chính xác 03 ý trong 1 câu hỏi được <b>0,5 điểm</b>.</p>
        <p>- Thí sinh chỉ lựa chọn chính xác 04 ý trong 1 câu hỏi được <b>1 điểm</b>.</p>
        ${dapAnII}

        <p style="font-weight:bold;margin-top:12pt">PHẦN III</p>
        <p><i>(Mỗi câu trả lời đúng học sinh được <b>0,5 điểm</b>)</i></p>
        ${dapAnIII}

        <p style="text-align:center;margin-top:16pt;font-style:italic;color:#666;font-size:10pt">Thiết kế bởi Bùi Thị Kiên</p>
      </body></html>`;

    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `De_Thi_Ma_${maDe}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // ── XUẤT JSON ──────────────────────────────────────────────
  const exportExamToJSON = () => {
    let qId = 0;
    const questions: any[] = [];

    // Phần I: Trắc nghiệm nhiều phương án
    nlcQuestions.forEach((q) => {
      qId++;
      const raw = q.noiDungCauHoi.replace(/^\[.*?\]\s*–?\s*/, '').trim();
      const parts = raw.split(/\n?[A-D]\.\s*/);
      const stem = parts[0].trim();
      const opts = [...raw.matchAll(/([A-D])\.\s*([^\n]*)/g)];
      const options: Record<string, string> = {};
      if (opts.length > 0) opts.forEach(m => { options[m[1]] = m[2].trim(); });
      else ['A','B','C','D'].forEach((l,k) => { options[l] = parts[k+1]?.trim() || ''; });

      questions.push({
        id: qId,
        type: 'multiple_choice',
        section: 'PHẦN I',
        content: stem,
        options,
        correct_answer: q.dapAn.trim().toUpperCase(),
        difficulty: q.mucDo,
        topic: q.noiDung
      });
    });

    // Phần II: Đúng/Sai
    dsQuestions.forEach((q) => {
      qId++;
      const raw = q.noiDungCauHoi;
      const parts = raw.split(/\n(?=[a-d]\))/i);
      const stem = parts[0].replace(/^\[.*?\]\s*–?\s*/, '').trim();
      const items = ['a','b','c','d'].map((_, k) => {
        if (parts[k+1]) return parts[k+1].replace(/^[a-d]\)\s*/i, '').trim();
        return '';
      });
      const dapAnParts = (q.dapAn || '').split(/\s+/);
      const statements = items.map((content, k) => ({
        label: ['a','b','c','d'][k],
        content,
        correct_answer: (dapAnParts[k] || '').toUpperCase() === 'Đ' || (dapAnParts[k] || '').toUpperCase() === 'D',
        explanation: ''
      }));

      questions.push({
        id: qId,
        type: 'true_false',
        section: 'PHẦN II',
        content: stem,
        statements,
        difficulty: q.mucDo,
        topic: q.noiDung
      });
    });

    // Phần III: Trả lời ngắn
    tlnQuestions.forEach((q) => {
      qId++;
      const clean = q.noiDungCauHoi.replace(/^\[.*?\]\s*–?\s*/, '').trim();
      questions.push({
        id: qId,
        type: 'short_answer',
        section: 'PHẦN III',
        content: clean,
        accepted_answers: [q.dapAn.trim()],
        sample_answer: q.dapAn.trim(),
        difficulty: q.mucDo,
        topic: q.noiDung
      });
    });

    const jsonData = {
      test_metadata: {
        title: tenDe,
        school: tenTruong,
        exam_code: maDe,
        exam_type: tenKyThi,
        academic_year: namHoc,
        duration_minutes: parseInt(thoiGian),
        total_questions: cauHois.length,
        sections: {
          multiple_choice: { count: nlcQuestions.length, points_each: 0.25 },
          true_false: { count: dsQuestions.length, points_each: 1.0 },
          short_answer: { count: tlnQuestions.length, points_each: 0.5 }
        },
        created_by: 'Bùi Thị Kiên',
        created_at: new Date().toISOString()
      },
      questions
    };

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `De_Thi_Ma_${maDe}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const phanColors = {
    nlc: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700', headerBg: 'bg-emerald-600' },
    ds:  { bg: 'bg-amber-50',   border: 'border-amber-200',   text: 'text-amber-700',   badge: 'bg-amber-100 text-amber-700',   headerBg: 'bg-amber-600'   },
    tln: { bg: 'bg-rose-50',    border: 'border-rose-200',    text: 'text-rose-700',    badge: 'bg-rose-100 text-rose-700',    headerBg: 'bg-rose-600'    },
  };

  return (
    <motion.div
      key="tao-de"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
      ref={mathRef as React.RefObject<HTMLDivElement>}
    >
      {/* ── PANEL NGUỒN TÀI LIỆU ─────────────────────────────────── */}
      <div id="nguon-tai-lieu-panel" className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl border border-indigo-800 shadow-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-500/30 rounded-xl flex items-center justify-center text-lg">📂</div>
            <div>
              <h3 className="font-black text-base">Nguồn Tài Liệu Câu Hỏi</h3>
              <p className="text-indigo-300 text-[11px]">Lấy câu từ online hoặc từ file trên máy tính (ổ C, ổ D...)</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {importedCount > 0 && (
              <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-black rounded-full animate-pulse">
                ✅ {importedCount} câu đã nhập
              </span>
            )}
            <button
              onClick={() => setShowNguon(!showNguon)}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all"
            >
              {showNguon ? '▲ Thu gọn' : '▼ Mở rộng'}
            </button>
          </div>
        </div>

        {showNguon && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* CỘT TRÁI: Nguồn Online */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-3">🌐 Nguồn Online</p>
              <div className="flex gap-2 mb-3">
                <input
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder-indigo-300 outline-none focus:border-indigo-400"
                  placeholder="Nhập từ khóa tìm kiếm..."
                  value={keywordSearch}
                  onChange={e => setKeywordSearch(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && keywordSearch.trim()) {
                      window.open(`https://giaoandethi.com/?s=${encodeURIComponent(keywordSearch)}`, '_blank');
                    }
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                {ONLINE_SOURCES.map(src => (
                  <div key={src.name} className="flex items-center gap-2">
                    <button
                      onClick={() => window.open(keywordSearch.trim() ? src.searchUrl(keywordSearch) : src.url, '_blank')}
                      className={`flex-1 px-4 py-2.5 ${src.color} ${src.hoverColor} text-white rounded-xl font-bold text-xs flex items-center gap-2 transition-all`}
                    >
                      <span className="text-base">{src.icon}</span>
                      <div className="text-left">
                        <div>{src.name}</div>
                        <div className="font-normal opacity-80 text-[10px]">{src.desc}</div>
                      </div>
                      <span className="ml-auto text-[10px] opacity-70">↗</span>
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-indigo-400 text-[10px] mt-3 italic">
                💡 Sau khi tìm, dán nội dung câu hỏi vào ô bên phải để nhập vào ngân hàng
              </p>
            </div>

            {/* CỘT PHẢI: File từ máy + Dán text */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col gap-3">
              {/* Upload file từ ổ D, C */}
              <div>
                <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-2">💾 Từ Ổ Đĩa Máy Tính (D:, C:...)</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".txt,.doc,.docx,.csv"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full px-4 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all border-2 border-dashed border-violet-400"
                >
                  <span className="text-lg">📁</span>
                  Chọn file từ máy tính
                  <span className="text-[10px] bg-violet-500 px-2 py-0.5 rounded-full">.txt .doc .docx</span>
                </button>
                <p className="text-indigo-400 text-[10px] mt-1.5 italic text-center">
                  Có thể chọn nhiều file — tự động đọc và phân tích câu hỏi
                </p>
              </div>

              {/* Dán text thủ công */}
              <div className="flex-1 flex flex-col">
                <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-2">📋 Dán Câu Hỏi Trực Tiếp</p>
                <textarea
                  className="flex-1 min-h-[80px] px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-xs text-white placeholder-indigo-400 outline-none focus:border-indigo-400 resize-none font-mono"
                  placeholder={'Dán câu hỏi ở đây, mỗi câu 1 dòng:\nVí dụ: Tập xác định của hàm số... ĐA: B\nHay: Câu 1. Giá trị... Đáp án: C'}
                  value={pasteTxt}
                  onChange={e => setPasteTxt(e.target.value)}
                />
                <button
                  onClick={handlePasteImport}
                  disabled={!pasteTxt.trim()}
                  className="mt-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white rounded-xl font-bold text-xs transition-all"
                >
                  ➕ Nhập vào ngân hàng câu hỏi
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── CONFIG CARD ─────────────────────────────────────────── */}
      {/* Header / Config card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Tạo đề thi tự động</h2>
            </div>
            <p className="text-slate-500 text-sm ml-[52px]">Sinh đề thi theo đúng cấu trúc ma trận và bảng đặc tả đã thiết lập.</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            {isGenerated && (
              <>
                <button
                  onClick={() => setHienThiDapAn(!hienThiDapAn)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center transition-all border-2 ${
                    hienThiDapAn ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {hienThiDapAn ? 'Ẩn đáp án' : 'Hiện đáp án'}
                </button>
                <button
                  onClick={exportExamToWord}
                  className="px-5 py-2.5 bg-sky-600 text-white rounded-xl font-bold text-sm flex items-center hover:bg-sky-700 transition-all shadow-md"
                >
                  <Download className="w-4 h-4 mr-2" /> Xuất Word
                </button>
              </>
            )}
          </div>
        </div>

        {/* Thông tin đề */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Tên trường / Đơn vị</label>
            <input
              className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-indigo-400 outline-none bg-slate-50 font-bold text-slate-800 text-sm transition"
              value={tenTruong}
              onChange={e => setTenTruong(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Tên đề thi</label>
            <input
              className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-indigo-400 outline-none bg-slate-50 font-bold text-slate-800 text-sm transition"
              value={tenDe}
              onChange={e => setTenDe(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Thời gian (phút)</label>
            <input
              type="number"
              className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-indigo-400 outline-none bg-slate-50 font-black text-slate-800 text-sm transition"
              value={thoiGian}
              onChange={e => setThoiGian(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-2">Nguồn tài liệu</label>
            <input
              className="w-full p-3 border-2 border-indigo-100 rounded-xl focus:border-indigo-400 outline-none bg-indigo-50/50 font-bold text-indigo-700 text-sm transition"
              value={nguonTaiLieu}
              onChange={e => setNguonTaiLieu(e.target.value)}
              placeholder="ví dụ: giaoandethi.com"
            />
          </div>
        </div>

        {!hasData ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-300">
            <AlertCircle className="w-16 h-16 mb-4 opacity-30" />
            <p className="text-lg font-bold text-slate-400">Chưa có dữ liệu ma trận</p>
            <p className="text-sm text-slate-400 mt-1">Vui lòng thiết lập chương và nội dung kiến thức tại tab <strong>Nhập liệu</strong> trước.</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {!isGenerated ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-10 h-10 text-indigo-300" />
                </div>
                <p className="text-slate-500 mb-6 text-sm">Nhấn nút bên dưới để sinh đề thi tự động từ ma trận và bảng đặc tả đã cài đặt.</p>
                <button
                  onClick={handleGenerate}
                  className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-base flex items-center mx-auto shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all hover:scale-105"
                >
                  <Sparkles className="w-5 h-5 mr-3" /> Sinh đề thi tự động
                </button>
              </div>
            ) : (
              <div className="w-full">
                {/* C\u1ea3nh b\u00e1o n\u1ebfu thi\u1ebfu c\u00e2u */}
                {warnMsg && (
                  <div className="mb-4 px-4 py-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs font-bold text-amber-700">{warnMsg}. Vui lòng kiểm tra lại ma trận tại tab <strong>Nhập liệu</strong>.</p>
                  </div>
                )}
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className={`rounded-2xl p-4 flex items-center gap-4 border ${nlcQuestions.length < QUOTA.nlc ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-100'}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${nlcQuestions.length < QUOTA.nlc ? 'bg-amber-500' : 'bg-emerald-500'}`}><span className="text-white font-black text-sm">I</span></div>
                    <div>
                      <p className={`text-[10px] font-black uppercase tracking-wider ${nlcQuestions.length < QUOTA.nlc ? 'text-amber-700' : 'text-emerald-700'}`}>Nhiều lựa chọn</p>
                      <p className="text-2xl font-black text-slate-900">
                        {nlcQuestions.length}<span className="text-sm text-slate-400 font-bold">/{QUOTA.nlc}</span> <span className="text-xs text-slate-400 font-medium">câu</span>
                      </p>
                    </div>
                  </div>
                  <div className={`rounded-2xl p-4 flex items-center gap-4 border ${dsQuestions.length < QUOTA.ds ? 'bg-amber-50 border-amber-200' : 'bg-amber-50 border-amber-100'}`}>
                    <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center"><span className="text-white font-black text-sm">II</span></div>
                    <div>
                      <p className="text-[10px] font-black text-amber-700 uppercase tracking-wider">Đúng / Sai</p>
                      <p className="text-2xl font-black text-slate-900">
                        {dsQuestions.length}<span className="text-sm text-slate-400 font-bold">/{QUOTA.ds}</span> <span className="text-xs text-slate-400 font-medium">câu</span>
                      </p>
                    </div>
                  </div>
                  <div className={`rounded-2xl p-4 flex items-center gap-4 border ${tlnQuestions.length < QUOTA.tln ? 'bg-amber-50 border-amber-200' : 'bg-rose-50 border-rose-100'}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tlnQuestions.length < QUOTA.tln ? 'bg-amber-500' : 'bg-rose-500'}`}><span className="text-white font-black text-sm">III</span></div>
                    <div>
                      <p className={`text-[10px] font-black uppercase tracking-wider ${tlnQuestions.length < QUOTA.tln ? 'text-amber-700' : 'text-rose-700'}`}>Trả lời ngắn</p>
                      <p className="text-2xl font-black text-slate-900">
                        {tlnQuestions.length}<span className="text-sm text-slate-400 font-bold">/{QUOTA.tln}</span> <span className="text-xs text-slate-400 font-medium">câu</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={handleGenerate}
                    className="px-6 py-2.5 border-2 border-dashed border-slate-300 text-slate-500 rounded-xl font-bold text-xs hover:border-indigo-400 hover:text-indigo-600 transition-all flex items-center"
                  >
                    <RefreshCw className="w-3.5 h-3.5 mr-2" /> Sinh lại đề mới
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* ĐỀ THI - Printed exam paper style */}
      {isGenerated && cauHois.length > 0 && (
        <div
          style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: '13pt', lineHeight: '1.7', background: '#fff', color: '#000' }}
          className="rounded-2xl border border-slate-200 shadow-lg overflow-hidden max-w-[850px] mx-auto"
        >
          <div style={{ padding: '40px 50px' }}>
            {/* === HEADER === */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <p style={{ fontSize: '12pt' }}>{soGDDT}</p>
                <p style={{ fontSize: '12pt', fontWeight: 'bold', textDecoration: 'underline' }}>{tenTruong}</p>
              </div>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <p style={{ fontSize: '12pt', fontWeight: 'bold' }}>{tenKyThi}</p>
                <p style={{ fontSize: '12pt', fontWeight: 'bold' }}>NĂM HỌC {namHoc}</p>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontWeight: 'bold', fontSize: '12pt' }}>MÔN TOÁN - Lớp 12</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11pt', marginBottom: '4px' }}>
              <p style={{ fontStyle: 'italic' }}>(Đề thi có {Math.ceil((nlcQuestions.length + dsQuestions.length + tlnQuestions.length) / 8)} trang)</p>
              <div style={{ textAlign: 'center' }}>
                <p>Thời gian làm bài: {thoiGian} phút</p>
                <p style={{ fontStyle: 'italic', fontSize: '10pt' }}>(không kể thời gian phát đề)</p>
              </div>
            </div>
            <div style={{ textAlign: 'center', margin: '14px 0' }}>
              <span style={{ border: '2px solid #000', padding: '5px 22px', fontWeight: 'bold', fontSize: '14pt' }}>Mã đề {maDe}</span>
            </div>
            <p style={{ marginBottom: '20px', fontSize: '12pt' }}>
              Họ và tên học sinh: .......................................................... Số báo danh: .......................
            </p>

            {/* === PHẦN I: TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN === */}
            {nlcQuestions.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontWeight: 'bold', marginBottom: '6px' }}>
                  PHẦN I. Câu trắc nghiệm nhiều phương án lựa chọn.{' '}
                  <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>
                    Thí sinh trả lời từ câu 1 đến câu {nlcQuestions.length}. Mỗi câu hỏi thí sinh chỉ chọn một phương án.
                  </span>
                </p>
                {nlcQuestions.map((q, i) => {
                  const raw = q.noiDungCauHoi.replace(/^\[.*?\]\s*–?\s*/, '').trim();
                  const splitParts = raw.split(/\n?[A-D]\.\s*/);
                  const deDan = splitParts[0].trim();
                  const optMatches = [...raw.matchAll(/([A-D])\.\s*([^\n]*)/g)];
                  const options = optMatches.length > 0
                    ? optMatches.map(m => ({ label: m[1], text: m[2].trim() }))
                    : ['A', 'B', 'C', 'D'].map((lbl, k) => ({ label: lbl, text: splitParts[k + 1]?.trim() || '' }));
                  return (
                    <div key={q.id} style={{ marginBottom: '10px' }}>
                      <p><b>Câu {i + 1}.</b> {deDan}</p>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', paddingLeft: '28px', gap: '1px 0' }}>
                        {options.map(opt => (
                          <p key={opt.label}><b>{opt.label}.</b> {opt.text}</p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* === PHẦN II: TRẮC NGHIỆM ĐÚNG/SAI === */}
            {dsQuestions.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontWeight: 'bold', marginBottom: '6px' }}>
                  PHẦN II. Câu trắc nghiệm đúng sai.{' '}
                  <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>
                    (Thí sinh trả lời từ câu 1 đến câu {dsQuestions.length}. Trong mỗi ý a), b), c), d) ở mỗi câu, thí sinh chọn đúng hoặc sai.)
                  </span>
                </p>
                {dsQuestions.map((q, i) => {
                  const labelMap = ['a', 'b', 'c', 'd'];
                  const raw = q.noiDungCauHoi;
                  const parts = raw.split(/\n(?=[a-d]\))/i);
                  const danDe = parts[0].replace(/^\[.*?\]\s*–?\s*/, '').trim();
                  const yItems = parts.slice(1);
                  const finalYs = labelMap.map((_, k) => {
                    if (yItems[k]) return yItems[k].replace(/^[a-d]\)\s*/i, '').trim();
                    return '';
                  });
                  return (
                    <div key={q.id} style={{ marginBottom: '10px' }}>
                      <p><b>Câu {i + 1}:</b> {danDe}</p>
                      <div style={{ paddingLeft: '28px' }}>
                        {finalYs.map((y, k) => (
                          <p key={k}>{labelMap[k]}) {y}</p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* === PHẦN III: TRẢ LỜI NGẮN === */}
            {tlnQuestions.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontWeight: 'bold', marginBottom: '6px' }}>
                  PHẦN III. Câu hỏi trắc nghiệm trả lời ngắn.{' '}
                  <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>
                    Thí sinh trả lời từ câu 1 đến câu {tlnQuestions.length}
                  </span>
                </p>
                {tlnQuestions.map((q, i) => {
                  const noiDungClean = q.noiDungCauHoi.replace(/^\[.*?\]\s*–?\s*/, '').trim();
                  return (
                    <div key={q.id} style={{ marginBottom: '10px' }}>
                      <p><b>Câu {i + 1}:</b></p>
                      <p style={{ paddingLeft: '28px' }}>{noiDungClean}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* === HẾT === */}
            <div style={{ textAlign: 'center', margin: '30px 0', fontSize: '13pt' }}>
              <p>--------------------<b>HẾT</b>--------------------</p>
            </div>

            {/* === ĐÁP ÁN VÀ THANG ĐIỂM CHẤM === */}
            <div style={{ borderTop: '2px solid #000', paddingTop: '16px' }}>
              <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '14pt', marginBottom: '16px' }}>ĐÁP ÁN VÀ THANG ĐIỂM CHẤM</p>

              {/* PHẦN I */}
              {nlcQuestions.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <p style={{ fontWeight: 'bold' }}>PHẦN I</p>
                  <p style={{ fontStyle: 'italic', marginBottom: '6px', fontSize: '12pt' }}>(Mỗi câu trả lời đúng học sinh được <b>0,25 điểm</b>)</p>
                  <table style={{ borderCollapse: 'collapse', fontSize: '11pt' }}>
                    <tbody>
                      <tr>
                        <td style={{ border: '1px solid #000', padding: '3px 8px', fontWeight: 'bold', textAlign: 'center' }}>Câu</td>
                        {nlcQuestions.map((_, i) => (
                          <td key={i} style={{ border: '1px solid #000', padding: '3px 6px', textAlign: 'center', fontWeight: 'bold', fontSize: '10pt' }}>Câu {i + 1}</td>
                        ))}
                      </tr>
                      <tr>
                        <td style={{ border: '1px solid #000', padding: '3px 8px', fontWeight: 'bold', textAlign: 'center' }}>Chọn</td>
                        {nlcQuestions.map((q, i) => (
                          <td key={i} style={{ border: '1px solid #000', padding: '3px 6px', textAlign: 'center', fontWeight: 'bold' }}>{q.dapAn}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* PHẦN II */}
              {dsQuestions.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <p style={{ fontWeight: 'bold' }}>PHẦN II</p>
                  <p>Điểm tối đa của 01 câu hỏi là <b>1 điểm</b>.</p>
                  <p>- Thí sinh chỉ lựa chọn chính xác 01 ý trong 1 câu hỏi được <b>0,1 điểm</b>.</p>
                  <p>- Thí sinh chỉ lựa chọn chính xác 02 ý trong 1 câu hỏi được <b>0,25 điểm</b>.</p>
                  <p>- Thí sinh chỉ lựa chọn chính xác 03 ý trong 1 câu hỏi được <b>0,5 điểm</b>.</p>
                  <p>- Thí sinh chỉ lựa chọn chính xác 04 ý trong 1 câu hỏi được <b>1 điểm</b>.</p>
                  <table style={{ borderCollapse: 'collapse', marginTop: '8px', fontSize: '11pt' }}>
                    <tbody>
                      <tr>
                        <td style={{ border: '1px solid #000', padding: '3px 12px', fontWeight: 'bold', textAlign: 'center' }}></td>
                        {dsQuestions.map((_, i) => (
                          <td key={i} style={{ border: '1px solid #000', padding: '3px 12px', textAlign: 'center', fontWeight: 'bold' }}>Câu {i + 1}</td>
                        ))}
                      </tr>
                      {['a', 'b', 'c', 'd'].map((label, k) => (
                        <tr key={k}>
                          <td style={{ border: '1px solid #000', padding: '3px 12px', textAlign: 'center' }}>{label}) </td>
                          {dsQuestions.map((q, i) => {
                            const daParts = (q.dapAn || '').split(/\s+/);
                            const val = (daParts[k] || '').toUpperCase();
                            const display = val === 'Đ' || val === 'D' ? 'Đ' : val === 'S' ? 'S' : val;
                            return (
                              <td key={i} style={{ border: '1px solid #000', padding: '3px 12px', textAlign: 'center' }}>
                                {label}) {display}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* PHẦN III */}
              {tlnQuestions.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <p style={{ fontWeight: 'bold' }}>PHẦN III</p>
                  <p style={{ fontStyle: 'italic', marginBottom: '6px', fontSize: '12pt' }}>(Mỗi câu trả lời đúng học sinh được <b>0,5 điểm</b>)</p>
                  <table style={{ borderCollapse: 'collapse', fontSize: '11pt' }}>
                    <tbody>
                      <tr>
                        <td style={{ border: '1px solid #000', padding: '3px 12px', fontWeight: 'bold', textAlign: 'center' }}>Câu</td>
                        {tlnQuestions.map((_, i) => (
                          <td key={i} style={{ border: '1px solid #000', padding: '3px 20px', textAlign: 'center', fontWeight: 'bold' }}>Câu {i + 1}</td>
                        ))}
                      </tr>
                      <tr>
                        <td style={{ border: '1px solid #000', padding: '3px 12px', fontWeight: 'bold', textAlign: 'center' }}>Chọn</td>
                        {tlnQuestions.map((q, i) => (
                          <td key={i} style={{ border: '1px solid #000', padding: '3px 20px', textAlign: 'center' }}>{q.dapAn}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              <div style={{ textAlign: 'center', marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
                <p style={{ fontSize: '10pt', fontStyle: 'italic', color: '#666' }}>Thiết kế bởi Bùi Thị Kiên</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// Component vẽ hình minh họa SVG theo chủ đề
function MathDiagramSVG({ noiDung, phan }: { noiDung: string; phan: string }) {
  const noi = noiDung.toLowerCase();
  const uid = React.useId().replace(/:/g, '');

  // TICH PHAN / NGUYEN HAM \u2013 Di\u1ec7n t\u00edch d\u01b0\u1edbi \u0111\u01b0\u1eddng cong
  if (noi.includes('t\u00edch ph\u00e2n') || noi.includes('nguy\u00ean h\u00e0m')) {
    return (
      <svg viewBox="0 0 320 200" className="w-full" aria-label="H\u00ecnh minh h\u1ecda t\u00edch ph\u00e2n">
        <defs>
          <marker id={`arr-${uid}`} markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
            <polygon points="0,0 7,3.5 0,7" fill="#94a3b8"/>
          </marker>
          <linearGradient id={`grad-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.05"/>
          </linearGradient>
        </defs>
        {/* L\u01b0\u1edbi */}
        {[50,90,130,170].map(y=><line key={y} x1="40" y1={y} x2="300" y2={y} stroke="#f1f5f9" strokeWidth="1"/>)}
        {[80,130,180,230].map(x=><line key={x} x1={x} y1="10" x2={x} y2="175" stroke="#f1f5f9" strokeWidth="1"/>)}
        {/* Tr\u1ee5c */}
        <line x1="40" y1="170" x2="300" y2="170" stroke="#94a3b8" strokeWidth="1.8" markerEnd={`url(#arr-${uid})`}/>
        <line x1="50" y1="185" x2="50" y2="10" stroke="#94a3b8" strokeWidth="1.8" markerEnd={`url(#arr-${uid})`}/>
        {/* V\u00f9ng di\u1ec7n t\u00edch t\u00f4 m\u00e0u */}
        <path d="M 100,170 L 100,100 C 130,80 160,60 200,55 C 220,53 230,58 240,80 L 240,170 Z"
              fill={`url(#grad-${uid})`} stroke="#6366f1" strokeWidth="0.5"/>
        {/* \u0110\u01b0\u1eddng cong y=f(x) */}
        <path d="M 60,155 C 80,140 90,120 100,100 C 130,80 160,60 200,55 C 225,52 250,65 280,95"
              fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Nh\u00e3n a, b */}
        <line x1="100" y1="170" x2="100" y2="98" stroke="#6366f1" strokeWidth="1" strokeDasharray="3,3"/>
        <line x1="240" y1="170" x2="240" y2="78" stroke="#6366f1" strokeWidth="1" strokeDasharray="3,3"/>
        <text x="96" y="183" fontSize="12" fill="#6366f1" fontWeight="bold" fontFamily="serif">a</text>
        <text x="236" y="183" fontSize="12" fill="#6366f1" fontWeight="bold" fontFamily="serif">b</text>
        {/* Ch\u1eef S */}
        <text x="160" y="135" fontSize="16" fill="#6366f1" fontWeight="bold" fontFamily="serif">S</text>
        {/* Nh\u00e3n tr\u1ee5c */}
        <text x="290" y="180" fontSize="11" fill="#94a3b8" fontStyle="italic">x</text>
        <text x="55" y="16" fontSize="11" fill="#94a3b8" fontStyle="italic">y</text>
        <text x="52" y="167" fontSize="9" fill="#94a3b8">O</text>
        {/* Nh\u00e3n h\u00e0m */}
        <text x="245" y="80" fontSize="11" fill="#6366f1" fontStyle="italic">y=f(x)</text>
        {/* K\u00fd hi\u1ec7u t\u00edch ph\u00e2n */}
        <text x="8" y="125" fontSize="30" fill="#6366f1" fontFamily="serif">\u222b</text>
        <text x="32" y="108" fontSize="9" fill="#6366f1">b</text>
        <text x="32" y="136" fontSize="9" fill="#6366f1">a</text>
      </svg>
    );
  }

  // XAC SUAT \u2013 Bi\u1ec3u \u0111\u1ed3 c\u00e2y x\u00e1c su\u1ea5t
  if (noi.includes('x\u00e1c su\u1ea5t') || noi.includes('bi\u1ebfn c\u1ed1') || noi.includes('bayes') || noi.includes('to\u00e0n ph\u1ea7n')) {
    return (
      <svg viewBox="0 0 320 200" className="w-full" aria-label="C\u00e2y x\u00e1c su\u1ea5t">
        <defs>
          <marker id={`arr2-${uid}`} markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <polygon points="0,0 6,3 0,6" fill="#6366f1"/>
          </marker>
        </defs>
        {/* N\u00fat g\u1ed1c */}
        <circle cx="50" cy="100" r="16" fill="#6366f1" fillOpacity="0.15" stroke="#6366f1" strokeWidth="2"/>
        <text x="50" y="104" fontSize="10" fill="#6366f1" fontWeight="bold" textAnchor="middle">\u03a9</text>
        {/* N\u00fat A, \u0100 */}
        <circle cx="170" cy="55" r="16" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2"/>
        <text x="170" y="59" fontSize="11" fill="#10b981" fontWeight="bold" textAnchor="middle">A</text>
        <circle cx="170" cy="145" r="16" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2"/>
        <text x="170" y="149" fontSize="11" fill="#f59e0b" fontWeight="bold" textAnchor="middle">\u0100</text>
        {/* N\u00fat B|A, \u0181|A, B|\u0100, \u0181|\u0100 */}
        <circle cx="285" cy="30" r="14" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.5"/>
        <text x="285" y="34" fontSize="9" fill="#10b981" fontWeight="bold" textAnchor="middle">B</text>
        <circle cx="285" cy="75" r="14" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.5"/>
        <text x="285" y="79" fontSize="9" fill="#10b981" fontWeight="bold" textAnchor="middle">\u0181</text>
        <circle cx="285" cy="125" r="14" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="1.5"/>
        <text x="285" y="129" fontSize="9" fill="#f59e0b" fontWeight="bold" textAnchor="middle">B</text>
        <circle cx="285" cy="170" r="14" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="1.5"/>
        <text x="285" y="174" fontSize="9" fill="#f59e0b" fontWeight="bold" textAnchor="middle">\u0181</text>
        {/* \u0110\u01b0\u1eddng n\u1ed1i */}
        <line x1="66" y1="88" x2="154" y2="62" stroke="#6366f1" strokeWidth="1.5" markerEnd={`url(#arr2-${uid})`}/>
        <line x1="66" y1="112" x2="154" y2="138" stroke="#6366f1" strokeWidth="1.5" markerEnd={`url(#arr2-${uid})`}/>
        <line x1="186" y1="48" x2="271" y2="34" stroke="#10b981" strokeWidth="1.5" markerEnd={`url(#arr2-${uid})`}/>
        <line x1="186" y1="60" x2="271" y2="72" stroke="#10b981" strokeWidth="1.5" markerEnd={`url(#arr2-${uid})`}/>
        <line x1="186" y1="138" x2="271" y2="128" stroke="#f59e0b" strokeWidth="1.5" markerEnd={`url(#arr2-${uid})`}/>
        <line x1="186" y1="152" x2="271" y2="167" stroke="#f59e0b" strokeWidth="1.5" markerEnd={`url(#arr2-${uid})`}/>
        {/* X\u00e1c su\u1ea5t */}
        <text x="95" y="68" fontSize="9" fill="#6366f1">P(A)</text>
        <text x="95" y="138" fontSize="9" fill="#6366f1">P(\u0100)</text>
        <text x="215" y="42" fontSize="8" fill="#10b981">P(B|A)</text>
        <text x="215" y="72" fontSize="8" fill="#10b981">P(\u0181|A)</text>
        <text x="215" y="125" fontSize="8" fill="#f59e0b">P(B|\u0100)</text>
        <text x="215" y="165" fontSize="8" fill="#f59e0b">P(\u0181|\u0100)</text>
      </svg>
    );
  }

  // HAM SO \u2013 \u0110\u01b0\u1eddng cong h\u00e0m s\u1ed1
  if (noi.includes('h\u00e0m s\u1ed1') || noi.includes('gi\u1edbi h\u1ea1n') || noi.includes('\u0111\u1ea1o h\u00e0m') || noi.includes('li\u00ean t\u1ee5c')) {
    return (
      <svg viewBox="0 0 320 200" className="w-full" aria-label="\u0110\u1ed3 th\u1ecb h\u00e0m s\u1ed1">
        <defs>
          <marker id={`arr3-${uid}`} markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
            <polygon points="0,0 7,3.5 0,7" fill="#94a3b8"/>
          </marker>
        </defs>
        {[40,80,120,160].map(y=><line key={y} x1="20" y1={y} x2="305" y2={y} stroke="#f1f5f9" strokeWidth="1"/>)}
        {[60,110,160,210,260].map(x=><line key={x} x1={x} y1="5" x2={x} y2="190" stroke="#f1f5f9" strokeWidth="1"/>)}
        {/* Tr\u1ee5c */}
        <line x1="20" y1="100" x2="305" y2="100" stroke="#94a3b8" strokeWidth="1.8" markerEnd={`url(#arr3-${uid})`}/>
        <line x1="160" y1="190" x2="160" y2="5" stroke="#94a3b8" strokeWidth="1.8" markerEnd={`url(#arr3-${uid})`}/>
        <text x="295" y="112" fontSize="11" fill="#94a3b8" fontStyle="italic">x</text>
        <text x="165" y="14" fontSize="11" fill="#94a3b8" fontStyle="italic">y</text>
        <text x="163" y="112" fontSize="9" fill="#94a3b8">O</text>
        {/* \u0110\u01b0\u1eddng cong b\u1eadc 3 */}
        <path d="M 30,160 C 60,155 90,140 120,120 C 140,108 150,100 160,100 C 175,100 195,95 220,70 C 250,40 275,25 300,20"
              fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round"/>
        {/* \u0110i\u1ec3m c\u1ef1c \u0111\u1ea1i / c\u1ef1c ti\u1ec3u */}
        <circle cx="110" cy="126" r="4" fill="#ef4444" stroke="white" strokeWidth="1.5"/>
        <text x="93" y="118" fontSize="9" fill="#ef4444">C\u0110</text>
        <circle cx="205" cy="83" r="4" fill="#10b981" stroke="white" strokeWidth="1.5"/>
        <text x="208" y="78" fontSize="9" fill="#10b981">CT</text>
        {/* \u0110\u01b0\u1eddng k\u1ebb */}
        <line x1="110" y1="126" x2="110" y2="100" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,3"/>
        <line x1="205" y1="83" x2="205" y2="100" stroke="#10b981" strokeWidth="1" strokeDasharray="3,3"/>
        <text x="106" y="114" fontSize="8" fill="#64748b">x\u2081</text>
        <text x="201" y="114" fontSize="8" fill="#64748b">x\u2082</text>
        <text x="185" y="55" fontSize="11" fill="#6366f1" fontStyle="italic">y=f(x)</text>
      </svg>
    );
  }

  // HINH HOC \u2013 H\u00ecnh kh\u1ed1i
  if (noi.includes('h\u00ecnh') || noi.includes('kh\u1ed1i') || noi.includes('th\u1ec3 t\u00edch') || noi.includes('di\u1ec7n t\u00edch')) {
    return (
      <svg viewBox="0 0 320 200" className="w-full" aria-label="H\u00ecnh h\u1ecdc kh\u00f4ng gian">
        {/* H\u00ecnh h\u1ed9p ch\u1eef nh\u1eadt 3D */}
        <polygon points="80,160 200,160 200,80 80,80" fill="#6366f1" fillOpacity="0.08" stroke="#6366f1" strokeWidth="1.5"/>
        <polygon points="200,160 260,120 260,40 200,80" fill="#6366f1" fillOpacity="0.15" stroke="#6366f1" strokeWidth="1.5"/>
        <polygon points="80,80 200,80 260,40 140,40" fill="#6366f1" fillOpacity="0.2" stroke="#6366f1" strokeWidth="1.5"/>
        {/* C\u1ea1nh \u1ea9n */}
        <line x1="80" y1="160" x2="140" y2="120" stroke="#6366f1" strokeWidth="1" strokeDasharray="4,3"/>
        <line x1="140" y1="120" x2="260" y2="120" stroke="#6366f1" strokeWidth="1" strokeDasharray="4,3"/>
        <line x1="140" y1="120" x2="140" y2="40" stroke="#6366f1" strokeWidth="1" strokeDasharray="4,3"/>
        {/* Nh\u00e3n \u0111\u1ec9nh */}
        {[['80','80','A'],['200','80','B'],['200','160','C'],['80','160','D'],
          ['140','40','E'],['260','40','F'],['260','120','G'],['140','120','H']].map(([x,y,l])=>(
          <text key={l} x={parseInt(x)+(l==='A'||l==='D'||l==='E'||l==='H'?-14:4)} y={parseInt(y)+(l==='C'||l==='D'?14:l==='A'||l==='B'?-4:4)}
                fontSize="11" fill="#475569" fontWeight="bold">{l}</text>
        ))}
        {/* K\u00edch th\u01b0\u1edbc */}
        <line x1="80" y1="170" x2="200" y2="170" stroke="#94a3b8" strokeWidth="1"/>
        <text x="135" y="182" fontSize="9" fill="#64748b" textAnchor="middle">a</text>
        <line x1="210" y1="80" x2="210" y2="160" stroke="#94a3b8" strokeWidth="1"/>
        <text x="218" y="124" fontSize="9" fill="#64748b">b</text>
        <line x1="202" y1="77" x2="263" y2="37" stroke="#94a3b8" strokeWidth="1"/>
        <text x="240" y="55" fontSize="9" fill="#64748b">c</text>
      </svg>
    );
  }

  // M\u1eb8C \u0110\u1ecaNH \u2013 H\u1ec7 tr\u1ee5c to\u1ea1 \u0111\u1ed9 v\u1edbi \u0111i\u1ec3m
  return (
    <svg viewBox="0 0 320 200" className="w-full" aria-label="H\u1ec7 tr\u1ee5c to\u1ea1 \u0111\u1ed9">
      <defs>
        <marker id={`arr4-${uid}`} markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
          <polygon points="0,0 7,3.5 0,7" fill="#94a3b8"/>
        </marker>
      </defs>
      {[40,80,120,160].map(y=><line key={y} x1="20" y1={y} x2="305" y2={y} stroke="#f8fafc" strokeWidth="1.5"/>)}
      {[60,110,160,210,260].map(x=><line key={x} x1={x} y1="5" x2={x} y2="190" stroke="#f8fafc" strokeWidth="1.5"/>)}
      <line x1="20" y1="110" x2="305" y2="110" stroke="#94a3b8" strokeWidth="1.8" markerEnd={`url(#arr4-${uid})`}/>
      <line x1="160" y1="190" x2="160" y2="5" stroke="#94a3b8" strokeWidth="1.8" markerEnd={`url(#arr4-${uid})`}/>
      {/* \u0110\u01b0\u1eddng cong m\u1eabu */}
      <path d="M 30,170 C 70,150 110,100 160,80 C 210,60 250,50 295,48"
            fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M 30,60 C 70,62 100,70 140,90 C 175,108 230,140 295,170"
            fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeDasharray="5,3"/>
      <text x="285" y="122" fontSize="11" fill="#94a3b8" fontStyle="italic">x</text>
      <text x="165" y="14" fontSize="11" fill="#94a3b8" fontStyle="italic">y</text>
      <text x="163" y="124" fontSize="9" fill="#94a3b8">O</text>
      <text x="270" y="44" fontSize="10" fill="#6366f1" fontStyle="italic">f(x)</text>
      <text x="270" y="168" fontSize="10" fill="#f59e0b" fontStyle="italic">g(x)</text>
    </svg>
  );
}

// Component c\u00e2u h\u1ecfi ri\u00eang (\u0111\u00fang chu\u1ea9n React component)
type PhanColors = Record<string, { bg: string; border: string; text: string; badge: string; headerBg: string }>;

interface QuestionCardProps {
  key?: React.Key;
  q: CauHoi;
  idx: number;
  label: string;
  phanColors: PhanColors;
  editingId: number | null;
  setEditingId: (id: number | null) => void;
  hienThiDapAn: boolean;
  handleUpdateCauHoi: (id: number, field: keyof CauHoi, value: string) => void;
}

function QuestionCard({
  q, idx, label, phanColors, editingId, setEditingId, hienThiDapAn, handleUpdateCauHoi
}: QuestionCardProps) {
  const c = phanColors[q.phan];
  const isEditing = editingId === q.id;
  const [showDiagram, setShowDiagram] = React.useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.03 }}
      className={`rounded-2xl border-2 ${c.border} ${c.bg} p-5`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`w-8 h-8 rounded-xl ${c.headerBg} text-white font-black text-sm flex items-center justify-center flex-shrink-0`}>{label}</span>
          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${c.badge}`}>{q.mucDo.toUpperCase()}</span>
          <span className="text-[10px] text-slate-400 font-medium truncate max-w-[200px]">{q.noiDung}</span>
        </div>
        <div className="flex gap-1.5 flex-shrink-0">
          <button
            onClick={() => setShowDiagram(!showDiagram)}
            title="Hiện / Ẩn hình minh họa"
            className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all ${
              showDiagram ? 'bg-violet-600 text-white' : 'bg-white text-slate-400 border border-slate-200 hover:border-violet-300 hover:text-violet-600'
            }`}
          >
            📊 Hình
          </button>
          <button
            onClick={() => setEditingId(isEditing ? null : q.id)}
            className={`text-[10px] font-bold px-3 py-1 rounded-lg transition-all ${
              isEditing ? 'bg-indigo-600 text-white' : 'bg-white text-slate-500 border border-slate-200 hover:border-indigo-300'
            }`}
          >
            {isEditing ? '✓ Xong' : '✏️ Sửa'}
          </button>
        </div>
      </div>

      {/* H\u00ecnh minh h\u1ecda */}
      <AnimatePresence>
        {showDiagram && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 overflow-hidden"
          >
            <div className="bg-white/70 rounded-2xl border border-slate-200 p-3">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 text-center">
                Hình minh họa mô phỏng • {q.noiDung}
              </p>
              <MathDiagramSVG noiDung={q.noiDung} phan={q.phan} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isEditing ? (
        <div className="space-y-3">
          <div>
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Nội dung câu hỏi</label>
            <textarea
              className="w-full p-3 border-2 border-indigo-200 rounded-xl text-sm outline-none focus:border-indigo-500 transition bg-white resize-none"
              rows={5}
              value={q.noiDungCauHoi}
              onChange={e => handleUpdateCauHoi(q.id, 'noiDungCauHoi', e.target.value)}
            />
          </div>
          <div>
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Đáp án</label>
            <input
              className="w-full p-2.5 border-2 border-indigo-200 rounded-xl text-sm outline-none focus:border-indigo-500 transition bg-white"
              value={q.dapAn}
              onChange={e => handleUpdateCauHoi(q.id, 'dapAn', e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div>
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line font-medium">{q.noiDungCauHoi}</p>
          {hienThiDapAn && (
            <div className={`mt-3 p-2.5 rounded-xl ${c.bg} border ${c.border}`}>
              <span className={`text-[10px] font-black ${c.text} uppercase tracking-wider`}>Đáp án: </span>
              <span className="text-sm font-bold text-slate-700">{q.dapAn}</span>
            </div>
          )}
        </div>
      )}
      {q.yeuCau && (
        <div className="mt-3 text-[10px] text-slate-400 italic border-t border-slate-200 pt-2">
          <span className="font-bold text-slate-500">Yêu cầu cần đạt: </span>{q.yeuCau.split('\n')[0]}
        </div>
      )}
    </motion.div>
  );
}

