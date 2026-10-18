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
  EyeOff,
  Dna,
  Sprout
} from 'lucide-react';
import { Question, PracticeSessionConfig, Subject } from '../types';
import { getQuestionsByIds } from '../data/questions';
import { CHAPTERS as BOTANY_CHAPTERS } from '../data/chapters';
import { ZOOLOGY_CHAPTERS } from '../data/zoology_chapters';

interface SavedQuestionsViewProps {
  currentSubject?: Subject;
  savedQuestionIds: string[];
  toggleSaveQuestion: (qId: string) => void;
  onStartSession: (config: PracticeSessionConfig) => void;
}

export const SavedQuestionsView: React.FC<SavedQuestionsViewProps> = ({
  currentSubject,
  savedQuestionIds,
  toggleSaveQuestion,
  onStartSession
}) => {
  const [selectedChapterId, setSelectedChapterId] = useState<number | 'all'>('all');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<Subject | 'all'>('all');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  const savedQuestions = useMemo(() => {
    return getQuestionsByIds(savedQuestionIds);
  }, [savedQuestionIds]);

  const filteredQuestions = useMemo(() => {
    return savedQuestions.filter(q => {
      const isZoo = q.id.startsWith('zoo_') || q.subject === 'zoology';
      if (selectedSubjectFilter === 'zoology' && !isZoo) return false;
      if (selectedSubjectFilter === 'botany' && isZoo) return false;
      if (selectedChapterId !== 'all' && q.chapterId !== selectedChapterId) return false;
      return true;
    });
  }, [savedQuestions, selectedChapterId, selectedSubjectFilter]);

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
          {/* Subject & Chapter Filter Bar */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center space-x-1.5 pr-2 border-r border-slate-200">
              <button
                onClick={() => setSelectedSubjectFilter('all')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
                  selectedSubjectFilter === 'all'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                উভয় বিষয় ({savedQuestions.length})
              </button>
              <button
                onClick={() => setSelectedSubjectFilter('zoology')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-colors flex items-center space-x-1 cursor-pointer ${
                  selectedSubjectFilter === 'zoology'
                    ? 'bg-cyan-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Dna className="w-3 h-3" />
                <span>প্রাণিবিজ্ঞান</span>
              </button>
              <button
                onClick={() => setSelectedSubjectFilter('botany')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-colors flex items-center space-x-1 cursor-pointer ${
                  selectedSubjectFilter === 'botany'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Sprout className="w-3 h-3" />
                <span>উদ্ভিদবিজ্ঞান</span>
              </button>
            </div>

            <div className="flex items-center space-x-1.5 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setSelectedChapterId('all')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                  selectedChapterId === 'all' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                সকল অধ্যায়
              </button>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                <button
                  key={num}
                  onClick={() => setSelectedChapterId(num)}
                  className={`px-2 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                    selectedChapterId === num ? 'bg-slate-800 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  অঃ {num}
                </button>
              ))}
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-3">
            {filteredQuestions.map((q) => {
              const isZoo = q.id.startsWith('zoo_') || q.subject === 'zoology';
              const ch = isZoo 
                ? ZOOLOGY_CHAPTERS.find(c => c.id === q.chapterId) 
                : BOTANY_CHAPTERS.find(c => c.id === q.chapterId);
              const isRevealed = revealedAnswers[q.id] || false;

              return (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:border-amber-300 transition-all space-y-3"
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-wrap gap-1.5 text-xs">
                      <span className={`font-black px-2 py-0.5 rounded-md text-[11px] ${
                        isZoo ? 'bg-cyan-100 text-cyan-900' : 'bg-emerald-100 text-emerald-900'
                      }`}>
                        {isZoo ? 'প্রাণিবিজ্ঞান' : 'উদ্ভিদবিজ্ঞান'}
                      </span>
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
                          className={`p-3 rounded-xl border text-sm font-medium flex items-center space-x-2.5 transition-all ${
                            isRevealed
                              ? isCorrect
                                ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                                : 'bg-slate-50/60 border-slate-200 text-slate-600'
                              : 'bg-slate-50/40 border-slate-200/80 text-slate-700'
                          }`}
                        >
                          <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                            isRevealed && isCorrect
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-200 text-slate-700'
                          }`}>
                            {optionLabels[optIdx]}
                          </span>
                          <span>{opt}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Answer Reveal Toggle Bar */}
                  <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
                    <button
                      onClick={() => toggleReveal(q.id)}
                      className="text-amber-700 font-bold hover:text-amber-800 flex items-center space-x-1 cursor-pointer"
                    >
                      {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{isRevealed ? 'সঠিক উত্তর লুকান' : 'সঠিক উত্তর দেখুন'}</span>
                    </button>

                    {isRevealed && (
                      <span className="text-emerald-700 font-bold">
                        সঠিক উত্তর: {optionLabels[q.correctAnswer]} ({q.options[q.correctAnswer]})
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
