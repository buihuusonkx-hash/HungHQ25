import * as React from 'react';
import { useState, useEffect } from 'react';
// @ts-ignore
import { motion, AnimatePresence } from 'motion/react';
// @ts-ignore
import { QUESTION_BANK, type QBankEntry } from '../questionBank';

// Dummy data structure mimicking the matrix data used in TabKiemTra
const dummyData = [
  {
    noiDungs: [
      {
        mucDos: [
          {
            tenMucDo: 'NB',
            qs: { nlc: '1,2', ds: '1,2', tln: '1,2' },
          },
          {
            tenMucDo: 'TH',
            qs: { nlc: '3,4', ds: '3,4', tln: '3,4' },
          },
        ],
      },
    ],
  },
];

interface Question {
  id: string;
  label: string;
  correctAnswer?: string;
  type?: string;
  level?: string;
  questionText?: string;
}

const MockExamSimulation: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [simulationRunning, setSimulationRunning] = useState(false);

  // Generate a flat list of questions using the same logic as TabKiemTra
  const generateQuestions = (): Question[] => {
    const qs: Question[] = [];
    dummyData.forEach((chuong, cIdx) => {
      chuong.noiDungs.forEach((nd: any, nIdx: number) => {
        nd.mucDos.forEach((md: any, mIdx: number) => {
          const level = md.tenMucDo.toUpperCase().replace(' ', ''); // NB, TH, …
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
              const entry = Object.values(QUESTION_BANK)
                .flat()
                .find((e: QBankEntry) => e.phan === type && e.mucDo === level);
              const correct = entry ? entry.dapAn : undefined;
              const questionText = entry ? entry.noiDung : '';
              qs.push({ id, label, correctAnswer: correct, type, level, questionText });
            });
          });
        });
      });
    });
    return qs;
  };

  const startSimulation = () => {
    const generated = generateQuestions();
    setQuestions(generated);
    setSimulationRunning(true);
    setShowResult(false);
    setAnswers({});
  };

  // Auto‑fill answers after a short delay to simulate a user completing the test
  useEffect(() => {
    if (simulationRunning && questions.length > 0) {
      const timer = setTimeout(() => {
        const filled: Record<string, string> = {};
        questions.forEach((q) => {
          if (q.correctAnswer) {
            filled[q.id] = q.correctAnswer;
          }
        });
        setAnswers(filled);
        setShowResult(true);
        setSimulationRunning(false);
      }, 2000); // 2 seconds simulation delay
      return () => clearTimeout(timer);
    }
  }, [simulationRunning, questions]);

  const computeScore = () => {
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl"
    >
      <h2 className="text-3xl font-black text-slate-900 mb-6">Mô phỏng đề kiểm tra</h2>
      <button
        onClick={startSimulation}
        disabled={simulationRunning}
        className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition mb-4"
      >
        {simulationRunning ? 'Đang mô phỏng...' : 'Bắt đầu mô phỏng'}
      </button>

      <AnimatePresence>
        {questions.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {questions.map((q) => (
              <div key={q.id} className="flex flex-col space-y-2 mb-4">
                <label className="font-medium text-slate-700">{q.label}:</label>
                {q.questionText && <p className="text-sm text-slate-600">{q.questionText}</p>}
                <input
                  type="text"
                  className="flex-1 p-2 border border-slate-200 rounded-lg focus:border-indigo-500 outline-none"
                  value={answers[q.id] || ''}
                  readOnly
                />
              </div>
            ))}
            {showResult && (
              <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <h3 className="text-lg font-bold text-emerald-800 mb-2">Kết quả mô phỏng</h3>
                <p className="text-slate-700">
                  Bạn đã trả lời đúng <span className="font-black text-emerald-800">{computeScore()}</span>/{questions.length} câu.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MockExamSimulation;
