import * as React from 'react';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { QUESTION_BANK, type QBankEntry } from '../questionBank';

const SearchQuestion: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<QBankEntry | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    const lower = query.toLowerCase().trim();
    if (!lower) return;
    // Flatten all entries
    const allEntries: QBankEntry[] = Object.values(QUESTION_BANK).flat();
    // Find TLN entries containing the query
    const matches = allEntries.filter(
      (e) => e.phan === 'tln' && e.noiDung.toLowerCase().includes(lower)
    );
    if (matches.length > 0) {
      // Pick a random match to keep it fresh
      const chosen = matches[Math.floor(Math.random() * matches.length)];
      setResult(chosen);
      setNotFound(false);
    } else {
      // Fallback: any type containing the query
      const anyMatch = allEntries.find((e) => e.noiDung.toLowerCase().includes(lower));
      if (anyMatch) {
        setResult(anyMatch);
        setNotFound(false);
      } else {
        setResult(null);
        setNotFound(true);
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Tìm câu hỏi thực tế</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Nhập nội dung muốn tra cứu…"
          className="flex-1 p-3 border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Tìm
        </button>
      </div>
      {result && (
        <div className="mt-4 p-4 border border-slate-200 rounded-lg bg-slate-50">
          <p className="font-medium text-slate-700 mb-2">Câu hỏi:</p>
          <p className="text-sm mb-3" dangerouslySetInnerHTML={{ __html: result.noiDung }} />
          <p className="font-medium text-slate-700 mb-1">Đáp án ngắn (TLN):</p>
          <p className="text-sm font-semibold" dangerouslySetInnerHTML={{ __html: result.dapAn }} />
        </div>
      )}
      {notFound && <p className="text-red-500 mt-2">Không tìm thấy câu hỏi phù hợp.</p>}
    </div>
  );
};

export default SearchQuestion;
