import React, { useState } from 'react';
import { 
  BarChart3, 
  CheckCircle2, 
  XCircle, 
  Target, 
  Award, 
  Bookmark, 
  RotateCcw, 
  TrendingUp,
  AlertTriangle,
  Dna,
  Sprout
} from 'lucide-react';
import { CHAPTERS as BOTANY_CHAPTERS } from '../data/chapters';
import { ZOOLOGY_CHAPTERS } from '../data/zoology_chapters';
import { Subject } from '../types';

interface AnalyticsViewProps {
  currentSubject: Subject;
  onSelectSubject: (subject: Subject) => void;
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
  getChapterStats: (chapterId: number, total: number, subject?: Subject) => {
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
  currentSubject,
  onSelectSubject,
  stats,
  getChapterStats,
  resetAllProgress
}) => {
  const isZoology = currentSubject === 'zoology';
  const chapters = isZoology ? ZOOLOGY_CHAPTERS : BOTANY_CHAPTERS;

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
          <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold mb-2 ${
            isZoology ? 'bg-cyan-50 text-cyan-800 border border-cyan-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
          }`}>
            <BarChart3 className="w-3.5 h-3.5" />
            <span>প্রস্তুতি বিশ্লেষণ • {isZoology ? 'প্রাণিবিজ্ঞান' : 'উদ্ভিদবিজ্ঞান'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            অগ্রগতি ট্র্যাকার ও পরিসংখ্যান
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            আপনার সমাধান করা প্রশ্নের সংখ্যা, নির্ভুলতা এবং অধ্যায়ভিত্তিক পারফরম্যান্স
          </p>

          {/* Subject Switcher Tabs */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => onSelectSubject('zoology')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isZoology
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Dna className="w-3.5 h-3.5" />
              <span>প্রাণিবিজ্ঞান পরিসংখ্যান</span>
            </button>
            <button
              onClick={() => onSelectSubject('botany')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                !isZoology
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Sprout className="w-3.5 h-3.5" />
              <span>উদ্ভিদবিজ্ঞান পরিসংখ্যান</span>
            </button>
          </div>
        </div>

        {stats.answeredCount > 0 && (
          <button
            onClick={handleReset}
            className="px-4 py-2 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors flex items-center space-x-1.5 shrink-0 cursor-pointer self-start sm:self-center"
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
              className={`h-2 rounded-full transition-all duration-500 ${
                isZoology ? 'bg-cyan-600' : 'bg-emerald-600'
              }`}
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
          <div className="text-3xl font-black text-slate-800">
            {stats.overallAccuracy}%
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-3 overflow-hidden">
            <div 
              className="bg-teal-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${stats.overallAccuracy}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2 font-medium">
            মোট নির্ভুলতার অনুপাত
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-2">
            <span>ভুল উত্তরের সংখ্যা</span>
            <XCircle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-3xl font-black text-rose-600">
            {stats.incorrectCount}
          </div>
          <p className="text-xs text-slate-400 mt-5 font-medium">
            {stats.correctCount} টি সঠিক উত্তরের বিপরীতে
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-2">
            <span>সম্পন্ন MCQ সেটস</span>
            <Award className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-blue-700">
            {stats.completedSetsCount}
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
              {isZoology ? 'প্রাণিবিজ্ঞান (Zoology)' : 'উদ্ভিদবিজ্ঞান (Botany)'}: ১২টি অধ্যায়ের বিস্তারিত পারফরম্যান্স
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              অধ্যায়ভিত্তিক অগ্রগতি, সঠিক-ভুল উত্তরের অনুপাত ও নির্ভুলতার তালিকা
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {chapters.map(ch => {
            const chStats = getChapterStats(ch.id, ch.totalQuestions, currentSubject);
            return (
              <div 
                key={ch.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 text-xs mb-1">
                    <span className={`font-extrabold px-2 py-0.5 rounded-md ${
                      isZoology ? 'bg-cyan-100 text-cyan-900' : 'bg-emerald-100 text-emerald-900'
                    }`}>
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
                      {chStats.accuracy}% নির্ভুলতা
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
                    <div 
                      className={isZoology ? 'bg-cyan-600 h-2' : 'bg-emerald-600 h-2'} 
                      style={{ width: `${chStats.progressPercent}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                    <span className="text-emerald-600">{chStats.correct} সঠিক</span>
                    <span className="text-rose-500">{chStats.incorrect} ভুল</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
