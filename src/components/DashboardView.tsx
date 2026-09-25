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
  Compass,
  Atom,
  FlaskConical,
  Dna,
  Sprout
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

  const scienceSubjects = [
    {
      id: 'botany',
      nameBangla: 'উদ্ভিদবিজ্ঞান (Botany)',
      subtitle: 'জীববিজ্ঞান ১ম পত্র',
      stats: '১২টি অধ্যায় • ১,৬৯১টি MCQ',
      status: 'active' as const,
      statusLabel: 'সম্পূর্ণ সক্রিয় (Live)',
      icon: <Sprout className="w-5 h-5 text-emerald-600" />,
      gradient: 'from-emerald-500/10 to-teal-500/10 border-emerald-300',
      tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      desc: 'কোষ ও এর গঠন থেকে জীবের পরিবেশ পর্যন্ত ১২টি অধ্যায়ের ধারাবাহিক MCQ সেট।'
    },
    {
      id: 'zoology',
      nameBangla: 'প্রাণিবিজ্ঞান (Zoology)',
      subtitle: 'জীববিজ্ঞান ২য় পত্র',
      stats: '১২টি অধ্যায় • মানব শারীরতত্ত্ব ও জিনতত্ত্ব',
      status: 'upcoming' as const,
      statusLabel: 'শীঘ্রই আসছে (In Pipeline)',
      icon: <Dna className="w-5 h-5 text-sky-600" />,
      gradient: 'from-sky-500/10 to-blue-500/10 border-sky-200',
      tagColor: 'bg-sky-100 text-sky-800 border-sky-200',
      desc: 'প্রাণীর বিভিন্নতা, রক্ত ও সংবহন, পরিপাক, শ্বসন এবং জিনতত্ত্বের বিশেষ প্রশ্নব্যাংক।'
    },
    {
      id: 'physics',
      nameBangla: 'পদার্থবিজ্ঞান (Physics)',
      subtitle: '১ম ও ২য় পত্র',
      stats: 'বলবিদ্যা, তড়িৎ, তরঙ্গ ও আধুনিক পদার্থবিজ্ঞান',
      status: 'upcoming' as const,
      statusLabel: 'শীঘ্রই আসছে (In Pipeline)',
      icon: <Atom className="w-5 h-5 text-indigo-600" />,
      gradient: 'from-indigo-500/10 to-violet-500/10 border-indigo-200',
      tagColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      desc: 'ভেক্টর, গতিবিদ্যা, তাপগতিবিদ্যা, আলো এবং চলতড়িৎ ভিত্তিক গাণিতিক ও ধারণামূলক MCQ।'
    },
    {
      id: 'chemistry',
      nameBangla: 'রসায়ন (Chemistry)',
      subtitle: '১ম ও ২য় পত্র',
      stats: 'জৈব রসায়ন, গুণগত ও পরিমাণগত রসায়ন',
      status: 'upcoming' as const,
      statusLabel: 'শীঘ্রই আসছে (In Pipeline)',
      icon: <FlaskConical className="w-5 h-5 text-amber-600" />,
      gradient: 'from-amber-500/10 to-orange-500/10 border-amber-200',
      tagColor: 'bg-amber-100 text-amber-800 border-amber-200',
      desc: 'পরমাণুর গঠন, পর্যায়বৃত্ত ধর্ম, রাসায়নিক পরিবর্তন এবং জৈব যৌগের বিক্রিয়া ভিত্তিক MCQ।'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-indigo-950 text-white p-6 sm:p-10 shadow-xl overflow-hidden border border-slate-700/50">
        {/* Abstract organic background glow */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-72 h-72 bg-sky-500/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>HSC ও মেডিকেল ভর্তি পরীক্ষার সম্পূর্ণ বিজ্ঞান প্রশ্নব্যাংক (Science Master)</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight sm:leading-snug">
            পদার্থ, রসায়ন, উদ্ভিদ ও প্রাণিবিজ্ঞান <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-sky-200 to-indigo-200">
              ধারাবাহিক MCQ অনুশীলন ও শতভাগ প্রস্তুতি
            </span>
          </h1>

          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
            বর্তমানে উদ্ভিদবিজ্ঞানের (Botany) ১২টি অধ্যায়ের সম্পূর্ণ ১,৬৯১টি প্রশ্ন নির্ভুল উত্তর চাবি সহ লাইভ রয়েছে। সাথে যুক্ত হচ্ছে প্রাণিবিজ্ঞান, পদার্থবিজ্ঞান ও রসায়নের অধ্যায়ভিত্তিক প্রশ্নব্যাংক।
          </p>

          {/* Quick Action CTA buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => handleStartChapterSet1(quickStartChapter)}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center space-x-2 active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>বোটানি অনুশীলন শুরু করুন (অধ্যায় ১)</span>
            </button>

            <button
              onClick={onNavigateSets}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-sm transition-all flex items-center space-x-2 cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              <span>MCQ সেটস ব্রাউজ করুন</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core Science Subjects Hub */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight flex items-center space-x-2">
              <span>বিজ্ঞান বিষয়সমূহ (Science Subjects)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              এইচএসসি ও মেডিকেল ভর্তি পরীক্ষার মূল চারটি বিজ্ঞান বিষয়ের প্রস্তুতি হাব
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {scienceSubjects.map(sub => (
            <div
              key={sub.id}
              onClick={() => {
                if (sub.status === 'active') {
                  onNavigateChapters();
                }
              }}
              className={`bg-white rounded-2xl p-5 border transition-all relative flex flex-col justify-between ${
                sub.status === 'active'
                  ? 'border-emerald-300 shadow-xs hover:shadow-md cursor-pointer ring-1 ring-emerald-200'
                  : 'border-slate-200/90 opacity-90'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-xs">
                    {sub.icon}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${sub.tagColor}`}>
                    {sub.statusLabel}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-800 text-base">
                  {sub.nameBangla}
                </h3>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">{sub.subtitle}</p>

                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {sub.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-600">
                  {sub.stats}
                </span>
                {sub.status === 'active' ? (
                  <span className="text-xs font-bold text-emerald-700 flex items-center space-x-1">
                    <span>প্রবেশ করুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    প্রস্তুতি চলছে
                  </span>
                )}
              </div>
            </div>
          ))}
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
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 mb-1">
              <Sprout className="w-3.5 h-3.5" />
              <span>উদ্ভিদবিজ্ঞান প্রশ্নব্যাংক (লাইভ)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight">
              ১২টি অধ্যায়ের ধারাবাহিক প্রশ্নব্যাংক
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              আপনার সুবিধাজনক অধ্যায় নির্বাচন করে ধারাবাহিক সেট বা একনজরে পুরো অধ্যায় অনুশীলন করুন
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
