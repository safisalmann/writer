import React from 'react';
import { 
  CheckCircle2, 
  Target, 
  Bookmark, 
  Layers, 
  Play, 
  ArrowRight, 
  BookOpen, 
  Sparkles,
  Trophy,
  Flame,
  Clock,
  Compass
} from 'lucide-react';
import { Chapter, PracticeSessionConfig } from '../types';
import { CHAPTERS } from '../data/chapters';
import { generateChapterSets } from '../data/questions';

interface DashboardViewProps {
  onStartSession: (config: PracticeSessionConfig) => void;
  onNavigateChapters: () => void;
  onNavigateSets: () => void;
  onNavigateSaved: () => void;
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
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onStartSession,
  onNavigateChapters,
  onNavigateSets,
  onNavigateSaved,
  stats,
  getChapterStats
}) => {
  // Find chapter with highest unfinished count or first chapter
  const quickStartChapter = CHAPTERS[0];

  const handleStartChapterSet1 = (chapter: Chapter) => {
    const sets = generateChapterSets(chapter.id);
    if (sets.length > 0) {
      onStartSession({
        mode: 'practice',
        chapterId: chapter.id,
        setId: sets[0].id,
        title: sets[0].title,
        subtitle: sets[0].description,
        questionIds: sets[0].questionIds
      });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white p-6 sm:p-10 shadow-xl overflow-hidden border border-emerald-700/40">
        {/* Abstract organic background glow */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-60 h-60 bg-teal-400/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>HSC ও মেডিকেল ভর্তি পরীক্ষার সম্পূর্ণ বোটানি প্রশ্নব্যাংক</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight sm:leading-snug">
            ধারাবাহিক MCQ অনুশীলনে <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200">
              উদ্ভিদবিজ্ঞানে শতভাগ প্রস্তুতি
            </span>
          </h1>

          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
            ১২টি অধ্যায়ের মোট ১,৬৯১টি প্রশ্ন সঠিক উত্তর চাবি সহ সাজানো রয়েছে। সেভ করে রাখুন কঠিন প্রশ্ন এবং ট্র্যাক করুন আপনার প্রস্তুতি।
          </p>

          {/* Quick Action CTA buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => handleStartChapterSet1(quickStartChapter)}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center space-x-2 active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>অনুশীলন শুরু করুন (অধ্যায় ১)</span>
            </button>

            <button
              onClick={onNavigateSets}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-sm transition-all flex items-center space-x-2 cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              <span>বোটানি সেটস ব্রাউজ করুন</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Answered */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-200 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">মোট সমাধান</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-800">
            {stats.answeredCount} <span className="text-xs font-medium text-slate-400">/ {stats.totalQuestions}</span>
          </div>
          <div className="mt-2 text-xs font-semibold text-emerald-700 flex items-center">
            <span>{stats.completionPercentage}% সম্পন্ন হয়েছে</span>
          </div>
        </div>

        {/* Overall Accuracy */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-teal-200 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">নির্ভুলতার হার</span>
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-teal-700">
            {stats.overallAccuracy}%
          </div>
          <div className="mt-2 text-xs font-semibold text-slate-500">
            সঠিক: {stats.correctCount} • ভুল: {stats.incorrectCount}
          </div>
        </div>

        {/* Difficult / Saved Questions */}
        <div 
          onClick={onNavigateSaved}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-amber-200 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 group-hover:text-amber-700">সেভ করা প্রশ্ন</span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Bookmark className="w-4 h-4 fill-amber-500 text-amber-500" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600">
            {stats.savedCount}
          </div>
          <div className="mt-2 text-xs font-semibold text-amber-700 flex items-center">
            <span>রিভিশন করতে ক্লিক করুন →</span>
          </div>
        </div>

        {/* Completed Sets */}
        <div 
          onClick={onNavigateSets}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-200 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 group-hover:text-indigo-700">সম্পূর্ণ সেট</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-indigo-700">
            {stats.completedSetsCount}
          </div>
          <div className="mt-2 text-xs font-semibold text-indigo-600 flex items-center">
            <span>ধারাবাহিক সেটস দেখুন →</span>
          </div>
        </div>
      </div>

      {/* 12 Botany Chapters Section */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight">
              ১২টি অধ্যায়ের প্রশ্নব্যাংক
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              আপনার সুবিধাজনক অধ্যায় নির্বাচন করে ধারাবাহিক অনুশীলন শুরু করুন
            </p>
          </div>

          <button
            onClick={onNavigateChapters}
            className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1 cursor-pointer"
          >
            <span>সব দেখুন</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Chapters Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CHAPTERS.map(ch => {
            const chStats = getChapterStats(ch.id, ch.totalQuestions);
            const sets = generateChapterSets(ch.id);

            return (
              <div
                key={ch.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                      অধ্যায় {ch.number}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      {ch.totalQuestions} প্রশ্ন
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-800 mt-2.5 group-hover:text-emerald-800 transition-colors">
                    {ch.nameBangla}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">{ch.nameEnglish}</p>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {ch.shortDesc}
                  </p>

                  {/* Progress Indicator */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="flex justify-between items-center text-xs font-semibold mb-1">
                      <span className="text-slate-500">সমাধান: {chStats.answered}/{ch.totalQuestions}</span>
                      <span className="text-emerald-700 font-bold">{chStats.progressPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-emerald-600 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${chStats.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="mt-5 pt-2 flex items-center gap-2">
                  <button
                    onClick={() => handleStartChapterSet1(ch)}
                    className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>সেট ১ শুরু করুন</span>
                  </button>

                  <button
                    onClick={() => {
                      onStartSession({
                        mode: 'practice',
                        chapterId: ch.id,
                        title: `${ch.nameBangla} (সম্পূর্ণ অধ্যায়)`,
                        subtitle: `সবগুলো প্রশ্ন ক্রমানুসারে (১-${ch.totalQuestions})`,
                        questionIds: Array.from({ length: ch.totalQuestions }, (_, i) => `ch${ch.id}_${i + 1}`)
                      });
                    }}
                    className="py-2 px-3 border border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                    title="পুরো অধ্যায় একটানা সমাধান করুন"
                  >
                    সবগুলো ({ch.totalQuestions})
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
