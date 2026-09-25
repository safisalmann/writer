import React from 'react';
import { 
  BarChart3, 
  CheckCircle2, 
  XCircle, 
  Target, 
  Award, 
  Bookmark, 
  RotateCcw, 
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { CHAPTERS } from '../data/chapters';

interface AnalyticsViewProps {
  stats: {
    totalQuestions: number;
    answeredCount: number;
    correctCount: number;
    incorrectCount: number;
    overallAccuracy: number;
    completionPercentage: number;
    savedCount: number;
    completedSetsCount: number;
  };
  getChapterStats: (chapterId: number, total: number) => {
    answered: number;
    correct: number;
    incorrect: number;
    accuracy: number;
    progressPercent: number;
    total: number;
  };
  resetAllProgress: () => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  stats,
  getChapterStats,
  resetAllProgress
}) => {
  const handleReset = () => {
    if (confirm('আপনি কি নিশ্চিত যে আপনার সমস্ত MCQ অনুশীলনের অগ্রগতি এবং উত্তর রিসেট করতে চান? এই ক্রিয়াটি পূর্বাবস্থায় ফেরানো যাবে না।')) {
      resetAllProgress();
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>প্রস্তুতি বিশ্লেষণ</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            অগ্রগতি ট্র্যাকার ও পরিসংখ্যান
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            আপনার সমাধান করা প্রশ্নের সংখ্যা, নির্ভুলতা এবং অধ্যায়ভিত্তিক দক্ষতা বিশ্লেষণ
          </p>
        </div>

        {stats.answeredCount > 0 && (
          <button
            onClick={handleReset}
            className="px-4 py-2 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors flex items-center space-x-1.5 shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>অগ্রগতি রিসেট করুন</span>
          </button>
        )}
      </div>

      {/* Main Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-2">
            <span>সামগ্রিক সম্পূর্ণতা</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-800">
            {stats.completionPercentage}%
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-3 overflow-hidden">
            <div 
              className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${stats.completionPercentage}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2 font-medium">
            {stats.answeredCount} / {stats.totalQuestions} প্রশ্ন সমাধান
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-2">
            <span>সঠিক উত্তরের হার</span>
            <Target className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-3xl font-black text-teal-700">
            {stats.overallAccuracy}%
          </div>
          <p className="text-xs text-slate-400 mt-5 font-medium">
            মোট সঠিক: {stats.correctCount} • ভুল: {stats.incorrectCount}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-2">
            <span>সেভ করা কঠিন প্রশ্ন</span>
            <Bookmark className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-3xl font-black text-amber-600">
            {stats.savedCount} টি
          </div>
          <p className="text-xs text-slate-400 mt-5 font-medium">
            রিভিশন তালিকায় রক্ষিত প্রশ্ন
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-2">
            <span>সম্পূর্ণ MCQ সেট</span>
            <Award className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-3xl font-black text-indigo-700">
            {stats.completedSetsCount} টি
          </div>
          <p className="text-xs text-slate-400 mt-5 font-medium">
            ধারাবাহিক সেট সম্পন্ন হয়েছে
          </p>
        </div>
      </div>

      {/* Chapter Breakdown Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-slate-800">
              ১২টি অধ্যায়ের বিস্তারিত পারফরম্যান্স
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              অধ্যায়ভিত্তিক অগ্রগতি ও নির্ভুলতার তালিকা
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {CHAPTERS.map(ch => {
            const chStats = getChapterStats(ch.id, ch.totalQuestions);
            return (
              <div 
                key={ch.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 text-xs mb-1">
                    <span className="font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                      অধ্যায় {ch.number}
                    </span>
                    <span className="text-slate-400 font-medium">
                      {ch.totalQuestions} প্রশ্ন
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-800">
                    {ch.nameBangla}
                  </h4>
                  <p className="text-xs text-slate-400">{ch.nameEnglish}</p>
                </div>

                {/* Progress Bar & Stats in row */}
                <div className="w-full sm:w-72">
                  <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
                    <span className="text-slate-500">
                      {chStats.answered} / {ch.totalQuestions} ({chStats.progressPercent}%)
                    </span>
                    <span className={`font-bold ${
                      chStats.accuracy >= 80 ? 'text-emerald-600' : chStats.accuracy >= 50 ? 'text-amber-600' : 'text-slate-500'
                    }`}>
                      {chStats.answered > 0 ? `${chStats.accuracy}% নির্ভুল` : 'শুরু হয়নি'}
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${chStats.progressPercent}%` }}
                    />
                  </div>

                  {chStats.answered > 0 && (
                    <div className="flex items-center space-x-3 text-[11px] font-medium text-slate-400 mt-1">
                      <span className="text-emerald-600 font-semibold">সঠিক: {chStats.correct}</span>
                      <span className="text-rose-600 font-semibold">ভুল: {chStats.incorrect}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
