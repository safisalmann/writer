import React, { useState, useMemo } from 'react';
import { Search, X, ChevronRight, Bookmark, CheckCircle2 } from 'lucide-react';
import { searchQuestions } from '../data/questions';
import { CHAPTERS } from '../data/chapters';
import { Question } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectQuestion: (question: Question) => void;
  isQuestionSaved: (id: string) => boolean;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectQuestion,
  isQuestionSaved
}) => {
  const [query, setQuery] = useState('');
  const [selectedChapterId, setSelectedChapterId] = useState<number | undefined>(undefined);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchQuestions(query, selectedChapterId).slice(0, 30);
  }, [query, selectedChapterId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-16 px-4">
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div className="p-4 border-b border-slate-100 flex items-center space-x-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-emerald-600 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="প্রশ্ন, বিষয় বা মূলশব্দ লিখুন (যেমন: মাইটোসিস, DNA, ক্লোরোপ্লাস্ট)..."
            className="w-full bg-transparent text-slate-800 placeholder-slate-400 focus:outline-hidden text-base font-medium"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs bg-slate-200 hover:bg-slate-300 text-slate-600 px-2 py-1 rounded-md font-semibold"
          >
            ESC
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2.5 bg-slate-100/60 border-b border-slate-100 flex items-center space-x-2 overflow-x-auto text-xs scrollbar-none">
          <button
            onClick={() => setSelectedChapterId(undefined)}
            className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
              selectedChapterId === undefined
                ? 'bg-emerald-600 text-white font-bold'
                : 'bg-white text-slate-600 hover:bg-slate-200'
            }`}
          >
            সকল অধ্যায়
          </button>
          {CHAPTERS.map(ch => (
            <button
              key={ch.id}
              onClick={() => setSelectedChapterId(ch.id)}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors ${
                selectedChapterId === ch.id
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-white text-slate-600 hover:bg-slate-200'
              }`}
            >
              অঃ {ch.number} ({ch.nameBangla.slice(0, 10)}...)
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 divide-y divide-slate-100">
          {query.trim() === '' ? (
            <div className="py-12 text-center text-slate-400">
              <Search className="w-10 h-10 mx-auto mb-2 opacity-30 text-emerald-500" />
              <p className="text-sm font-medium">যেকোনো প্রশ্ন বা বৈজ্ঞানিক শব্দ লিখে খুঁজুন</p>
              <p className="text-xs text-slate-400 mt-1">১২টি অধ্যায়ের মোট ১,৬৯১টি প্রশ্ন ডাটাবেজে উপলব্ধ</p>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <p className="text-sm font-semibold">কোনো প্রশ্ন পাওয়া যায়নি</p>
              <p className="text-xs text-slate-400 mt-1">বানান ঠিক আছে কিনা পরীক্ষা করুন বা ফিল্টার পরিবর্তন করুন</p>
            </div>
          ) : (
            results.map(q => {
              const ch = CHAPTERS.find(c => c.id === q.chapterId);
              const saved = isQuestionSaved(q.id);
              return (
                <div
                  key={q.id}
                  onClick={() => {
                    onSelectQuestion(q);
                    onClose();
                  }}
                  className="p-3 hover:bg-emerald-50/60 rounded-xl cursor-pointer transition-colors group flex items-start justify-between space-x-3"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 text-[11px] mb-1">
                      <span className="font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                        অঃ {q.chapterId} • {ch?.nameBangla}
                      </span>
                      {q.topic && (
                        <span className="text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                          {q.topic}
                        </span>
                      )}
                      {q.source && (
                        <span className="text-slate-400 text-[10px]">
                          [{q.source}]
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-slate-800 group-hover:text-emerald-900 leading-snug">
                      <span className="text-emerald-600 mr-1.5 font-bold">প্রশ্ন {q.number}.</span>
                      {q.question}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 shrink-0 pt-1">
                    {saved && (
                      <Bookmark className="w-4 h-4 text-amber-500 fill-amber-500" />
                    )}
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition-colors" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
