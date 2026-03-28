// ─────────────────────────────────────────────────────────────────────────────
// NGÂN HÀNG CÂU HỎI TOÁN 12 – Công thức chuẩn LaTeX/KaTeX
// Dùng $...$ cho inline math, $$...$$ cho display math
// ─────────────────────────────────────────────────────────────────────────────

export type QBankEntry = {
  mucDo: 'NB' | 'TH' | 'VD' | 'VDC';
  phan: 'nlc' | 'ds' | 'tln';
  noiDung: string;
  dapAn: string;
};

export const QUESTION_BANK: Record<string, QBankEntry[]> = {

  /* ── DEFAULT (fallback) ──────────────────────────────────────────────── */
  'default': [
    { mucDo:'NB', phan:'nlc', noiDung:'Đạo hàm của $y = x^3 - 3x + 2$ là:\nA. $y\' = 3x^2 - 3$\nB. $y\' = 3x^2 + 3$\nC. $y\' = x^2 - 3$\nD. $y\' = 3x^2$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'$\\int 2x\\,dx$ bằng:\nA. $x^2 + C$\nB. $2 + C$\nC. $\\dfrac{x^2}{2} + C$\nD. $2x + C$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'Hàm $y = x^3 - 3x^2 + 2$ đạt cực đại tại:\nA. $x = 0$\nB. $x = 2$\nC. $x = -1$\nD. $x = 1$', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'Tính $\\displaystyle\\int_0^1 (2x+1)\\,dx$.', dapAn:'$2$' },
    { mucDo:'TH', phan:'tln', noiDung:'Tính $y\'$ của $y = x^4 - 2x^2 + 1$ tại $x = 1$.', dapAn:'$0$' },
    { mucDo:'VD', phan:'tln', noiDung:'Tìm cực trị của hàm số $y = x^3 - 3x$.', dapAn:'Cực đại tại $x=-1$ ($y=2$); Cực tiểu tại $x=1$ ($y=-2$)' },
    { mucDo:'VD', phan:'tln', noiDung:'Diện tích hình phẳng giới hạn bởi $y = x^2$ và $y = 2x$.', dapAn:'$S = \\dfrac{4}{3}$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tìm $m$ để phương trình $x^3 - 3x + m = 0$ có 3 nghiệm phân biệt.', dapAn:'$-2 < m < 2$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Thể tích vật tròn xoay: $y=\\sqrt{x}$, $y=0$, $x=1$ quay quanh $Ox$.', dapAn:'$V = \\dfrac{\\pi}{2}$' },
    { mucDo:'NB', phan:'ds', noiDung:'Cho các mệnh đề về đạo hàm và nguyên hàm:\na) $(x^n)\' = nx^{n-1}$ với mọi $n$.\nb) $\\int x^2\\,dx = \\dfrac{x^3}{3} + C$.\nc) Nếu $f\'(x_0)=0$ thì $x_0$ là điểm cực trị.\nd) $\\displaystyle\\int_0^1 2x\\,dx = 1$.', dapAn:'Đ Đ S Đ' },
  ],

  /* ── HÀM SỐ ─────────────────────────────────────────────────────────── */
  'hàm số': [
    { mucDo:'NB', phan:'nlc', noiDung:'Hàm $y = x^3 - 3x$ đồng biến trên:\nA. $(-\\infty;-1)$ và $(1;+\\infty)$\nB. $(-1;1)$\nC. $(0;+\\infty)$\nD. $(-\\infty;0)$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'Tiệm cận ngang của $y = \\dfrac{2x+1}{x-1}$:\nA. $y=2$\nB. $y=1$\nC. $y=-1$\nD. Không có', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'Hàm $y = x^4 - 2x^2$ đạt cực tiểu tại:\nA. $x = \\pm 1$\nB. $x = 0$\nC. $x = -1$\nD. $x = 1$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'Số cực trị của $y = x^4 - 2x^2 + 1$:\nA. $3$\nB. $1$\nC. $2$\nD. $0$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'Giá trị lớn nhất của $y = -x^2 + 4x - 1$:\nA. $3$\nB. $4$\nC. $5$\nD. $2$', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'Tìm khoảng đồng biến của $y = x^3 - 3x^2 - 9x + 2$.', dapAn:'$(-\\infty;-1)$ và $(3;+\\infty)$' },
    { mucDo:'TH', phan:'tln', noiDung:'Tìm tiệm cận của $y = \\dfrac{x+2}{x-3}$.', dapAn:'TCĐ: $x=3$; TCN: $y=1$' },
    { mucDo:'VD', phan:'tln', noiDung:'Tìm $m$ để hàm $y = x^3 - 3x + m$ có cực đại bằng $5$.', dapAn:'$m = 3$' },
    { mucDo:'VD', phan:'tln', noiDung:'Biện luận số cực trị của $y = x^4 - 2mx^2$ theo $m$.', dapAn:'$m>0$: 3 cực trị; $m\\leq 0$: 1 cực trị' },
    { mucDo:'VDC', phan:'tln', noiDung:'Biện luận theo $m$ số nghiệm của $x^3 - 3x - m = 0$.', dapAn:'$m<-2$ hoặc $m>2$: 1 nghiệm; $m=\\pm2$: 2 nghiệm; $-2<m<2$: 3 nghiệm' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tìm tất cả $m$ để đường thẳng $y=m$ cắt đồ thị $y=x^3-3x$ tại 3 điểm phân biệt.', dapAn:'$-2 < m < 2$' },
    { mucDo:'NB', phan:'ds', noiDung:'Cho $y = x^3 - 3x + 2$. Xác định Đúng/Sai:\na) Hàm có 2 điểm cực trị.\nb) $y\'(0) = -3$.\nc) Hàm đồng biến trên $(1;+\\infty)$.\nd) Giá trị cực đại bằng $4$.', dapAn:'Đ Đ Đ Đ' },
    { mucDo:'TH', phan:'ds', noiDung:'Lợi nhuận công ty (triệu đồng) theo tháng $t$: $f(t) = -t^2 + 6t + 1$. Xét các phát biểu:\na) $f\'(t) = -2t + 6$.\nb) Lợi nhuận cao nhất tại $t = 3$ tháng.\nc) Lợi nhuận cao nhất là $10$ triệu đồng.\nd) Hàm $f$ nghịch biến khi $t > 3$.', dapAn:'Đ Đ Đ Đ' },
    { mucDo:'VD', phan:'ds', noiDung:'Hàm $y = \\dfrac{2x+1}{x-1}$ mô tả tỉ lệ năng suất theo số công nhân $x>1$. Xét các phát biểu:\na) Tập xác định $D = (1;+\\infty)$.\nb) Tiệm cận ngang $y = 2$.\nc) Tiệm cận đứng $x = 1$.\nd) Hàm đồng biến trên $(1;+\\infty)$.', dapAn:'Đ Đ Đ S' },
    { mucDo:'TH', phan:'tln', noiDung:'Năng suất (sp/giờ) mô tả bởi $f(x) = -x^2 + 8x + 5$, $1 \\leq x \\leq 8$. Tìm $x$ để năng suất cao nhất.', dapAn:'$x = 4$ giờ, năng suất = $21$ sp/giờ' },
    { mucDo:'VD', phan:'tln', noiDung:'Cửa hàng hạ giá $x$ nghìn đồng ($0 \\leq x \\leq 50$) thì bán thêm $2x$ sp. Lợi nhuận gốc mỗi sp $= 100-x$ nghìn, số sp gốc $= 100$. Tìm $x$ tối ưu.', dapAn:'$x = 25$ nghìn đồng' },
  ],

  /* ── ĐẠO HÀM ────────────────────────────────────────────────────────── */
  'đạo hàm': [
    { mucDo:'NB', phan:'nlc', noiDung:'Đạo hàm của $y = \\sin x$:\nA. $\\cos x$\nB. $-\\cos x$\nC. $-\\sin x$\nD. $\\tan x$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'Đạo hàm của $y = e^x$:\nA. $e^x$\nB. $xe^{x-1}$\nC. $\\ln x$\nD. $e^x+1$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'Đạo hàm của $y = \\ln x$:\nA. $\\dfrac{1}{x}$\nB. $x$\nC. $\\dfrac{1}{\\ln x}$\nD. $e^x$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'Đạo hàm của $y = x^2 \\cdot e^x$:\nA. $e^x(x^2+2x)$\nB. $2xe^x$\nC. $x^2e^x$\nD. $2x$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'Phương trình tiếp tuyến đồ thị $y=x^2$ tại $(1;1)$:\nA. $y = 2x-1$\nB. $y = x$\nC. $y = 2x+1$\nD. $y = x+1$', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'Tính $y\'$ biết $y = (x^2+1)\\sin x$.', dapAn:"$y' = 2x\\sin x + (x^2+1)\\cos x$" },
    { mucDo:'TH', phan:'tln', noiDung:'Tính đạo hàm $y = \\ln(x^2+1)$.', dapAn:"$y' = \\dfrac{2x}{x^2+1}$" },
    { mucDo:'VD', phan:'tln', noiDung:'Viết phương trình tiếp tuyến của $y = x^3 - 2x$ tại $x = 1$.', dapAn:'$y = x - 2$' },
    { mucDo:'VD', phan:'tln', noiDung:'Tìm $x$ để tiếp tuyến của $y = x^3 - 3x^2 + 1$ song song $y = 9x$.', dapAn:'$x = -1$ hoặc $x = 3$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Chứng minh $f(x) = x^3 + 3x + 1$ đồng biến trên $\\mathbb{R}$.', dapAn:"$f'(x) = 3x^2+3 > 0\\;\\forall x\\in\\mathbb{R}$ $\\Rightarrow$ đồng biến" },
    { mucDo:'VDC', phan:'tln', noiDung:'Tìm tất cả tiếp tuyến của $y = x^3 - x$ qua $O(0;0)$.', dapAn:'$y = -x$ và $y = 2x$' },
    { mucDo:'NB', phan:'ds', noiDung:'Cho $y = x^3 - 6x$. Xác định Đúng/Sai:\na) $y\'(0) = -6$.\nb) Tiếp tuyến tại $(1;-5)$: $y = -3x-2$.\nc) Hàm ĐB trên $(-\\infty;-\\sqrt{2})$ và $(\\sqrt{2};+\\infty)$.\nd) Tại $x=2$, hệ số góc tiếp tuyến bằng $6$.', dapAn:'Đ Đ Đ S' },
  ],

  /* ── NGUYÊN HÀM ─────────────────────────────────────────────────────── */
  'nguyên hàm': [
    { mucDo:'NB', phan:'nlc', noiDung:'$\\int(3x^2-2x+1)\\,dx$ bằng:\nA. $x^3-x^2+x+C$\nB. $6x-2+C$\nC. $x^3+x+C$\nD. $3x^3-x^2+C$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'$\\int\\sin x\\,dx$ bằng:\nA. $-\\cos x+C$\nB. $\\cos x+C$\nC. $-\\sin x+C$\nD. $\\sin x+C$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'$\\int e^x\\,dx$ bằng:\nA. $e^x+C$\nB. $xe^x+C$\nC. $\\dfrac{e^x}{x}+C$\nD. $e^{x-1}+C$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'$\\int(x+1)^2\\,dx$ bằng:\nA. $\\dfrac{(x+1)^3}{3}+C$\nB. $2(x+1)+C$\nC. $x^2+x+C$\nD. $\\dfrac{x^3}{3}+x+C$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'$F(x)$ nguyên hàm $f=2x$, $F(0)=3$. Thì $F(x)$ bằng:\nA. $x^2+3$\nB. $x^2-3$\nC. $2x^2+3$\nD. $x^2+1$', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'Tính $\\int x e^x\\,dx$ bằng phương pháp từng phần.', dapAn:'$xe^x - e^x + C$' },
    { mucDo:'TH', phan:'tln', noiDung:'Tính $\\int x\\cos x\\,dx$ bằng phương pháp từng phần.', dapAn:'$x\\sin x + \\cos x + C$' },
    { mucDo:'VD', phan:'tln', noiDung:'Tính $\\int x\\ln x\\,dx$.', dapAn:'$\\dfrac{x^2\\ln x}{2} - \\dfrac{x^2}{4} + C$' },
    { mucDo:'VD', phan:'tln', noiDung:'Tính $\\int\\sin^2 x\\,dx$ bằng công thức hạ bậc.', dapAn:'$\\dfrac{x}{2} - \\dfrac{\\sin 2x}{4} + C$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tính $\\displaystyle\\int_1^e x\\ln x\\,dx$.', dapAn:'$\\dfrac{e^2+1}{4}$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tính $\\displaystyle\\int_0^{\\pi/2} x\\cos x\\,dx$.', dapAn:'$\\dfrac{\\pi}{2}-1$' },
    { mucDo:'NB', phan:'ds', noiDung:'Xác định Đúng/Sai:\na) $\\int\\dfrac{1}{x}\\,dx = \\ln|x|+C$.\nb) $\\int\\cos x\\,dx = \\sin x+C$.\nc) $\\int(f+g)\\,dx = \\int f\\,dx - \\int g\\,dx$.\nd) $\\displaystyle\\int_0^1 e^x\\,dx = e-1$.', dapAn:'Đ Đ S Đ' },
  ],

  /* ── TÍCH PHÂN ──────────────────────────────────────────────────────── */
  'tích phân': [
    { mucDo:'NB', phan:'nlc', noiDung:'$\\displaystyle\\int_0^2 2x\\,dx$ bằng:\nA. $4$\nB. $2$\nC. $8$\nD. $0$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'Nếu $\\displaystyle\\int_a^b f\\,dx=5$ thì $\\displaystyle\\int_a^b 3f\\,dx$ bằng:\nA. $15$\nB. $5$\nC. $8$\nD. $2$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'$\\displaystyle\\int_0^{\\pi/2}\\cos x\\,dx$ bằng:\nA. $1$\nB. $0$\nC. $-1$\nD. $\\dfrac{\\pi}{2}$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'Diện tích hình $y=x^2$ và $Ox$ từ $0$ đến $2$:\nA. $\\dfrac{8}{3}$\nB. $4$\nC. $2$\nD. $\\dfrac{16}{3}$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'$\\displaystyle\\int_{-1}^{1}(x^3+x)\\,dx$ bằng:\nA. $0$\nB. $2$\nC. $-2$\nD. $4$', dapAn:'A' },
    { mucDo: 'TH', phan: 'tln', noiDung: 'Tính $\\displaystyle\\int_1^2(x^2-2x+1)\\,dx$.', dapAn: '$\\dfrac{1}{3}$' },
    { mucDo: 'TH', phan: 'tln', noiDung: 'Tính $\\displaystyle\\int_0^{\\pi}\\sin x\\,dx$.', dapAn: '$2$' },
    { mucDo: 'VD', phan: 'tln', noiDung: 'Tính diện tích hình phẳng giới hạn $y=x^2$ và $y=x$.', dapAn: '$S=\\dfrac{1}{6}$' },
    { mucDo: 'VD', phan: 'tln', noiDung: 'Tính $\\displaystyle\\int_0^1 x\\sqrt{x^2+1}\\,dx$ bằng đặt $t=x^2+1$.', dapAn: '$\\dfrac{2\\sqrt{2}-1}{3}$' },
    { mucDo: 'VDC', phan: 'tln', noiDung: 'Tính thể tích khi $y=x^2$, $y=0$, $x=2$ quay quanh $Ox$.', dapAn: '$V=\\dfrac{32\\pi}{5}$' },
    { mucDo: 'VDC', phan: 'tln', noiDung: 'Tính $\\displaystyle\\int_0^{\\pi/4}\\tan^2 x\\,dx$.', dapAn: '$1-\\dfrac{\\pi}{4}$' },
    { mucDo: 'NB', phan: 'ds', noiDung: 'Cho $\\displaystyle\\int_0^2 f\\,dx=3$, $\\displaystyle\\int_0^2 g\\,dx=5$. Xác định Đúng/Sai:\na) $\\displaystyle\\int_0^2(f+g)\\,dx=8$.\nb) $\\displaystyle\\int_0^2 2f\\,dx=6$.\nc) $\\displaystyle\\int_2^0 f\\,dx=-3$.\nd) $\\displaystyle\\int_0^2 f\\cdot g\\,dx=15$.', dapAn: 'Đ Đ Đ S' },
  ],

  /* ── ỨNG DỤNG TÍCH PHÂN ─────────────────────────────────────────────── */
  'ứng dụng tích phân': [
    { mucDo: 'NB', phan: 'nlc', noiDung: 'Diện tích hình phẳng giới hạn $y=f(x)$, $Ox$, $x=a$, $x=b$:\nA. $S=\\displaystyle\\int_a^b|f(x)|\\,dx$\nB. $S=\\displaystyle\\int_a^b f(x)\\,dx$\nC. $S=\\left|\\displaystyle\\int_a^b f(x)\\,dx\\right|$\nD. $S=\\displaystyle\\int_a^b f\'(x)\\,dx$', dapAn: 'A' },
    { mucDo: 'NB', phan: 'nlc', noiDung: 'Thể tích vật tròn xoay quanh $Ox$: $V=\\pi\\displaystyle\\int_a^b\\underline{\\quad}\\,dx$. Điền vào:\nA. $[f(x)]^2$\nB. $f(x)$\nC. $|f(x)|$\nD. $f\'(x)$', dapAn: 'A' },
    { mucDo: 'TH', phan: 'nlc', noiDung: 'Diện tích hình phẳng giữa $y=x^2$ và $y=x$:\nA. $\\dfrac{1}{6}$\nB. $\\dfrac{1}{3}$\nC. $\\dfrac{1}{2}$\nD. $1$', dapAn: 'A' },
    { mucDo: 'TH', phan: 'nlc', noiDung: 'Thể tích: $y=x$, $y=0$, $x=2$ quay $Ox$:\nA. $\\dfrac{8\\pi}{3}$\nB. $4\\pi$\nC. $2\\pi$\nD. $\\dfrac{4\\pi}{3}$', dapAn: 'A' },
    { mucDo: 'TH', phan: 'tln', noiDung: 'Tính diện tích hình phẳng giới hạn $y=x^2$ và $y=4$.', dapAn: '$S=\\dfrac{32}{3}$' },
    { mucDo: 'TH', phan: 'tln', noiDung: 'Tính diện tích hình phẳng: $y=\\sin x$, $Ox$, từ $0$ đến $\\pi$.', dapAn: '$S=2$' },
    { mucDo: 'VD', phan: 'tln', noiDung: 'Tính thể tích: $y=x^2+1$, $y=0$, $x=0$, $x=1$ quay $Ox$.', dapAn: '$V=\\dfrac{28\\pi}{15}$' },
    { mucDo: 'VD', phan: 'tln', noiDung: 'Tính diện tích hình phẳng giới hạn $y=x^3$ và $y=x$.', dapAn: '$S=\\dfrac{1}{2}$' },
    { mucDo: 'VDC', phan: 'tln', noiDung: 'Tính thể tích: $y=\\sqrt{x}$, $y=0$, $x=4$ quay $Ox$.', dapAn: '$V=8\\pi$' },
    { mucDo: 'VDC', phan: 'tln', noiDung: 'Tìm $a>0$ sao cho $\\displaystyle\\int_0^a(2x+1)\\,dx=6$.', dapAn: '$a=2$' },
    { mucDo: 'NB', phan: 'ds', noiDung: 'Xác định Đúng/Sai:\na) $\\displaystyle\\int_0^1 x^2\\,dx=\\dfrac{1}{3}$.\nb) $S$ giữa $y=x^2$ và $y=x$ là $\\dfrac{1}{6}$.\nc) Thể tích $y=x$, $x\\in[0,1]$ quay $Ox$: $V=\\dfrac{\\pi}{3}$.\nd) $S$ giữa $y=x^3$ và $Ox$ từ $-1$ đến $1$: $S=\\dfrac{1}{2}$.', dapAn: 'Đ Đ Đ Đ' },
  ],


  /* ── PHƯƠNG TRÌNH MẶT PHẲNG ─────────────────────────────────────────── */
  'phương trình mặt phẳng': [
    { mucDo:'NB', phan:'nlc', noiDung:'Mặt phẳng qua $O$, pháp tuyến $\\vec{n}=(1,2,3)$:\nA. $x+2y+3z=0$\nB. $x-2y+3z=0$\nC. $2x+y+3z=0$\nD. $x+2y-3z=0$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'Mặt phẳng $Oxz$ có phương trình:\nA. $y=0$\nB. $x=0$\nC. $z=0$\nD. $x+y+z=0$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'Khoảng cách từ $O$ đến $(P): 2x-y+2z-6=0$:\nA. $2$\nB. $3$\nC. $1$\nD. $6$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'Hai mp $x+2y-z=1$ và $2x+4y-2z=3$ quan hệ:\nA. Song song\nB. Cắt nhau\nC. Trùng nhau\nD. Vuông góc', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'Pháp vectơ của mp $3x-y+2z+5=0$:\nA. $(3,-1,2)$\nB. $(3,1,2)$\nC. $(-3,1,-2)$\nD. $(1,3,2)$', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'Viết pt mặt phẳng qua $A(1,0,-1)$, $B(2,1,0)$, $C(0,-1,1)$.', dapAn:'$x-y-z=0$' },
    { mucDo:'TH', phan:'tln', noiDung:'Tính khoảng cách từ $A(2,3,-1)$ đến mp $x-2y+2z+3=0$.', dapAn:'$\\dfrac{4}{3}$' },
    { mucDo:'VD', phan:'tln', noiDung:'Tìm hình chiếu của $M(1,2,3)$ xuống mp $2x-y+z=6$.', dapAn:'$H(3,1,4)$' },
    { mucDo:'VD', phan:'tln', noiDung:'Viết pt mp chứa $A(1,0,0)$, $B(0,1,0)$ song song với $Oz$.', dapAn:'$x+y=1$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tìm mp đối xứng với $(P): x+y+z=1$ qua $(Q): x+y+z=3$.', dapAn:'$x+y+z=5$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tìm điểm $M$ trên mp $(P): x+y+z=1$ gần $A(3,0,0)$ nhất.', dapAn:"$M=\\left(\\dfrac{4}{3},-\\dfrac{1}{3},-\\dfrac{1}{3}\\right)$" },
    { mucDo:'NB', phan:'ds', noiDung:'Cho $(P): 2x-y+2z-6=0$. Xác định Đúng/Sai:\na) Véc-tơ pháp $\\vec{n}=(2,-1,2)$.\nb) $d(O,(P))=2$.\nc) $(P)$ cắt cả 3 trục tọa độ.\nd) $A(3,0,0)$ thuộc $(P)$.', dapAn:'Đ Đ Đ S' },
  ],

  /* ── PHƯƠNG TRÌNH ĐƯỜNG THẲNG ──────────────────────────────────────── */
  'phương trình đường thẳng': [
    { mucDo:'NB', phan:'nlc', noiDung:'Đường thẳng qua $A(1,0,2)$, vtcp $\\vec{u}=(1,-1,2)$:\nA. $x=1+t,\\; y=-t,\\; z=2+2t$\nB. $x=t,\\; y=-t,\\; z=2t$\nC. $x=1,\\; y=-1,\\; z=2$\nD. $x=1+t,\\; y=2t,\\; z=t$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'Đường thẳng $\\dfrac{x-1}{2}=\\dfrac{y+1}{1}=\\dfrac{z-2}{3}$ có vtcp:\nA. $(2,1,3)$\nB. $(1,-1,2)$\nC. $(-2,1,3)$\nD. $(3,1,2)$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'$d_1: \\dfrac{x}{1}=\\dfrac{y}{2}=\\dfrac{z}{3}$ và $d_2: \\dfrac{x}{2}=\\dfrac{y}{4}=\\dfrac{z}{6}$ quan hệ:\nA. Song song\nB. Trùng nhau\nC. Cắt nhau\nD. Chéo nhau', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'Viết pt đường thẳng qua $A(1,2,3)$ và $B(3,0,1)$.', dapAn:'$\\dfrac{x-1}{2}=\\dfrac{y-2}{-2}=\\dfrac{z-3}{-2}$' },
    { mucDo:'TH', phan:'tln', noiDung:'Tìm giao điểm $d: x=1+t,\\; y=t,\\; z=2-t$ với mp $x+y+z=4$.', dapAn:'$M(2,1,1)$' },
    { mucDo:'VD', phan:'tln', noiDung:'Viết pt đường thẳng qua $A(2,1,-1)$ vuông góc mp $x-2y+z=5$.', dapAn:'$\\dfrac{x-2}{1}=\\dfrac{y-1}{-2}=\\dfrac{z+1}{1}$' },
    { mucDo:'VD', phan:'tln', noiDung:'Tính khoảng cách từ $M(1,0,0)$ đến $d: x=t,\\; y=1+t,\\; z=t$.', dapAn:'$\\sqrt{\\dfrac{2}{3}}$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tính khoảng cách 2 đường chéo nhau:\n$d_1: x=1+t,\\; y=t,\\; z=0$\n$d_2: x=0,\\; y=s,\\; z=1+s$.', dapAn:'$\\dfrac{1}{\\sqrt{2}}$' },
    { mucDo:'NB', phan:'ds', noiDung:'Cho $d: x=2+t,\\; y=1-2t,\\; z=3t$. Xác định Đúng/Sai:\na) vtcp $\\vec{u}=(1,-2,3)$.\nb) $A(2,1,0)$ thuộc $d$ khi $t=0$.\nc) $d$ vuông góc mp $Oyz$.\nd) $d$ cắt mp $xOy$ tại $\\left(\\dfrac{5}{3},-\\dfrac{1}{3},0\\right)$.', dapAn:'Đ Đ S Đ' },
  ],

  /* ── PHƯƠNG TRÌNH MẶT CẦU ──────────────────────────────────────────── */
  'phương trình mặt cầu': [
    { mucDo:'NB', phan:'nlc', noiDung:'Mặt cầu tâm $I(1,2,3)$ bán kính $R=5$:\nA. $(x-1)^2+(y-2)^2+(z-3)^2=25$\nB. $x^2+y^2+z^2=25$\nC. $(x+1)^2+(y+2)^2+(z+3)^2=25$\nD. $(x-1)^2=25$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'Mặt cầu $x^2+y^2+z^2-2x-4y+5=0$ có tâm:\nA. $(1,2,0)$\nB. $(-1,-2,0)$\nC. $(2,4,0)$\nD. $(0,0,0)$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'Bán kính $(S): x^2+y^2+z^2-2x+4y-4z-10=0$:\nA. $4$\nB. $3$\nC. $5$\nD. $\\sqrt{10}$', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'Tính bán kính và tâm: $x^2+y^2+z^2-4x+6y-2z+5=0$.', dapAn:'$I(2,-3,1)$; $R=3$' },
    { mucDo:'TH', phan:'tln', noiDung:'Viết pt mặt cầu đường kính $AB$, $A(1,2,-1)$, $B(3,0,3)$.', dapAn:'$(x-2)^2+(y-1)^2+(z-1)^2=9$' },
    { mucDo:'VD', phan:'tln', noiDung:'Viết pt mặt cầu ngoại tiếp tứ diện $O,A(2,0,0),B(0,2,0),C(0,0,2)$.', dapAn:'$x^2+y^2+z^2-2x-2y-2z=0$' },
    { mucDo:'VD', phan:'tln', noiDung:'Tìm vị trí tương đối $(S): x^2+y^2+z^2=9$ và $(P): x+y+z=\\sqrt{3}$.', dapAn:'$d(I,(P))=1 < 3=R$ $\\Rightarrow$ $(P)$ cắt $(S)$' },
    { mucDo:'TH', phan:'tln', noiDung:'Tính diện tích mặt cầu bán kính $R=2$ và mô-đun của số phức $z = 3 - 4i$.', dapAn:'$16\\pi$ và $5$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tìm mp tiếp xúc $(S): I(1,2,3)$, $R=3$ tại $M(1,2,6)$.', dapAn:'$z=6$' },
    { mucDo:'NB', phan:'ds', noiDung:'Cho $(S): x^2+y^2+z^2-4x+2y-4=0$. Xác định Đúng/Sai:\na) Tâm $I=(2,-1,0)$.\nb) $R=3$.\nc) $O(0,0,0)$ nằm trong $(S)$.\nd) $A(4,-1,0)$ thuộc $(S)$.', dapAn:'Đ Đ Đ S' },
  ],

  /* ── XÁC SUẤT ───────────────────────────────────────────────────────── */
  'xác suất': [
    { mucDo:'NB', phan:'nlc', noiDung:'Tung 1 đồng xu, $P(\\text{ngửa})$:\nA. $\\dfrac{1}{2}$\nB. $1$\nC. $0$\nD. $\\dfrac{1}{4}$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'Gieo 1 xúc xắc, $P(\\text{số chẵn})$:\nA. $\\dfrac{1}{2}$\nB. $\\dfrac{1}{3}$\nC. $\\dfrac{1}{6}$\nD. $\\dfrac{2}{3}$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'Nếu $A$, $B$ xung khắc thì $P(A\\cup B)$:\nA. $P(A)+P(B)$\nB. $P(A)\\cdot P(B)$\nC. $0$\nD. $1$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'Hộp 3 đỏ 2 xanh. Rút 2 bi, $P(\\text{cả 2 đỏ})$:\nA. $\\dfrac{3}{10}$\nB. $\\dfrac{1}{5}$\nC. $\\dfrac{2}{5}$\nD. $\\dfrac{1}{2}$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'$P(A)=0{,}6$; $P(B)=0{,}5$; $A\\perp B$. $P(A\\cap B)$:\nA. $0{,}3$\nB. $0{,}8$\nC. $0{,}1$\nD. $0{,}55$', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'Tung 3 đồng xu. Tính $P(\\text{đúng 2 mặt ngửa})$.', dapAn:'$\\dfrac{3}{8}$' },
    { mucDo:'TH', phan:'tln', noiDung:'Gieo 2 xúc xắc. Tính $P(\\text{tổng}=7)$.', dapAn:'$\\dfrac{1}{6}$' },
    { mucDo:'VD', phan:'tln', noiDung:'Hộp 5 đỏ 3 xanh, rút 2 bi không hoàn lại. $P(\\text{1 đỏ 1 xanh})$.', dapAn:'$\\dfrac{15}{28}$' },
    { mucDo:'VD', phan:'tln', noiDung:'$P(A)=0{,}4$; $P(B|A)=0{,}5$; $P(B|\\bar{A})=0{,}2$. Tính $P(B)$.', dapAn:'$0{,}32$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Với $P(A)=0{,}4$, $P(B)=0{,}32$. Tính $P(A|B)$ theo Bayes.', dapAn:'$0{,}625$' },
    { mucDo:'VDC', phan:'tln', noiDung:'NM I: 60% SP phế 2%; NM II: 40% SP phế 3%. Lấy 1 phế phẩm. $P(\\text{từ NM II})$.', dapAn:'$\\dfrac{1}{2}$' },
    { mucDo:'NB', phan:'ds', noiDung:'Gieo 2 xúc xắc. Xác định Đúng/Sai:\na) Không gian mẫu có $36$ phần tử.\nb) $P(\\text{tổng}=2)=\\dfrac{1}{36}$.\nc) $P(\\text{tổng}\\leq 6)=\\dfrac{15}{36}$.\nd) $P(\\text{tổng}=7 \\text{ hoặc } 11)=\\dfrac{2}{9}$.', dapAn:'Đ Đ Đ Đ' },
  ],

  /* ── XÁC SUẤT CÓ ĐIỀU KIỆN ─────────────────────────────────────────── */
  'xác suất có điều kiện': [
    { mucDo:'NB', phan:'nlc', noiDung:'$P(A|B)$ bằng:\nA. $\\dfrac{P(A\\cap B)}{P(B)}$\nB. $P(A)\\cdot P(B)$\nC. $P(A)+P(B)$\nD. $\\dfrac{P(A\\cap B)}{P(A)}$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'$A$ độc lập với $B$ khi:\nA. $P(A\\cap B)=P(A)\\cdot P(B)$\nB. $P(A|B)=P(A)+P(B)$\nC. $P(A\\cap B)=0$\nD. $A$ và $B$ xung khắc', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'$P(A)=0{,}5$; $P(B)=0{,}4$; $P(A\\cap B)=0{,}2$. $P(A|B)=?$\nA. $0{,}5$\nB. $0{,}4$\nC. $0{,}8$\nD. $0{,}2$', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'$P(A)=0{,}6$; $P(B)=0{,}5$; $P(A\\cap B)=0{,}3$. Tính $P(A|B)$ và $P(B|A)$.', dapAn:'$P(A|B)=0{,}6$; $P(B|A)=0{,}5$' },
    { mucDo:'VD', phan:'tln', noiDung:'$P(A)=0{,}4$; $P(B|A)=0{,}5$; $P(B|\\bar{A})=0{,}2$. Tính $P(A|B)$ theo Bayes.', dapAn:'$0{,}625$' },
    { mucDo:'VDC', phan:'tln', noiDung:'NM I: 60% SP phế 2%; NM II: 40% SP phế 3%. $P(\\text{từ NM II}|\\text{phế phẩm})$.', dapAn:'$0{,}5$' },
    { mucDo:'NB', phan:'ds', noiDung:'$P(A)=0{,}4$; $P(B)=0{,}5$; $P(A\\cap B)=0{,}2$. Xác định Đúng/Sai:\na) $P(A|B)=0{,}4$.\nb) $P(B|A)=0{,}5$.\nc) $A$ và $B$ độc lập.\nd) $P(A\\cup B)=0{,}7$.', dapAn:'Đ Đ Đ Đ' },
    { mucDo:'TH', phan:'ds', noiDung:'Máy A sản xuất $60\\%$ sản lượng (lỗi $3\\%$), máy B $40\\%$ (lỗi $2\\%$). Lấy 1 sp ngẫu nhiên. Xét các phát biểu:\na) $P$(sp lỗi) $= 0{,}026$.\nb) Nếu sp lỗi, $P$(từ máy A) $\\approx 0{,}692$.\nc) Nếu sp lỗi, $P$(từ máy B) $\\approx 0{,}308$.\nd) Máy B sản xuất ít lỗi hơn máy A.', dapAn:'Đ Đ Đ Đ' },
    { mucDo:'VD', phan:'ds', noiDung:'Kho hàng: $40\\%$ từ NM A (hỏng $3\\%$), $60\\%$ từ NM B (hỏng $1\\%$). Xét các phát biểu:\na) $P$(hàng hỏng) $= 0{,}018$.\nb) Nếu hàng hỏng, $P$(từ NM A) $= \\dfrac{2}{3}$.\nc) Nếu hàng hỏng, $P$(từ NM B) $= \\dfrac{1}{3}$.\nd) NM B đóng góp nhiều hàng hỏng hơn NM A.', dapAn:'Đ Đ Đ S' },
    { mucDo:'TH', phan:'tln', noiDung:'Công ty A chiếm $70\\%$ thị phần (lỗi $2\\%$), công ty B $30\\%$ (lỗi $5\\%$). Chọn 1 sp lỗi. Tính xác suất sp đó từ công ty B.', dapAn:'$\\dfrac{15}{29} \\approx 0{,}517$' },
    { mucDo:'VD', phan:'tln', noiDung:'Kiểm tra y tế: $1\\%$ dân số mắc bệnh X. Test dương tính chính xác $95\\%$, dương tính giả $10\\%$. Nếu test dương, tính $P$(thực sự mắc bệnh).', dapAn:'$\\dfrac{0{,}0095}{0{,}0095+0{,}0990} \\approx 8{,}8\\%$' },
  ],

  /* ── TỔ HỢP – HOÁN VỊ ──────────────────────────────────────────────── */
  'tổ hợp': [
    { mucDo:'NB', phan:'nlc', noiDung:'$C_5^2$ bằng:\nA. $10$\nB. $20$\nC. $5$\nD. $15$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'Số hoán vị của $5$ phần tử:\nA. $120$\nB. $60$\nC. $24$\nD. $20$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'$A_5^2$ bằng:\nA. $20$\nB. $10$\nC. $5$\nD. $15$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'Chọn 3 học sinh từ 10:\nA. $120$\nB. $720$\nC. $30$\nD. $10$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'Khai triển $(x+1)^5$, hệ số $x^3$:\nA. $10$\nB. $5$\nC. $1$\nD. $15$', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'Xếp 5 học sinh vào 5 ghế hàng ngang. Số cách.', dapAn:'$5! = 120$' },
    { mucDo:'TH', phan:'tln', noiDung:'4 nam 3 nữ, chọn 2 người có ít nhất 1 nữ.', dapAn:'$15$' },
    { mucDo:'VD', phan:'tln', noiDung:'Tìm hệ số $x^4$ trong $(2x-1)^6$.', dapAn:'$60$' },
    { mucDo:'VD', phan:'tln', noiDung:'Giải phương trình $C_n^2=15$.', dapAn:'$n=6$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Số tự nhiên 4 chữ số khác nhau từ $\\{1,2,3,4,5\\}$.', dapAn:'$5\\times4\\times3\\times2=120$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Số hạng không chứa $x$ trong $\\left(x+\\dfrac{1}{x^2}\\right)^9$.', dapAn:'$C_9^3=84$' },
    { mucDo:'NB', phan:'ds', noiDung:'Xác định Đúng/Sai:\na) $P_4=4!=24$.\nb) $C_6^3=20$.\nc) $A_n^k=k!\\cdot C_n^k$.\nd) $C_5^0+C_5^1+\\cdots+C_5^5=32$.', dapAn:'Đ Đ Đ Đ' },
  ],

  /* ── DÃY SỐ ─────────────────────────────────────────────────────────── */
  'dãy số': [
    { mucDo:'NB', phan:'nlc', noiDung:'CSC $2,5,8,11,\\ldots$ có công sai $d$:\nA. $3$\nB. $2$\nC. $5$\nD. $1$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'CSN $2,6,18,54,\\ldots$ có công bội $q$:\nA. $3$\nB. $2$\nC. $4$\nD. $6$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'CSC $u_1=3$, $d=2$ thì $u_5$:\nA. $11$\nB. $13$\nC. $10$\nD. $12$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'CSN $u_1=2$, $q=3$. Tổng 4 số hạng đầu:\nA. $80$\nB. $60$\nC. $40$\nD. $100$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'CSC $u_1=1$, $u_{10}=19$. Công sai $d$:\nA. $2$\nB. $3$\nC. $1$\nD. $4$', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'CSC $u_1=1$, $u_2=4$. Tìm $u_{10}$ và $S_{10}$.', dapAn:'$u_{10}=28$; $S_{10}=145$' },
    { mucDo:'TH', phan:'tln', noiDung:'CSN $u_1=3$, $q=2$. Tính $S_6$.', dapAn:'$S_6=189$' },
    { mucDo:'VD', phan:'tln', noiDung:'Tìm CSC có 3 số hạng đầu: tổng $=9$, tích $=15$.', dapAn:'$1, 3, 5$ (hoặc ngược lại)' },
    { mucDo:'VD', phan:'tln', noiDung:'Tổng $n$ số hạng đầu CSC: $S_n=n^2+2n$. Tìm $d$ và $u_1$.', dapAn:'$u_1=3$; $d=2$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Gửi 100 triệu, lãi suất $8\\%$/năm kép. Sau 5 năm có bao nhiêu?', dapAn:'$100\\times(1{,}08)^5 \\approx 146{,}93$ triệu' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tổng vô hạn CSN: $u_1=6$, $q=\\dfrac{1}{3}$.', dapAn:'$S=9$' },
    { mucDo:'NB', phan:'ds', noiDung:'Cho CSC $u_1=2$, $d=3$. Xác định Đúng/Sai:\na) $u_5=14$.\nb) $S_4=26$.\nc) $S_{10}=155$.\nd) $u_n=3n-1$.', dapAn:'Đ Đ Đ Đ' },
    { mucDo:'TH', phan:'ds', noiDung:'Cho CSN $(u_n)$ có $u_1=3$, $q=2$. Xác định Đúng/Sai:\na) $u_4=24$.\nb) $S_3=21$.\nc) $u_1+u_2+u_3+u_4=45$.\nd) CSN trên là CSN tăng.', dapAn:'Đ Đ Đ Đ' },
    { mucDo:'VD', phan:'ds', noiDung:'Cho CSC $(u_n)$ với $u_3=7$, $u_7=19$. Xác định Đúng/Sai:\na) Công sai $d=3$.\nb) $u_1=1$.\nc) $u_{10}=28$.\nd) $S_{10}=145$.', dapAn:'Đ Đ Đ Đ' },
    { mucDo:'VDC', phan:'ds', noiDung:'Người gửi đầu mỗi tháng $2$ triệu, lãi $0{,}5\\%$/tháng (lãi kép). Xét các phát biểu:\na) Đây là bài toán CSN với $q = 1{,}005$.\nb) Tổng sau $12$ tháng $\\approx 24{,}67$ triệu.\nc) Tổng sau $24$ tháng $\\approx 50{,}95$ triệu.\nd) Sau $12$ tháng, tổng đúng bằng $24$ triệu.', dapAn:'Đ Đ Đ S' },
    { mucDo:'VDC', phan:'tln', noiDung:'Người vay $300$ triệu, lãi $6\\%$/năm (lãi kép), mỗi năm trả đều $a$ triệu. Tính $a$ (làm tròn 0,01) để trả hết sau $10$ năm.', dapAn:'$a \\approx 40{,}76$ triệu' },
  ],

  /* ── NGÂN HÀNG CÂU HỎI CHUẨN FORM 2025 (Tham khảo phong cách Thầy Nguyễn Bảo Vương) ── */
  'tổng hợp': [
    // ═══ NLC - TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN ═══
    { mucDo:'NB', phan:'nlc', noiDung:'Hàm số $y = x^3 - 3x^2 + 2$ có bao nhiêu điểm cực trị?\nA. $2$\nB. $1$\nC. $3$\nD. $0$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'Nguyên hàm của $f(x) = 4x^3$ là:\nA. $x^4 + C$\nB. $12x^2 + C$\nC. $4x^4 + C$\nD. $\\dfrac{x^4}{4} + C$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'Đồ thị hàm số $y = \\dfrac{x-1}{x+2}$ có tiệm cận ngang là:\nA. $y = 1$\nB. $y = -2$\nC. $y = 0$\nD. $y = -1$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'Số phức $z = 2 - 3i$ có phần ảo bằng:\nA. $-3$\nB. $3$\nC. $-3i$\nD. $2$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'Số phức $z = (1+i)^2$ có phần thực và phần ảo lần lượt là:\nA. $0$ và $2$\nB. $2$ và $0$\nC. $1$ và $1$\nD. $-1$ và $2$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'Tiệm cận đứng của đồ thị hàm số $y = \\dfrac{x+1}{x-2}$ là:\nA. $x = 2$\nB. $x = -1$\nC. $y = 1$\nD. $x = 0$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'$\\displaystyle\\int_0^2 (2x + 1)\\,dx$ bằng:\nA. $6$\nB. $4$\nC. $5$\nD. $8$', dapAn:'A' },
    { mucDo:'VD', phan:'nlc', noiDung:'Giá trị lớn nhất của hàm số $y = x^3 - 3x$ trên $[-2; 2]$ bằng:\nA. $2$\nB. $4$\nC. $-2$\nD. $0$', dapAn:'A' },
    { mucDo:'VD', phan:'nlc', noiDung:'Cho $z = 1 + 2i$, $w = 3 - i$. Mô-đun $|z \\cdot w|$ bằng:\nA. $5\\sqrt{2}$\nB. $\\sqrt{50}$\nC. $5$\nD. $10$', dapAn:'A' },

    // ═══ DS - ĐÚNG/SAI CHUẨN FORM 2025 ═══
    { mucDo:'NB', phan:'ds', noiDung:'Cho hàm số $y = x^4 - 2x^2 + 1$. Xét các phát biểu sau:\na) Hàm số có đạo hàm $y\' = 4x^3 - 4x$.\nb) Phương trình $y\' = 0$ có $3$ nghiệm phân biệt.\nc) Hàm số đạt cực tiểu tại $x = 0$.\nd) Đồ thị hàm số nhận trục $Oy$ làm trục đối xứng.', dapAn:'Đ Đ S Đ' },
    { mucDo:'TH', phan:'ds', noiDung:'Cho hàm số $y = \\dfrac{2x + 1}{x - 1}$. Xét các phát biểu sau:\na) Tập xác định $D = \\mathbb{R} \\setminus \\{1\\}$.\nb) Đồ thị có tiệm cận ngang $y = 2$.\nc) Đồ thị có tiệm cận đứng $x = -1$.\nd) Hàm số nghịch biến trên mỗi khoảng xác định.', dapAn:'Đ Đ S Đ' },
    { mucDo:'TH', phan:'ds', noiDung:'Cho hàm số $f(x) = x^3 - 3x + 2$. Xét các phát biểu sau:\na) $f\'(x) = 3x^2 - 3$.\nb) $f\'(1) = 0$.\nc) Hàm số đồng biến trên khoảng $(-1; 1)$.\nd) Giá trị cực đại của hàm số bằng $4$.', dapAn:'Đ Đ S Đ' },
    { mucDo:'VD', phan:'ds', noiDung:'Cho $\\displaystyle\\int_0^2 f(x)\\,dx = 5$ và $\\displaystyle\\int_0^2 g(x)\\,dx = 3$. Xét các phát biểu:\na) $\\displaystyle\\int_0^2 [f(x) + g(x)]\\,dx = 8$.\nb) $\\displaystyle\\int_0^2 3f(x)\\,dx = 15$.\nc) $\\displaystyle\\int_2^0 f(x)\\,dx = 5$.\nd) $\\displaystyle\\int_0^2 f(x) \\cdot g(x)\\,dx = 15$.', dapAn:'Đ Đ S S' },
    { mucDo:'VD', phan:'ds', noiDung:'Cho số phức $z = 3 - 4i$. Xét các phát biểu sau:\na) Mô-đun $|z| = 5$.\nb) Số phức liên hợp $\\bar{z} = 3 + 4i$.\nc) $z + \\bar{z} = 6$.\nd) $z \\cdot \\bar{z} = 7$.', dapAn:'Đ Đ Đ S' },
    { mucDo:'TH', phan:'ds', noiDung:'Trong không gian $Oxyz$, cho mp $(P): 2x - y + 2z - 6 = 0$. Xét các phát biểu:\na) Véc-tơ pháp tuyến của $(P)$ là $\\vec{n} = (2; -1; 2)$.\nb) Khoảng cách từ $O$ đến $(P)$ bằng $2$.\nc) Điểm $A(3; 0; 0)$ thuộc $(P)$.\nd) $(P)$ song song với mp $4x - 2y + 4z = 6$.', dapAn:'Đ Đ Đ S' },
    { mucDo:'VDC', phan:'ds', noiDung:'Cho hàm số $y = x^3 - 3mx + 2$ với $m$ là tham số. Xét các phát biểu:\na) Khi $m = 1$, hàm số có cực đại và cực tiểu.\nb) Khi $m \\leq 0$, hàm số không có cực trị.\nc) Hàm số luôn đi qua điểm $(0; 2)$ với mọi $m$.\nd) Khi $m = 3$, giá trị cực đại bằng $8$.', dapAn:'Đ Đ Đ Đ' },
    { mucDo:'VD', phan:'ds', noiDung:'Cho hàm số $y = x^3 - 6x^2 + 9x + 1$. Xét các phát biểu sau:\na) $y\'(x) = 3x^2 - 12x + 9$.\nb) Hàm số đạt cực đại tại $x = 1$.\nc) Giá trị cực tiểu bằng $1$.\nd) Hàm số đồng biến trên $(3; +\\infty)$.', dapAn:'Đ Đ Đ Đ' },
    { mucDo:'TH', phan:'ds', noiDung:'Cho cấp số cộng $(u_n)$ với $u_1 = 5$, $d = -2$. Xét các phát biểu:\na) $u_3 = 1$.\nb) $u_5 = -3$.\nc) $S_5 = 5$.\nd) Dãy $(u_n)$ là dãy giảm.', dapAn:'Đ Đ Đ Đ' },
    { mucDo:'VDC', phan:'ds', noiDung:'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình vuông cạnh $a$, $SA \\perp (ABCD)$, $SA = a$. Xét các phát biểu:\na) $V_{S.ABCD} = \\dfrac{a^3}{3}$.\nb) $SC = a\\sqrt{3}$.\nc) Góc giữa $SC$ và $(ABCD)$ bằng $45^\\circ$.\nd) Khoảng cách từ $A$ đến $(SBC)$ bằng $\\dfrac{a\\sqrt{2}}{2}$.', dapAn:'Đ Đ Đ Đ' },

    // ═══ TLN - TRẢ LỜI NGẮN CHUẨN FORM 2025 ═══
    { mucDo:'TH', phan:'tln', noiDung:'Tìm giá trị cực đại của hàm số $y = -x^2 + 4x - 3$.', dapAn:'$1$' },
    { mucDo:'TH', phan:'tln', noiDung:'Tính $\\displaystyle\\int_0^1 (3x^2 + 2x)\\,dx$.', dapAn:'$2$' },
    { mucDo:'TH', phan:'tln', noiDung:'Tìm mô-đun của số phức $z = 3 + 4i$.', dapAn:'$5$' },
    { mucDo:'TH', phan:'tln', noiDung:'Tính đạo hàm của hàm số $y = x^3 - 6x^2 + 9x$ tại $x = 1$.', dapAn:'$0$' },
    { mucDo:'TH', phan:'tln', noiDung:'Tiệm cận ngang của đồ thị hàm số $y = \\dfrac{3x - 1}{x + 2}$ có phương trình $y = ?$', dapAn:'$3$' },
    { mucDo:'TH', phan:'tln', noiDung:'Số nghiệm của phương trình $x^3 - 3x + 2 = 0$ là bao nhiêu?', dapAn:'$2$' },
    { mucDo:'VD', phan:'tln', noiDung:'Tính diện tích hình phẳng giới hạn bởi $y = x^2$ và $y = 4$.', dapAn:'$\\dfrac{32}{3}$' },
    { mucDo:'VD', phan:'tln', noiDung:'Cho $z = 1 + 2i$. Tính $|z^2|$.', dapAn:'$5$' },
    { mucDo:'VD', phan:'tln', noiDung:'Tính khoảng cách từ $M(1; 2; 3)$ đến mp $(P): 2x - 2y + z - 3 = 0$.', dapAn:'$\\dfrac{2}{3}$' },
    { mucDo:'VD', phan:'tln', noiDung:'Tìm $m$ để hàm số $y = x^3 - 3x + m$ đạt cực đại bằng $5$.', dapAn:'$m = 3$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Cho hình chóp $S.ABC$ có $SA \\perp (ABC)$, $SA = 3$, tam giác $ABC$ vuông tại $B$, $AB = 3$, $BC = 4$. Tính thể tích khối chóp.', dapAn:'$6$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tính thể tích khối tròn xoay tạo thành khi quay hình phẳng giới hạn bởi $y = \\sqrt{x}$, $y = 0$, $x = 4$ quanh $Ox$.', dapAn:'$8\\pi$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tìm tất cả giá trị $m$ để $y = x^3 - 3x^2 + m$ có hai điểm cực trị nằm khác phía trục $Ox$.', dapAn:'$0 < m < 4$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Gửi tiết kiệm $200$ triệu, lãi suất $7\\%$/năm (lãi kép). Sau $5$ năm số tiền thu được (triệu đồng, làm tròn hàng đơn vị) là bao nhiêu?', dapAn:'$281$' },
  ],

  /* ── BÀI TOÁN THỰC TẾ (DS + TLN) ──────────────────────────────────── */
  'bài toán thực tế': [
    // === DS - Đúng/Sai bài toán thực tế ===
    { mucDo:'TH', phan:'ds', noiDung:'Một người gửi $100$ triệu đồng vào ngân hàng với lãi suất $6\\%$/năm (lãi kép). Xét các phát biểu:\na) Sau $1$ năm, số tiền là $106$ triệu.\nb) Sau $2$ năm, số tiền là $112{,}36$ triệu.\nc) Sau $n$ năm, số tiền là $100 \\cdot 1{,}06^n$ (triệu).\nd) Sau $10$ năm, số tiền vượt quá $200$ triệu.', dapAn:'Đ Đ Đ S' },
    { mucDo:'VD', phan:'ds', noiDung:'Dân số của một thành phố năm 2020 là $2$ triệu người, tỉ lệ tăng $1{,}2\\%$/năm. Xét các phát biểu:\na) Dân số năm 2021 là $2{,}024$ triệu người.\nb) Công thức dân số sau $n$ năm: $N = 2 \\cdot (1{,}012)^n$ (triệu).\nc) Sau $10$ năm, dân số vượt $2{,}3$ triệu người.\nd) Cần khoảng $58$ năm để dân số tăng gấp đôi.', dapAn:'Đ Đ S Đ' },
    { mucDo:'TH', phan:'ds', noiDung:'Một bồn nước hình trụ có bán kính đáy $r = 0{,}5$ m, chiều cao $h = 1{,}2$ m. Xét các phát biểu:\na) Diện tích đáy bồn là $0{,}25\\pi$ m$^2$.\nb) Thể tích bồn là $0{,}3\\pi$ m$^3$.\nc) Bồn chứa được khoảng $942$ lít nước.\nd) Diện tích toàn phần bồn là $1{,}7\\pi$ m$^2$.', dapAn:'Đ Đ Đ Đ' },
    { mucDo:'VD', phan:'ds', noiDung:'Một mảnh đất hình chữ nhật có chu vi $40$ m. Gọi $x$ (m) là chiều rộng. Xét các phát biểu:\na) Chiều dài là $(20 - x)$ m.\nb) Diện tích $S(x) = x(20 - x)$ m$^2$.\nc) Diện tích lớn nhất khi $x = 10$ m.\nd) Diện tích lớn nhất bằng $100$ m$^2$.', dapAn:'Đ Đ Đ Đ' },
    { mucDo:'VDC', phan:'ds', noiDung:'Một nhà máy sản xuất hộp thiếc hình trụ (không nắp) có thể tích $V = 500\\pi$ cm$^3$. Gọi $r$ là bán kính đáy. Xét các phát biểu:\na) Chiều cao $h = \\dfrac{500}{r^2}$ cm.\nb) Diện tích toàn phần $S = \\pi r^2 + \\dfrac{1000\\pi}{r}$.\nc) $S$ nhỏ nhất khi $r = 10$ cm.\nd) $S_{\\min} = 300\\pi$ cm$^2$.', dapAn:'Đ Đ Đ Đ' },
    { mucDo:'TH', phan:'ds', noiDung:'Một viên thuốc có nồng độ trong máu (mg/l) sau $t$ giờ: $C(t) = \\dfrac{5t}{t^2 + 1}$. Xét các phát biểu:\na) $C(0) = 0$.\nb) $C(1) = 2{,}5$ mg/l.\nc) Nồng độ đạt cực đại tại $t = 1$.\nd) Nồng độ giảm dần khi $t > 1$.', dapAn:'Đ Đ Đ Đ' },
    { mucDo:'NB', phan:'ds', noiDung:'Một xe ô tô đi từ A đến B với quãng đường $s(t) = t^3 - 6t^2 + 12t$ (km), $t$ tính bằng giờ. Xét các phát biểu:\na) Vận tốc $v(t) = s\'(t) = 3t^2 - 12t + 12$ (km/h).\nb) $v(0) = 12$ km/h.\nc) Gia tốc $a(t) = v\'(t) = 6t - 12$.\nd) Vận tốc nhỏ nhất tại $t = 2$ giờ.', dapAn:'Đ Đ Đ Đ' },
    { mucDo:'TH', phan:'ds', noiDung:'Một tấm tôn hình chữ nhật dài $12$ m, rộng $6$ m được uốn thành máng nước. Gọi $x$ (m) là chiều cao máng ($0 < x < 3$). Xét các phát biểu:\na) Chiều rộng đáy máng là $(6 - 2x)$ m.\nb) Diện tích tiết diện $S(x) = x(6-2x) = 6x - 2x^2$.\nc) $S$ đạt cực đại tại $x = \\dfrac{3}{2}$.\nd) Lưu lượng tối đa khi $x = 2$ m.', dapAn:'Đ Đ Đ S' },
    { mucDo:'VD', phan:'ds', noiDung:'Một công ty sản xuất $x$ nghìn sản phẩm/tháng có lợi nhuận $P(x) = -x^2 + 10x - 16$ (triệu đồng). Xét các phát biểu:\na) $P(x) > 0$ khi $2 < x < 8$.\nb) Lợi nhuận lớn nhất khi sản xuất $5$ nghìn sản phẩm.\nc) Lợi nhuận lớn nhất bằng $9$ triệu đồng.\nd) Khi $x = 3$, công ty lỗ $2$ triệu đồng.', dapAn:'Đ Đ Đ S' },
    { mucDo:'VD', phan:'ds', noiDung:'Một quả bóng được ném thẳng đứng lên với chiều cao $h(t) = 20t - 5t^2$ (m), $t$ tính bằng giây. Xét các phát biểu:\na) Bóng đạt độ cao lớn nhất tại $t = 2$ giây.\nb) Độ cao lớn nhất là $20$ m.\nc) Bóng rơi trở lại mặt đất tại $t = 4$ giây.\nd) Vận tốc tại $t = 2$ là $0$ m/s.', dapAn:'Đ Đ Đ Đ' },
    { mucDo:'TH', phan:'ds', noiDung:'Nhiệt độ (°C) trong ngày tại thành phố: $T(t) = -0{,}5t^2 + 6t + 20$, $0 \\leq t \\leq 12$, $t$ tính bằng giờ kể từ 6 giờ sáng. Xét các phát biểu:\na) Lúc 6 giờ sáng ($t=0$), nhiệt độ là $20$°C.\nb) Nhiệt độ tăng trong khoảng $0 < t < 6$.\nc) Nhiệt độ cao nhất là $38$°C đạt lúc $12$ giờ trưa.\nd) Nhiệt độ lúc $12$ giờ ($t=6$) là $38$°C.', dapAn:'Đ Đ S Đ' },
    { mucDo:'VDC', phan:'ds', noiDung:'Xí nghiệp sản xuất $x$ sản phẩm với chi phí $C(x) = x^3 - 6x^2 + 13x + 10$ (triệu), giá bán $17$ triệu/sp. Xét các phát biểu:\na) Doanh thu $R(x) = 17x$ triệu đồng.\nb) Lợi nhuận $P(x) = -x^3 + 6x^2 + 4x - 10$.\nc) Lợi nhuận cực đại khi $x = 4$.\nd) Lợi nhuận cực đại bằng $22$ triệu đồng.', dapAn:'Đ Đ Đ Đ' },
    { mucDo:'TH', phan:'ds', noiDung:'Bể chứa nước dạng hộp chữ nhật không nắp, đáy vuông cạnh $a$ m, chiều cao $h$ m, thể tích $32$ m$^3$. Xét các phát biểu:\na) $h = \\dfrac{32}{a^2}$ m.\nb) Diện tích vật liệu $S = a^2 + 4ah$.\nc) $S = a^2 + \\dfrac{128}{a}$.\nd) $S$ nhỏ nhất khi $a = 4$.', dapAn:'Đ Đ Đ Đ' },
    { mucDo:'VD', phan:'ds', noiDung:'Nhà đầu tư đầu tư với lãi suất $10\\%$/năm (lãi kép). Sau $n$ năm thu được $A = P(1{,}1)^n$. Xét các phát biểu:\na) Sau $10$ năm, số tiền tăng gấp khoảng $2{,}59$ lần.\nb) Cần khoảng $7$ năm để tiền tăng gấp đôi.\nc) Sau $20$ năm, $100$ triệu tăng lên khoảng $672$ triệu.\nd) Tốc độ tăng trưởng là hàm bậc nhất của $n$.', dapAn:'Đ Đ Đ S' },
    { mucDo:'TH', phan:'ds', noiDung:'Xác suất để học sinh giải đúng bài A là $0{,}7$ và bài B là $0{,}6$. Hai sự kiện độc lập. Xét các phát biểu:\na) Xác suất giải đúng cả hai: $P = 0{,}42$.\nb) Xác suất giải đúng ít nhất một bài: $P = 0{,}88$.\nc) Xác suất không giải đúng bài nào: $P = 0{,}12$.\nd) Xác suất giải đúng đúng một bài: $P = 0{,}46$.', dapAn:'Đ Đ Đ Đ' },
    { mucDo:'VD', phan:'ds', noiDung:'Hộp chứa $5$ bi đỏ và $3$ bi xanh. Rút ngẫu nhiên $2$ bi. Xét các phát biểu:\na) Số cách rút $2$ bi là $C_8^2 = 28$.\nb) Xác suất để cả $2$ đỏ: $P = \\dfrac{5}{14}$.\nc) Xác suất để cả $2$ xanh: $P = \\dfrac{3}{28}$.\nd) Xác suất để hai bi khác màu: $P = \\dfrac{15}{28}$.', dapAn:'Đ Đ Đ Đ' },
    { mucDo:'VD', phan:'ds', noiDung:'Người thợ làm $3$ sản phẩm, xác suất mỗi sản phẩm đạt chuẩn là $0{,}8$. Xét các phát biểu:\na) Xác suất cả $3$ đạt chuẩn: $P = 0{,}512$.\nb) Xác suất không có sản phẩm nào đạt chuẩn: $P = 0{,}008$.\nc) Xác suất đúng $2$ sản phẩm đạt chuẩn: $P = 0{,}384$.\nd) Xác suất ít nhất $1$ sản phẩm đạt chuẩn: $P = 0{,}992$.', dapAn:'Đ Đ Đ Đ' },
    { mucDo:'VDC', phan:'ds', noiDung:'Nhà hàng có $2$ loại đèn: Loại A chiếm $60\\%$ (hỏng $2\\%$), Loại B chiếm $40\\%$ (hỏng $5\\%$). Xét các phát biểu:\na) Xác suất một đèn bất kỳ bị hỏng: $P = 0{,}032$.\nb) Nếu biết đèn hỏng, xác suất đó là loại B: $P \\approx 0{,}625$.\nc) Trong $1000$ đèn, kỳ vọng số đèn hỏng là $32$.\nd) Loại B có xác suất hỏng cao hơn loại A.', dapAn:'Đ Đ Đ Đ' },
    { mucDo:'NB', phan:'ds', noiDung:'Hàm số $f(x) = x^3 - 3x^2 - 9x + 5$ mô tả lợi nhuận (triệu đồng) theo thời gian $x$ (tháng). Xét các phát biểu:\na) $f\'(x) = 3x^2 - 6x - 9$.\nb) $f\'(x) = 0$ có nghiệm $x = 3$ và $x = -1$.\nc) Lợi nhuận đạt cực tiểu cục bộ tại $x = 3$.\nd) Lợi nhuận đang tăng khi $x > 3$.', dapAn:'Đ Đ Đ Đ' },
    { mucDo:'NB', phan:'ds', noiDung:'Người đi xe máy từ A đến B cách $120$ km. Nếu tăng vận tốc thêm $10$ km/h thì đến sớm hơn $1$ giờ. Gọi $v$ là vận tốc dự định. Xét các phát biểu:\na) Thời gian dự định: $t_1 = \\dfrac{120}{v}$ giờ.\nb) Thời gian thực tế: $t_2 = \\dfrac{120}{v+10}$ giờ.\nc) Phương trình: $\\dfrac{120}{v} - \\dfrac{120}{v+10} = 1$.\nd) Vận tốc dự định là $v = 30$ km/h.', dapAn:'Đ Đ Đ Đ' },
    { mucDo:'VD', phan:'ds', noiDung:'Một vật chuyển động theo $x(t) = t^3 - 6t^2 + 9t$ (m), $t \\geq 0$ (giây). Xét các phát biểu:\na) Vận tốc $v(t) = 3t^2 - 12t + 9$.\nb) Vật dừng tại $t = 1$ và $t = 3$.\nc) Vật chuyển động ngược chiều dương khi $1 < t < 3$.\nd) Quãng đường vật đi được trong $3$ giây đầu là $9$ m.', dapAn:'Đ Đ Đ S' },
    { mucDo:'TH', phan:'ds', noiDung:'Cửa hàng bán điện thoại: giá bán $p$ triệu, lượng bán $q = 200 - 10p$ chiếc, chi phí $5$ triệu/chiếc. Xét các phát biểu:\na) Doanh thu $R(p) = 200p - 10p^2$.\nb) Lợi nhuận $P(p) = (p-5)(200-10p)$.\nc) Lợi nhuận lớn nhất khi $p = 15$ triệu đồng.\nd) Lợi nhuận lớn nhất bằng $1000$ triệu đồng.', dapAn:'Đ Đ Đ Đ' },
    { mucDo:'TH', phan:'ds', noiDung:'Cấp số cộng $(u_n)$: $u_1 = 2$, $d = 3$. Người tiết kiệm tháng $n$ để dành $u_n$ triệu. Xét các phát biểu:\na) $u_n = 3n - 1$.\nb) Tháng $10$ để dành $29$ triệu.\nc) Tổng $10$ tháng đầu là $155$ triệu.\nd) Tổng $12$ tháng đầu là $210$ triệu.', dapAn:'Đ Đ Đ S' },
    { mucDo:'VDC', phan:'ds', noiDung:'Dân số tỉnh năm $2000$: $1{,}5$ triệu, tăng $2\\%$/năm. Xét các phát biểu:\na) Dân số sau $n$ năm: $N(n) = 1{,}5 \\cdot (1{,}02)^n$ triệu.\nb) Năm $2010$, dân số khoảng $1{,}83$ triệu.\nc) Dân số tăng gấp đôi sau khoảng $35$ năm.\nd) Năm $2035$, dân số vượt $3$ triệu.', dapAn:'Đ Đ Đ S' },
    { mucDo:'VD', phan:'ds', noiDung:'Khách sạn $100$ phòng, giá $x$ trăm nghìn/đêm, số phòng thuê $= 100 - x$, chi phí $20$ trăm nghìn/phòng. Xét các phát biểu:\na) Doanh thu $R(x) = x(100-x)$.\nb) Chi phí $C(x) = 20(100-x)$.\nc) Lợi nhuận $P(x) = (x-20)(100-x)$.\nd) Lợi nhuận lớn nhất khi $x = 60$, bằng $1600$ (trăm nghìn).', dapAn:'Đ Đ Đ Đ' },
    { mucDo:'VD', phan:'ds', noiDung:'Sản lượng pin mặt trời: $E(t) = -0{,}1t^2 + 1{,}2t$ (kWh), $0 \\leq t \\leq 12$. Xét các phát biểu:\na) Sản lượng lớn nhất tại $t = 6$ (giữa trưa) bằng $3{,}6$ kWh.\nb) $E(0) = 0$ và $E(12) = 0$.\nc) Tổng sản lượng $\\displaystyle\\int_0^{12} E(t)\\,dt = 28{,}8$ kWh.\nd) Sản lượng bằng $0$ chỉ tại $t = 0$.', dapAn:'Đ Đ S S' },
    { mucDo:'VDC', phan:'ds', noiDung:'Xí nghiệp may có $2$ máy độc lập. Máy I hoạt động tốt: $P = 0{,}9$; Máy II: $P = 0{,}85$. Xét các phát biểu:\na) Xác suất cả $2$ tốt: $P = 0{,}765$.\nb) Xác suất ít nhất $1$ máy hỏng: $P = 0{,}235$.\nc) Xác suất đúng $1$ máy hỏng: $P = 0{,}22$.\nd) Xác suất cả $2$ máy hỏng: $P = 0{,}015$.', dapAn:'Đ Đ S Đ' },
    { mucDo:'VD', phan:'ds', noiDung:'Một quả bóng cao su nảy từ độ cao $H = 4$ m. Mỗi lần nảy, quả bóng đạt độ cao bằng $\\dfrac{3}{4}$ lần trước đó. Xét các phát biểu:\na) Độ cao lần nảy thứ $1$: $h_1 = 3$ m.\nb) Dãy độ cao $h_1, h_2, h_3, \\ldots$ là cấp số nhân với $q = \\dfrac{3}{4}$.\nc) Tổng quãng đường bóng đi được là hữu hạn.\nd) Tổng quãng đường bóng đi (kể cả lần đầu rơi): $28$ m.', dapAn:'Đ Đ Đ Đ' },
    { mucDo:'TH', phan:'ds', noiDung:'Bình nước hình nón (đỉnh xuống) $R = 10$ cm, $H = 20$ cm. Mực nước ở chiều cao $h$. Xét các phát biểu:\na) Bán kính mặt nước $r = \\dfrac{h}{2}$.\nb) Thể tích nước $V(h) = \\dfrac{\\pi h^3}{12}$.\nc) Khi $h = 12$, $V = 144\\pi$ cm$^3$.\nd) Chiều cao $h$ tăng $3$ lần thì thể tích tăng $9$ lần.', dapAn:'Đ Đ Đ S' },

    // === TLN - Trả lời ngắn bài toán thực tế ===
    { mucDo:'TH', phan:'tln', noiDung:'Anh A gửi $50$ triệu đồng vào ngân hàng với lãi suất $8\\%$/năm (lãi kép). Hỏi sau $3$ năm anh A nhận được bao nhiêu triệu đồng? (làm tròn đến hàng đơn vị)', dapAn:'$63$' },
    { mucDo:'TH', phan:'tln', noiDung:'Một bể bơi hình chữ nhật dài $25$ m, rộng $10$ m, sâu $1{,}5$ m. Tính thể tích nước (m$^3$) khi bể đầy.', dapAn:'$375$' },
    { mucDo:'TH', phan:'tln', noiDung:'Lượng nước chảy vào bể theo công thức $V(t) = 2t^2 + 3t$ (lít), $t$ tính bằng phút. Tính lưu lượng nước tại thời điểm $t = 5$ phút (lít/phút).', dapAn:'$23$' },
    { mucDo:'TH', phan:'tln', noiDung:'Nhiệt độ (°C) tại một thành phố trong ngày được mô tả bởi $T(t) = -t^2 + 12t + 15$, $t$ tính bằng giờ ($0 \\leq t \\leq 12$). Nhiệt độ cao nhất trong ngày là bao nhiêu?', dapAn:'$51$' },
    { mucDo:'VD', phan:'tln', noiDung:'Một công ty dự kiến doanh thu (triệu đồng) theo hàm $R(x) = -2x^2 + 120x - 400$, trong đó $x$ là số sản phẩm (nghìn cái). Tìm giá trị $x$ để doanh thu lớn nhất.', dapAn:'$30$' },
    { mucDo:'VD', phan:'tln', noiDung:'Một quả bóng được ném lên cao với chiều cao $h(t) = -5t^2 + 20t + 1$ (m), $t$ tính bằng giây. Hỏi quả bóng đạt độ cao lớn nhất là bao nhiêu mét?', dapAn:'$21$' },
    { mucDo:'VD', phan:'tln', noiDung:'Chi phí sản xuất $x$ sản phẩm (triệu đồng): $C(x) = x^3 - 6x^2 + 15x + 10$. Tính chi phí biên khi sản xuất sản phẩm thứ $4$ (triệu đồng).', dapAn:'$15$' },
    { mucDo:'VD', phan:'tln', noiDung:'Lượng mưa (mm) trong $6$ giờ được mô tả bởi $f(t) = 3t - 0{,}5t^2$ ($0 \\leq t \\leq 6$). Tính tổng lượng mưa $\\displaystyle\\int_0^6 f(t)\\,dt$ (mm).', dapAn:'$18$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Anh B vay $500$ triệu mua nhà, lãi suất $0{,}65\\%$/tháng (lãi kép). Mỗi tháng trả đều $a$ triệu. Tìm $a$ (triệu, làm tròn hàng đơn vị) để trả hết trong $20$ năm ($240$ tháng).', dapAn:'$4$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Một mảnh đất hình thang vuông có đáy lớn $20$ m, đáy nhỏ $12$ m, chiều cao $10$ m. Người ta xây hồ bơi hình chữ nhật lớn nhất trong mảnh đất. Tính diện tích hồ bơi (m$^2$).', dapAn:'$80$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Một lò phản ứng có nhiệt độ thay đổi theo $T(t) = 200 + 300e^{-0{,}1t}$ (°C). Khi $t \\to +\\infty$, nhiệt độ ổn định ở bao nhiêu °C?', dapAn:'$200$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Số vi khuẩn trong phòng thí nghiệm tăng theo $N(t) = 1000 \\cdot 2^{t/3}$ (con), $t$ tính bằng giờ. Sau bao nhiêu giờ số vi khuẩn đạt $8000$? (giờ)', dapAn:'$9$' },
  ],
};
