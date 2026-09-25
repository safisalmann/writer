import React, { useState } from 'react';
import { 
  BookOpen, 
  Play, 
  Layers, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  Sparkles,
  HelpCircle,
  RotateCcw,
  Sprout,
  Dna,
  Atom,
  FlaskConical,
  Clock
} from 'lucide-react';
import { CHAPTERS } from '../data/chapters';
import { generateChapterSets } from '../data/questions';
import { Chapter, PracticeSessionConfig, MCQSet } from '../types';

interface ChaptersViewProps {
  onStartSession: (config: PracticeSessionConfig) => void;
  getChapterStats: (chapterId: number, total: number) => {
    answered: number;
    correct: number;
    incorrect: number;
    accuracy: number;
    progressPercent: number;
    total: number;
  };
  resetChapterProgress: (chapterId: number) => void;
}

export const ChaptersView: React.FC<ChaptersViewProps> = ({
  onStartSession,
  getChapterStats,
  resetChapterProgress
}) => {
  const [activeSubjectTab, setActiveSubjectTab] = useState<'botany' | 'zoology' | 'physics' | 'chemistry'>('botany');
  const [expandedChapterId, setExpandedChapterId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedChapterId(prev => prev === id ? null : id);
  };

  const handleStartSet = (ch: Chapter, set: MCQSet) => {
    onStartSession({
      mode: 'practice',
      chapterId: ch.id,
      setId: set.id,
      title: set.title,
      subtitle: set.description,
      questionIds: set.questionIds
    });
  };

  const handleStartFullChapter = (ch: Chapter) => {
    const qIds = Array.from({ length: ch.totalQuestions }, (_, i) => `ch${ch.id}_${i + 1}`);
    onStartSession({
      mode: 'practice',
      chapterId: ch.id,
      title: `${ch.nameBangla} - সম্পূর্ণ অধ্যায়`,
      subtitle: `প্রশ্ন ১ থেকে ${ch.totalQuestions} ক্রমানুসারে`,
      questionIds: qIds
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-2">
              <Sprout className="w-3.5 h-3.5" />
              <span>বিজ্ঞান বিষয়সমূহ • উদ্ভিদবিজ্ঞান (Botany)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              ১২টি অধ্যায় ভিত্তিক প্রশ্নব্যাংক
            </h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              উদ্ভিদবিজ্ঞানের ১,৬৯১টি প্রশ্ন সঠিক উত্তর চাবি সহ প্রস্তুত। বিজ্ঞান মাস্টার প্ল্যাটফর্মে পর্যায়ক্রমে প্রাণিবিজ্ঞান, পদার্থবিজ্ঞান ও রসায়ন সংযুক্ত হচ্ছে।
            </p>
          </div>
        </div>

        {/* Subject Navigation Tabs */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubjectTab('botany')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeSubjectTab === 'botany'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
            }`}
          >
            <Sprout className="w-4 h-4" />
            <span>উদ্ভিদবিজ্ঞান (Botany)</span>
            <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.2 rounded font-black">১২ অধ্যায় • লাইভ</span>
          </button>

          <button
            onClick={() => setActiveSubjectTab('zoology')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeSubjectTab === 'zoology'
                ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/30'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
            }`}
          >
            <Dna className="w-4 h-4" />
            <span>প্রাণিবিজ্ঞান (Zoology)</span>
            <span className="text-[10px] bg-amber-500/20 text-amber-700 px-1.5 py-0.2 rounded font-bold">শীঘ্রই</span>
          </button>

          <button
            onClick={() => setActiveSubjectTab('physics')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeSubjectTab === 'physics'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
            }`}
          >
            <Atom className="w-4 h-4" />
            <span>পদার্থবিজ্ঞান (Physics)</span>
            <span className="text-[10px] bg-amber-500/20 text-amber-700 px-1.5 py-0.2 rounded font-bold">শীঘ্রই</span>
          </button>

          <button
            onClick={() => setActiveSubjectTab('chemistry')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeSubjectTab === 'chemistry'
                ? 'bg-amber-600 text-white shadow-sm shadow-amber-600/30'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
            }`}
          >
            <FlaskConical className="w-4 h-4" />
            <span>রসায়ন (Chemistry)</span>
            <span className="text-[10px] bg-amber-500/20 text-amber-700 px-1.5 py-0.2 rounded font-bold">শীঘ্রই</span>
          </button>
        </div>
      </div>

      {/* When a pending subject is clicked */}
      {activeSubjectTab !== 'botany' && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-800">
            {activeSubjectTab === 'zoology' && 'প্রাণিবিজ্ঞান (Zoology) প্রশ্নব্যাংক'}
            {activeSubjectTab === 'physics' && 'পদার্থবিজ্ঞান (Physics) প্রশ্নব্যাংক'}
            {activeSubjectTab === 'chemistry' && 'রসায়ন (Chemistry) প্রশ্নব্যাংক'}
          </h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto mt-2 leading-relaxed">
            এই বিষয়ের অধ্যায়ভিত্তিক প্রশ্নসমূহ ডাটাবেজে যুক্ত হওয়ার প্রক্রিয়ায় রয়েছে। বর্তমানে আপনি <strong>উদ্ভিদবিজ্ঞান (Botany)</strong>-এর ১২টি অধ্যায়ের ১,৬৯১টি প্রশ্ন সম্পূর্ণ বিনামূল্যে অনুশীলন করতে পারেন।
          </p>
          <div className="mt-5">
            <button
              onClick={() => setActiveSubjectTab('botany')}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              উদ্ভিদবিজ্ঞান প্রশ্নব্যাংকে ফিরে যান →
            </button>
          </div>
        </div>
      )}

      {/* Chapters Accordion / Card List (Botany) */}
      {activeSubjectTab === 'botany' && (
      <div className="space-y-4">
        {CHAPTERS.map(ch => {
          const stats = getChapterStats(ch.id, ch.totalQuestions);
          const isExpanded = expandedChapterId === ch.id;
          const sets = generateChapterSets(ch.id);

          return (
            <div 
              key={ch.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:border-emerald-300 transition-all"
            >
              {/* Chapter Card Header */}
              <div className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2.5 mb-2">
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md">
                      অধ্যায় {ch.number}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      {ch.totalQuestions} টি প্রশ্ন • {sets.length} টি সেট
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-800">
                    {ch.nameBangla}
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold">{ch.nameEnglish}</p>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal leading-relaxed">
                    {ch.shortDesc}
                  </p>

                  {/* Topics chips */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {ch.topics.map((t, idx) => (
                      <span 
                        key={idx}
                        className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Side Stats & Actions */}
                <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                  {/* Progress bar info */}
                  <div className="w-full md:w-48 text-right">
                    <div className="flex justify-between md:justify-end md:space-x-3 text-xs font-bold text-slate-600 mb-1">
                      <span>{stats.answered}/{ch.totalQuestions} সম্পন্ন</span>
                      <span className="text-emerald-700">{stats.progressPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${stats.progressPercent}%` }}
                      />
                    </div>
                    {stats.answered > 0 && (
                      <p className="text-[11px] text-slate-400 font-medium mt-1">
                        নির্ভুলতা: {stats.accuracy}% (সঠিক: {stats.correct})
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleStartFullChapter(ch)}
                      className="flex-1 sm:flex-initial px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>পুরো অধ্যায় ({ch.totalQuestions})</span>
                    </button>

                    <button
                      onClick={() => toggleExpand(ch.id)}
                      className="px-3 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1 cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>সেটস ({sets.length})</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Chapter Sets Drawer */}
              {isExpanded && (
                <div className="bg-slate-50/70 p-5 sm:p-6 border-t border-slate-100 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                      ধারাবাহিক MCQ সেটসমূহ ({sets.length} টি সেট, প্রতি সেটে ~২৫টি প্রশ্ন):
                    </h4>
                    {stats.answered > 0 && (
                      <button
                        onClick={() => {
                          if (confirm(`আপনি কি অধ্যায় ${ch.number}-এর অনুশীলন অগ্রগতি রিসেট করতে চান?`)) {
                            resetChapterProgress(ch.id);
                          }
                        }}
                        className="text-[11px] text-slate-400 hover:text-rose-600 flex items-center space-x-1 cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>অধ্যায়ের অগ্রগতি রিসেট</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {sets.map(set => (
                      <div
                        key={set.id}
                        onClick={() => handleStartSet(ch, set)}
                        className="bg-white p-4 rounded-xl border border-slate-200/80 hover:border-emerald-300 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1.5">
                            <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                              সেট {set.setNumber}
                            </span>
                            <span className="font-bold text-slate-400">
                              {set.questionIds.length} টি প্রশ্ন
                            </span>
                          </div>
                          <h5 className="font-bold text-sm text-slate-800 group-hover:text-emerald-800 transition-colors">
                            {set.title}
                          </h5>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                            {set.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-2 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-emerald-600 group-hover:text-emerald-700">
                          <span>অনুশীলন করুন</span>
                          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      )}
    </div>
  );
};
