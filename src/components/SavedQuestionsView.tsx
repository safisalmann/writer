import React, { useState, useMemo } from 'react';
import { 
  Bookmark, 
  Trash2, 
  Play, 
  HelpCircle, 
  BookOpen, 
  CheckCircle2, 
  ChevronRight,
  Eye,
  EyeOff
} from 'lucide-react';
import { Question, PracticeSessionConfig } from '../types';
import { getQuestionsByIds } from '../data/questions';
import { CHAPTERS } from '../data/chapters';

interface SavedQuestionsViewProps {
  savedQuestionIds: string[];
  toggleSaveQuestion: (qId: string) => void;
  onStartSession: (config: PracticeSessionConfig) => void;
}

export const SavedQuestionsView: React.FC<SavedQuestionsViewProps> = ({
  savedQuestionIds,
  toggleSaveQuestion,
  onStartSession
}) => {
  const [selectedChapterId, setSelectedChapterId] = useState<number | 'all'>('all');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  const savedQuestions = useMemo(() => {
    return getQuestionsByIds(savedQuestionIds);
  }, [savedQuestionIds]);

  const filteredQuestions = useMemo(() => {
    if (selectedChapterId === 'all') return savedQuestions;
    return savedQuestions.filter(q => q.chapterId === selectedChapterId);
  }, [savedQuestions, selectedChapterId]);

  const toggleReveal = (qId: string) => {
    setRevealedAnswers(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const handleStartRevisionSession = () => {
    const ids = filteredQuestions.map(q => q.id);
    if (ids.length === 0) return;

    onStartSession({
      mode: 'saved',
      title: 'কঠিন প্রশ্ন রিভিশন টেস্ট',
      subtitle: `মোট ${ids.length} টি সংরক্ষিত প্রশ্ন`,
      questionIds: ids
    });
  };

  const optionLabels = ['ক', 'খ', 'গ', 'ঘ'];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold mb-2">
            <Bookmark className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>রিভিশন হাব</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            কঠিন ও সংরক্ষিত প্রশ্নাবলী
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            অনুশীলনের সময় সেভ করা প্রশ্নগুলো এখানে জমা থাকে, যাতে পরীক্ষার আগে দ্রুত রিভিশন দেওয়া যায়
          </p>
        </div>

        {savedQuestions.length > 0 && (
          <button
            onClick={handleStartRevisionSession}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center space-x-2 shrink-0 cursor-pointer active:scale-95"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>সংরক্ষিত প্রশ্নগুলোর টেস্ট দিন ({filteredQuestions.length})</span>
          </button>
        )}
      </div>

      {savedQuestions.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto mb-4 border border-amber-100">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">কোনো প্রশ্ন সেভ করা নেই</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            MCQ অনুশীলনের সময় কোনো প্রশ্ন কঠিন মনে হলে উপরে বা নিচে থাকা <span className="font-bold text-amber-600">"Save for Later"</span> বাটনে চাপ দিন। সেগুলো এখানে জমা হবে।
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Chapter Filter Bar */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex items-center space-x-2 overflow-x-auto text-xs scrollbar-none">
            <button
              onClick={() => setSelectedChapterId('all')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors ${
                selectedChapterId === 'all'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              সব অধ্যায় ({savedQuestions.length})
            </button>
            {CHAPTERS.map(ch => {
              const count = savedQuestions.filter(q => q.chapterId === ch.id).length;
              if (count === 0) return null;
              return (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChapterId(ch.id)}
                  className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-colors ${
                    selectedChapterId === ch.id
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  অধ্যায় {ch.number}: {ch.nameBangla.slice(0, 10)}... ({count})
                </button>
              );
            })}
          </div>

          {/* Question Cards List */}
          <div className="space-y-4">
            {filteredQuestions.map((q, idx) => {
              const ch = CHAPTERS.find(c => c.id === q.chapterId);
              const isRevealed = revealedAnswers[q.id] || false;

              return (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:border-amber-300 transition-all space-y-3"
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="font-extrabold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                        অধ্যায় {q.chapterId}: {ch?.nameBangla}
                      </span>
                      {q.topic && (
                        <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                          {q.topic}
                        </span>
                      )}
                      {q.source && (
                        <span className="text-slate-400">[{q.source}]</span>
                      )}
                    </div>

                    <button
                      onClick={() => toggleSaveQuestion(q.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="সংরক্ষণ থেকে মুছুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Question */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 leading-snug">
                    <span className="text-amber-600 mr-2">প্রশ্ন {q.number}.</span>
                    {q.question}
                  </h3>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {q.options.map((opt, optIdx) => {
                      const isCorrect = optIdx === q.correctAnswer;
                      return (
                        <div
                          key={optIdx}
                          className={`p-3 rounded-xl border text-sm font-medium flex items-center justify-between ${
                            isRevealed && isCorrect
                              ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold'
                              : 'bg-slate-50/70 border-slate-200 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                              isRevealed && isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                            }`}>
                              {optionLabels[optIdx]}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isRevealed && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Reveal Answer Toggle */}
                  <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                    <button
                      onClick={() => toggleReveal(q.id)}
                      className="text-xs font-bold text-slate-600 hover:text-emerald-700 flex items-center space-x-1.5 py-1 px-2 rounded-lg hover:bg-slate-50 cursor-pointer"
                    >
                      {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{isRevealed ? 'সঠিক উত্তর লুকান' : 'সঠিক উত্তর দেখুন'}</span>
                    </button>

                    {isRevealed && (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                        সঠিক উত্তর: ({optionLabels[q.correctAnswer]}) {q.options[q.correctAnswer]}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
