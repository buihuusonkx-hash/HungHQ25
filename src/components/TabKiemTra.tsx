import * as React from 'react';
import { useState } from 'react';
// @ts-ignore
import { motion, AnimatePresence } from 'motion/react';
// @ts-ignore
import { CheckCircle } from 'lucide-react';
// @ts-ignore
import { QUESTION_BANK, type QBankEntry } from '../questionBank';

interface Question {
  id: string;
  label: string;
  correctAnswer?: string;
  type?: string;
  level?: string;
  questionText?: string;
}

interface TabKiemTraProps {
  data: any[];
  countQuestions: (input: string) => number;
}

const TabKiemTra: React.FC<TabKiemTraProps> = ({ data, countQuestions }) => {
  const [showTest, setShowTest] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [resultVisible, setResultVisible] = useState(false);

  // Generate a flat list of question identifiers for input fields
  const generateQuestions = (): Question[] => {
    const questions: Question[] = [];
    data.forEach((chuong, cIdx) => {
      chuong.noiDungs.forEach((nd: any, nIdx: number) => {
        nd.mucDos.forEach((md: any, mIdx: number) => {
          const level = md.tenMucDo.toUpperCase().replace(' ', ''); // e.g., NHAN BIEt -> NB
          const types = ['nlc', 'ds', 'tln'];
          types.forEach((type) => {
            const raw = md.qs[type] || '';
            const tokens = raw
              .split(/[;,\s]+/)
              .filter((s: string) => s && s.match(/\d/))
              .map((s: string) => s.replace(/\D/g, ''));
            tokens.forEach((num: string) => {
              const id = `c${cIdx}_n${nIdx}_m${mIdx}_${type}_${num}`;
              const label = `Câu ${num}`;
              // Find a matching entry (first) for type and level
              const entry = Object.values(QUESTION_BANK)
                .flat()
                .find((e: QBankEntry) => e.phan === type && e.mucDo === level);
              const correct = entry ? entry.dapAn : undefined;
              const questionText = entry ? entry.noiDung : '';
              questions.push({ id, label, correctAnswer: correct, type, level, questionText });
            });
          });
        });
      });
    });
    return questions;
  };

  const questions = generateQuestions();

  const handleChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const computeScore = () => {
    // Compare user answers with stored correct answers
    let score = 0;
    questions.forEach((q) => {
      const userAns = (answers[q.id] || '').trim();
      if (userAns && q.correctAnswer && userAns.toLowerCase() === q.correctAnswer.toLowerCase()) {
        score++;
      }
    });
    return score;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Kiểm tra đề
        </h2>
        <button
          onClick={() => setShowTest((v) => !v)}
          className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-bold text-sm flex items-center hover:bg-indigo-700 transition-all shadow-md"
        >
          {showTest ? 'Ẩn bài kiểm tra' : 'Bắt đầu kiểm tra'}
        </button>
      </div>

      {/* Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 shadow">
          <h3 className="text-sm font-bold text-emerald-700 uppercase">Phần I: Trắc nghiệm</h3>
          <p className="text-xl font-black text-slate-900">{countQuestions('nlc')}</p>
        </div>
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 shadow">
          <h3 className="text-sm font-bold text-amber-700 uppercase">Phần II: Đúng/Sai</h3>
          <p className="text-xl font-black text-slate-900">{countQuestions('ds')}</p>
        </div>
        <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 shadow">
          <h3 className="text-sm font-bold text-rose-700 uppercase">Phần III: Trả lời ngắn</h3>
          <p className="text-xl font-black text-slate-900">{countQuestions('tln')}</p>
        </div>
      </div>

      <AnimatePresence>
        {showTest && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {questions.map((q) => (
  <div key={q.id} className="flex flex-col space-y-2">
    <label className="font-medium text-slate-700">{q.label}:</label>
    {q.questionText && <p className="text-sm text-slate-600">{q.questionText}</p>}
    <input
      type="text"
      className="flex-1 p-2 border border-slate-200 rounded-lg focus:border-indigo-500 outline-none"
      value={answers[q.id] || ''}
      onChange={(e) => handleChange(q.id, e.target.value)}
    />
  </div>
))}
            <button
              onClick={() => setResultVisible(true)}
              className="mt-4 px-6 py-3 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition"
            >
              Xem kết quả
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {resultVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="mt-6 p-6 bg-indigo-50 rounded-xl border border-indigo-100 shadow"
        >
          <h3 className="text-lg font-bold text-indigo-800 mb-2">
            <CheckCircle className="inline w-5 h-5 mr-2" /> Kết quả kiểm tra
          </h3>
          <p className="text-slate-700">
            Bạn đã trả lời đúng <span className="font-black text-indigo-800">{computeScore()}</span> câu.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TabKiemTra;
