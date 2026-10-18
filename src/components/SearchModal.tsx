import React, { useState, useMemo } from 'react';
import { Search, X, ChevronRight, Bookmark, CheckCircle2, Dna, Sprout } from 'lucide-react';
import { searchQuestions } from '../data/questions';
import { CHAPTERS as BOTANY_CHAPTERS } from '../data/chapters';
import { ZOOLOGY_CHAPTERS } from '../data/zoology_chapters';
import { Question, Subject } from '../types';

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
  const [subjectFilter, setSubjectFilter] = useState<Subject | 'all'>('all');
  const [selectedChapterId, setSelectedChapterId] = useState<number | undefined>(undefined);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const sub = subjectFilter === 'all' ? undefined : subjectFilter;
    return searchQuestions(query, selectedChapterId, sub).slice(0, 40);
  }, [query, selectedChapterId, subjectFilter]);

  if (!isOpen) return null;

  const currentChapters = subjectFilter === 'zoology' 
    ? ZOOLOGY_CHAPTERS 
    : subjectFilter === 'botany' 
      ? BOTANY_CHAPTERS 
      : [];

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
            placeholder="প্রশ্ন, বিষয় বা মূলশব্দ লিখুন (যেমন: হাইড্রা, নেফ্রন, মাইটোসিস, DNA)..."
            className="w-full bg-transparent text-slate-800 placeholder-slate-400 focus:outline-hidden text-base font-medium"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs bg-slate-200 hover:bg-slate-300 text-slate-600 px-2 py-1 rounded-md font-semibold cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2.5 bg-slate-100/60 border-b border-slate-100 flex items-center space-x-2 overflow-x-auto text-xs scrollbar-none">
          <button
            onClick={() => {
              setSubjectFilter('all');
              setSelectedChapterId(undefined);
            }}
            className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-colors cursor-pointer ${
              subjectFilter === 'all'
                ? 'bg-slate-800 text-white font-bold'
                : 'bg-white text-slate-600 hover:bg-slate-200'
            }`}
          >
            উভয় বিষয় (৩,০৬৮ MCQ)
          </button>
          <button
            onClick={() => {
              setSubjectFilter('zoology');
              setSelectedChapterId(undefined);
            }}
            className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-colors flex items-center space-x-1 cursor-pointer ${
              subjectFilter === 'zoology'
                ? 'bg-cyan-600 text-white font-bold'
                : 'bg-white text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Dna className="w-3 h-3" />
            <span>প্রাণিবিজ্ঞান (১,৩৪৬)</span>
          </button>
          <button
            onClick={() => {
              setSubjectFilter('botany');
              setSelectedChapterId(undefined);
            }}
            className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-colors flex items-center space-x-1 cursor-pointer ${
              subjectFilter === 'botany'
                ? 'bg-emerald-600 text-white font-bold'
                : 'bg-white text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Sprout className="w-3 h-3" />
            <span>উদ্ভিদবিজ্ঞান (১,৭২২)</span>
          </button>

          {currentChapters.length > 0 && (
            <div className="flex items-center space-x-1 pl-2 border-l border-slate-300">
              {currentChapters.map(ch => (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChapterId(selectedChapterId === ch.id ? undefined : ch.id)}
                  className={`px-2 py-0.5 rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                    selectedChapterId === ch.id
                      ? 'bg-slate-900 text-white font-bold'
                      : 'bg-white/80 text-slate-600 hover:bg-white'
                  }`}
                >
                  অঃ {ch.number}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 divide-y divide-slate-100">
          {query.trim() === '' ? (
            <div className="py-12 text-center text-slate-400">
              <Search className="w-10 h-10 mx-auto mb-2 opacity-30 text-emerald-500" />
              <p className="text-sm font-medium">যেকোনো প্রশ্ন বা বৈজ্ঞানিক শব্দ লিখে খুঁজুন</p>
              <p className="text-xs text-slate-400 mt-1">প্রাণিবিজ্ঞান ও উদ্ভিদবিজ্ঞানের মোট ৩,০৬৮টি প্রশ্ন ডাটাবেজে উপলব্ধ</p>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <p className="text-sm font-semibold">কোনো প্রশ্ন পাওয়া যায়নি</p>
              <p className="text-xs text-slate-400 mt-1">অন্য কোনো শব্দ দিয়ে খুঁজুন বা ফিল্টার পরিবর্তন করুন</p>
            </div>
          ) : (
            results.map(q => {
              const isZoo = q.id.startsWith('zoo_') || q.subject === 'zoology';
              const ch = isZoo 
                ? ZOOLOGY_CHAPTERS.find(c => c.id === q.chapterId) 
                : BOTANY_CHAPTERS.find(c => c.id === q.chapterId);
              const isSaved = isQuestionSaved(q.id);

              return (
                <div
                  key={q.id}
                  onClick={() => {
                    onSelectQuestion(q);
                    onClose();
                  }}
                  className="p-3.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group flex items-start justify-between gap-3"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2 text-[11px]">
                      <span className={`px-1.5 py-0.2 rounded font-bold ${
                        isZoo ? 'bg-cyan-100 text-cyan-900' : 'bg-emerald-100 text-emerald-900'
                      }`}>
                        {isZoo ? 'প্রাণিবিজ্ঞান' : 'উদ্ভিদবিজ্ঞান'}
                      </span>
                      <span className="font-bold text-slate-700 bg-slate-100 px-1.5 py-0.2 rounded">
                        অধ্যায় {q.chapterId}: {ch?.nameBangla}
                      </span>
                      {q.topic && (
                        <span className="text-slate-400">
                          • {q.topic}
                        </span>
                      )}
                      {q.source && (
                        <span className="text-slate-400">
                          [{q.source}]
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors line-clamp-2">
                      <span className="text-emerald-600 mr-1.5 font-bold">#{q.number}</span>
                      {q.question}
                    </h4>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0 self-center">
                    {isSaved && (
                      <Bookmark className="w-4 h-4 fill-amber-500 text-amber-500" />
                    )}
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        {results.length > 0 && (
          <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-500 font-medium">
            সর্বমোট {results.length} টি ফলাফল প্রদর্শিত হচ্ছে • যেকোনো প্রশ্নে ক্লিক করে সরাসরি অনুশীলন শুরু করুন
          </div>
        )}
      </div>
    </div>
  );
};
