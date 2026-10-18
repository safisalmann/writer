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
  Dna, 
  Sprout, 
  Atom, 
  FlaskConical 
} from 'lucide-react';
import { Chapter, PracticeSessionConfig, Subject } from '../types';
import { CHAPTERS as BOTANY_CHAPTERS } from '../data/chapters';
import { ZOOLOGY_CHAPTERS } from '../data/zoology_chapters';
import { generateChapterSets } from '../data/questions';

interface DashboardViewProps {
  currentSubject: Subject;
  onSelectSubject: (subject: Subject) => void;
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
  getChapterStats: (chapterId: number, total: number, subject?: Subject) => {
    answered: number;
    correct: number;
    incorrect: number;
    accuracy: number;
    progressPercent: number;
    total: number;
  };
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentSubject,
  onSelectSubject,
  onStartSession,
  onNavigateChapters,
  onNavigateSets,
  onNavigateSaved,
  stats,
  getChapterStats
}) => {
  const isZoology = currentSubject === 'zoology';
  const activeChapters = isZoology ? ZOOLOGY_CHAPTERS : BOTANY_CHAPTERS;
  const quickStartChapter = activeChapters[0];

  const handleStartChapterSet1 = (chapter: Chapter) => {
    const sets = generateChapterSets(chapter.id, currentSubject);
    if (sets.length > 0) {
      onStartSession({
        mode: 'practice',
        subject: currentSubject,
        chapterId: chapter.id,
        setId: sets[0].id,
        title: `${isZoology ? 'প্রাণিবিজ্ঞান' : 'উদ্ভিদবিজ্ঞান'}: ${sets[0].title}`,
        subtitle: sets[0].description,
        questionIds: sets[0].questionIds
      });
    }
  };

  const handleStartQuickSession = () => {
    if (quickStartChapter) {
      handleStartChapterSet1(quickStartChapter);
    }
  };

  const scienceSubjects = [
    {
      id: 'zoology' as const,
      nameBangla: 'প্রাণিবিজ্ঞান (Zoology)',
      subtitle: 'জীববিজ্ঞান ২য় পত্র',
      stats: '১২টি অধ্যায় • ১,৩৪৬টি MCQ',
      status: 'active' as const,
      statusLabel: 'সম্পূর্ণ সক্রিয় (Live)',
      icon: <Dna className="w-5 h-5 text-cyan-600" />,
      gradient: isZoology 
        ? 'from-cyan-500/15 to-blue-500/15 border-cyan-400 ring-2 ring-cyan-500/20' 
        : 'from-slate-50 to-cyan-50/40 border-slate-200 hover:border-cyan-300',
      tagColor: 'bg-cyan-100 text-cyan-900 border-cyan-200',
      desc: 'প্রাণীর বিভিন্নতা, ঘাসফড়িং ও রুই মাছ, মানব শারীরতত্ত্ব (পরিপাক, রক্ত, শ্বসন, বর্জ্য, চলন, স্নায়ু), প্রজনন, প্রতিরক্ষা, জিনতত্ত্ব ও বিবর্তন এবং আচরণ।'
    },
    {
      id: 'botany' as const,
      nameBangla: 'উদ্ভিদবিজ্ঞান (Botany)',
      subtitle: 'জীববিজ্ঞান ১ম পত্র',
      stats: '১২টি অধ্যায় • ১,৭২২টি MCQ',
      status: 'active' as const,
      statusLabel: 'সম্পূর্ণ সক্রিয় (Live)',
      icon: <Sprout className="w-5 h-5 text-emerald-600" />,
      gradient: !isZoology 
        ? 'from-emerald-500/15 to-teal-500/15 border-emerald-400 ring-2 ring-emerald-500/20' 
        : 'from-slate-50 to-emerald-50/40 border-slate-200 hover:border-emerald-300',
      tagColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
      desc: 'কোষ ও এর গঠন, কোষ বিভাজন, অণুজীব, শৈবাল ও ছত্রাক, ব্রায়োফাইটা, নগ্নবীজী ও আবৃতবীজী, টিস্যুতন্ত্র, শারীরতত্ত্ব, প্রজনন, প্রযুক্তি ও পরিবেশ।'
    },
    {
      id: 'physics' as const,
      nameBangla: 'পদার্থবিজ্ঞান (Physics)',
      subtitle: 'পদার্থবিজ্ঞান ১ম ও ২য় পত্র',
      stats: 'ভৌত জগৎ, গতিবিদ্যা, কাজ শক্তি ও তরঙ্গ',
      status: 'upcoming' as const,
      statusLabel: 'শীঘ্রই আসছে',
      icon: <Atom className="w-5 h-5 text-indigo-500" />,
      gradient: 'from-slate-50 to-indigo-50/30 border-slate-200 opacity-75',
      tagColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      desc: 'বলবিদ্যা, তাপগতিবিদ্যা, আলো, তড়িৎ ও আধুনিক পদার্থবিজ্ঞানের স্ট্যান্ডার্ড প্রশ্নব্যাংক।'
    },
    {
      id: 'chemistry' as const,
      nameBangla: 'রসায়ন (Chemistry)',
      subtitle: 'রসায়ন ১ম ও ২য় পত্র',
      stats: 'গুণগত রসায়ন, মৌলের পর্যায়বৃত্ত ও জৈব রসায়ন',
      status: 'upcoming' as const,
      statusLabel: 'শীঘ্রই আসছে',
      icon: <FlaskConical className="w-5 h-5 text-amber-500" />,
      gradient: 'from-slate-50 to-amber-50/30 border-slate-200 opacity-75',
      tagColor: 'bg-amber-50 text-amber-700 border-amber-200',
      desc: 'ল্যাবরেটরি নিরাপদ ব্যবহার, রাসায়নিক পরিবর্তন, জৈব যৌগ ও অর্থনৈতিক রসায়নের MCQ সিরিজ।'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Hero Banner */}
      <div className={`relative overflow-hidden rounded-3xl p-6 sm:p-10 text-white shadow-xl ${
        isZoology
          ? 'bg-gradient-to-r from-cyan-900 via-blue-900 to-indigo-950 shadow-cyan-950/20'
          : 'bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 shadow-emerald-950/20'
      }`}>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-bold mb-3 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>এইচএসসি ও মেডিকেল ভর্তি পরীক্ষা স্পেশাল</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            {isZoology ? 'প্রাণিবিজ্ঞান (Zoology)' : 'উদ্ভিদবিজ্ঞান (Botany)'} <br />
            <span className={isZoology ? 'text-cyan-300' : 'text-emerald-300'}>
              ১২টি অধ্যায়ের ধারাবাহিক প্রশ্নব্যাংক
            </span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
            {isZoology ? (
              <>প্রাণিবিজ্ঞানের ১২টি অধ্যায়ে <strong>১,৩৪৬টি</strong> মানসম্মত MCQ প্রশ্ন সঠিক উত্তর চাবি ও টপিকসহ প্রস্তুত। অধ্যায়ভিত্তিক ও সেটভিত্তিক অনুশীলন করুন।</>
            ) : (
              <>উদ্ভিদবিজ্ঞানের ১২টি অধ্যায়ে <strong>১,৭২২টি</strong> মানসম্মত MCQ প্রশ্ন সঠিক উত্তর চাবি ও টপিকসহ প্রস্তুত।</>
            )}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={handleStartQuickSession}
              className="px-6 py-3 bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-2xl shadow-lg transition-all flex items-center space-x-2 cursor-pointer active:scale-95"
            >
              <Play className="w-4 h-4 fill-slate-900" />
              <span>অনুশীলন শুরু করুন (অধ্যায় ১)</span>
            </button>

            <button
              onClick={onNavigateChapters}
              className="px-5 py-3 bg-white/15 hover:bg-white/25 text-white font-bold rounded-2xl backdrop-blur-md border border-white/20 transition-all flex items-center space-x-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>১২টি অধ্যায় ব্রাউজ করুন</span>
            </button>
          </div>
        </div>

        {/* Decorative Background Graphics */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-12 top-10 hidden md:block opacity-20">
          {isZoology ? (
            <Dna className="w-56 h-56 text-cyan-200" />
          ) : (
            <Sprout className="w-56 h-56 text-emerald-200" />
          )}
        </div>
      </div>

      {/* Subject Switcher Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight flex items-center space-x-2">
              <Compass className="w-5 h-5 text-indigo-600" />
              <span>বিষয় নির্বাচন করুন (Biology & Science Subjects)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              প্রাণিবিজ্ঞান ও উদ্ভিদবিজ্ঞান দুটোই লাইভ। যেকোনো বিষয়ে ক্লিক করে অনুশীলন শুরু করুন।
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {scienceSubjects.map((sub) => {
            const isSelected = sub.id === currentSubject;
            const isClickable = sub.status === 'active';

            return (
              <div
                key={sub.id}
                onClick={() => {
                  if (isClickable) {
                    onSelectSubject(sub.id as Subject);
                  }
                }}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${sub.gradient} ${
                  isClickable ? 'cursor-pointer hover:shadow-md' : 'cursor-not-allowed'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-slate-200/60 flex items-center justify-center">
                      {sub.icon}
                    </div>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${sub.tagColor}`}>
                      {sub.statusLabel}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-800">
                    {sub.nameBangla}
                  </h3>
                  <div className="text-xs font-semibold text-slate-500 mt-0.5">
                    {sub.subtitle}
                  </div>
                  <div className="text-xs font-bold text-slate-700 mt-1">
                    {sub.stats}
                  </div>

                  <p className="text-xs text-slate-500 mt-2 font-normal line-clamp-3">
                    {sub.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold">
                  {isClickable ? (
                    isSelected ? (
                      <span className={isZoology ? 'text-cyan-700 flex items-center space-x-1' : 'text-emerald-700 flex items-center space-x-1'}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>বর্তমানে সক্রিয়</span>
                      </span>
                    ) : (
                      <span className="text-slate-600 hover:text-slate-900 flex items-center space-x-1">
                        <span>সুইচ করুন</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    )
                  ) : (
                    <span className="text-slate-400">শিগগিরই যুক্ত হবে</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Subject Statistics Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-2">
            <span>{isZoology ? 'প্রাণিবিজ্ঞান' : 'উদ্ভিদবিজ্ঞান'} সম্পূর্ণতা</span>
            <Target className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-800">
            {stats.completionPercentage}%
          </div>
          <div className="text-xs text-slate-400 mt-1 font-medium">
            {stats.answeredCount} / {stats.totalQuestions} প্রশ্ন সম্পন্ন
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-2">
            <span>সঠিক উত্তরের হার</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700">
            {stats.overallAccuracy}%
          </div>
          <div className="text-xs text-slate-400 mt-1 font-medium">
            {stats.correctCount} সঠিক • {stats.incorrectCount} ভুল
          </div>
        </div>

        <div 
          onClick={onNavigateSaved}
          className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-amber-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-2">
            <span>সেভ করা প্রশ্ন</span>
            <Bookmark className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600 group-hover:scale-105 transition-transform origin-left">
            {stats.savedCount}
          </div>
          <div className="text-xs text-slate-400 mt-1 font-medium flex items-center justify-between">
            <span>রিভিশন টেস্ট দিন</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-500 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div 
          onClick={onNavigateSets}
          className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-cyan-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-2">
            <span>সম্পন্ন সেট সংখ্যা</span>
            <Layers className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-blue-700 group-hover:scale-105 transition-transform origin-left">
            {stats.completedSetsCount}
          </div>
          <div className="text-xs text-slate-400 mt-1 font-medium flex items-center justify-between">
            <span>সব সেট দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-600 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Featured Chapters Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-800 tracking-tight">
              {isZoology ? 'প্রাণিবিজ্ঞান' : 'উদ্ভিদবিজ্ঞান'}: অধ্যায়সমূহ ({activeChapters.length}টি)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              যেকোনো অধ্যায়ের ওপর ক্লিক করে সরাসরি অনুশীলন শুরু করুন
            </p>
          </div>
          <button
            onClick={onNavigateChapters}
            className="text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition-colors cursor-pointer flex items-center space-x-1"
          >
            <span>সব অধ্যায় দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeChapters.map(ch => {
            const chStats = getChapterStats(ch.id, ch.totalQuestions, currentSubject);
            const sets = generateChapterSets(ch.id, currentSubject);

            return (
              <div
                key={ch.id}
                onClick={() => handleStartChapterSet1(ch)}
                className={`bg-white rounded-2xl p-5 border shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between ${
                  isZoology ? 'border-slate-200/90 hover:border-cyan-400' : 'border-slate-200/90 hover:border-emerald-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[11px] font-black px-2 py-0.5 rounded-md ${
                      isZoology ? 'bg-cyan-100 text-cyan-900' : 'bg-emerald-100 text-emerald-900'
                    }`}>
                      অধ্যায় {ch.number}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">
                      {ch.totalQuestions} প্রশ্ন • {sets.length} সেট
                    </span>
                  </div>

                  <h3 className={`font-extrabold text-base text-slate-800 transition-colors ${
                    isZoology ? 'group-hover:text-cyan-700' : 'group-hover:text-emerald-700'
                  }`}>
                    {ch.nameBangla}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">{ch.nameEnglish}</p>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {ch.shortDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="flex justify-between items-center text-xs font-semibold mb-1">
                    <span className="text-slate-400">অগ্রগতি</span>
                    <span className={`font-bold ${isZoology ? 'text-cyan-700' : 'text-emerald-700'}`}>
                      {chStats.progressPercent}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        isZoology ? 'bg-cyan-600' : 'bg-emerald-600'
                      }`}
                      style={{ width: `${chStats.progressPercent}%` }}
                    />
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
