import React, { useState } from 'react';
import { 
  BookOpen, 
  Play, 
  Layers, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  RotateCcw,
  Sprout,
  Dna,
  Atom,
  Clock,
  Sparkles,
  Award
} from 'lucide-react';
import { CHAPTERS as BOTANY_CHAPTERS } from '../data/chapters';
import { ZOOLOGY_CHAPTERS } from '../data/zoology_chapters';
import { PHYSICS_CHAPTERS } from '../data/physics_chapters';
import { generateChapterSets } from '../data/questions';
import { Chapter, PracticeSessionConfig, MCQSet, Subject } from '../types';

interface ChaptersViewProps {
  currentSubject: Subject;
  onSelectSubject: (subject: Subject) => void;
  onStartSession: (config: PracticeSessionConfig) => void;
  getChapterStats: (chapterId: number, total: number, subject?: Subject) => {
    answered: number;
    correct: number;
    incorrect: number;
    accuracy: number;
    progressPercent: number;
    total: number;
  };
  resetChapterProgress: (chapterId: number, subject?: Subject) => void;
}

export const ChaptersView: React.FC<ChaptersViewProps> = ({
  currentSubject,
  onSelectSubject,
  onStartSession,
  getChapterStats,
  resetChapterProgress
}) => {
  const [expandedChapterId, setExpandedChapterId] = useState<number | null>(null);

  const isPhysics = currentSubject === 'physics';
  const isZoology = currentSubject === 'zoology';
  const chapters = isPhysics ? PHYSICS_CHAPTERS : isZoology ? ZOOLOGY_CHAPTERS : BOTANY_CHAPTERS;
  const subjectName = isPhysics ? 'পদার্থবিজ্ঞান' : isZoology ? 'প্রাণিবিজ্ঞান' : 'উদ্ভিদবিজ্ঞান';

  const toggleExpand = (id: number) => {
    setExpandedChapterId(prev => prev === id ? null : id);
  };

  const handleStartSet = (ch: Chapter, set: MCQSet) => {
    onStartSession({
      mode: 'practice',
      subject: currentSubject,
      chapterId: ch.id,
      setId: set.id,
      title: `${subjectName}: ${set.title}`,
      subtitle: set.description,
      questionIds: set.questionIds
    });
  };

  const handleStartFullChapter = (ch: Chapter) => {
    const prefix = isPhysics ? `phy_ch${ch.id}_` : isZoology ? `zoo_ch${ch.id}_` : `ch${ch.id}_`;
    const qIds = Array.from({ length: ch.totalQuestions }, (_, i) => `${prefix}${i + 1}`);
    onStartSession({
      mode: 'practice',
      subject: currentSubject,
      chapterId: ch.id,
      title: `${subjectName}: ${ch.nameBangla} - সম্পূর্ণ অধ্যায়`,
      subtitle: `প্রশ্ন ১ থেকে ${ch.totalQuestions} ক্রমানুসারে (সঠিক উত্তর কী যাচাই)`,
      questionIds: qIds
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold mb-2 ${
              isPhysics 
                ? 'bg-violet-50 text-violet-800 border border-violet-200' 
                : isZoology 
                ? 'bg-cyan-50 text-cyan-800 border border-cyan-200' 
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            }`}>
              {isPhysics ? <Atom className="w-3.5 h-3.5" /> : isZoology ? <Dna className="w-3.5 h-3.5" /> : <Sprout className="w-3.5 h-3.5" />}
              <span>
                {isPhysics ? 'পদার্থবিজ্ঞান ২য় পত্র • অধ্যায় ০৪ ও ০৫' : isZoology ? 'জীববিজ্ঞান ২য় পত্র • প্রাণিবিজ্ঞান (Zoology)' : 'জীববিজ্ঞান ১ম পত্র • উদ্ভিদবিজ্ঞান (Botany)'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              {isPhysics ? 'পদার্থবিজ্ঞান ২য় পত্র: অধ্যায় ভিত্তিক প্রশ্নব্যাংক' : '১২টি অধ্যায় ভিত্তিক প্রশ্নব্যাংক'}
            </h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              {isPhysics ? (
                <>অধ্যায় ০৪ (২৪৩ MCQ) এবং অধ্যায় ০৫ (৮৯ MCQ) এর মোট <strong>৩৩২টি</strong> প্রশ্ন সঠিক উত্তর চাবি ও ব্যাখ্যাসহ প্রস্তুত।</>
              ) : isZoology ? (
                <>প্রাণিবিজ্ঞানের ১২টি অধ্যায়ে <strong>১,৩৪৬টি</strong> মানসম্মত MCQ প্রশ্ন সঠিক উত্তর চাবিসহ প্রস্তুত। মেডিকেল ও এইচএসসি পরীক্ষার জন্য আদর্শ।</>
              ) : (
                <>উদ্ভিদবিজ্ঞানের ১২টি অধ্যায়ে <strong>১,৭২২টি</strong> মানসম্মত MCQ প্রশ্ন সঠিক উত্তর চাবিসহ প্রস্তুত।</>
              )}
            </p>
          </div>
        </div>

        {/* Subject Navigation Tabs */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap gap-2">
          <button
            onClick={() => onSelectSubject('physics')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              isPhysics
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
            }`}
          >
            <Atom className="w-4 h-4" />
            <span>পদার্থ ২য় পত্র (Physics)</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
              isPhysics ? 'bg-white/20 text-white' : 'bg-violet-100 text-violet-800'
            }`}>
              ২ অধ্যায় • ৩৩২ MCQ
            </span>
          </button>

          <button
            onClick={() => onSelectSubject('zoology')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              isZoology
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
            }`}
          >
            <Dna className="w-4 h-4" />
            <span>প্রাণিবিজ্ঞান (Zoology)</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
              isZoology ? 'bg-white/20 text-white' : 'bg-cyan-100 text-cyan-800'
            }`}>
              ১২ অধ্যায় • ১,৩৪৬ MCQ
            </span>
          </button>

          <button
            onClick={() => onSelectSubject('botany')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              !isZoology && !isPhysics
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
            }`}
          >
            <Sprout className="w-4 h-4" />
            <span>উদ্ভিদবিজ্ঞান (Botany)</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
              !isZoology && !isPhysics ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
            }`}>
              ১২ অধ্যায় • ১,৭২২ MCQ
            </span>
          </button>
        </div>
      </div>

      {/* Chapters Accordion / Card List */}
      <div className="space-y-4">
        {chapters.map(ch => {
          const stats = getChapterStats(ch.id, ch.totalQuestions, currentSubject);
          const isExpanded = expandedChapterId === ch.id;
          const sets = generateChapterSets(ch.id, currentSubject);

          return (
            <div 
              key={ch.id}
              className={`bg-white rounded-2xl border overflow-hidden shadow-xs transition-all ${
                isZoology 
                  ? 'border-slate-200/90 hover:border-cyan-400' 
                  : 'border-slate-200/90 hover:border-emerald-300'
              }`}
            >
              {/* Chapter Card Header */}
              <div className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2.5 mb-2">
                    <span className={`text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                      isZoology ? 'text-cyan-900 bg-cyan-100' : 'text-emerald-900 bg-emerald-100'
                    }`}>
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

                  {/* Topic Badges Preview */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {ch.topics.slice(0, 4).map((topic, idx) => (
                      <span 
                        key={idx}
                        className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                      >
                        {topic}
                      </span>
                    ))}
                    {ch.topics.length > 4 && (
                      <span className="text-[11px] font-bold text-slate-400 self-center">
                        +{ch.topics.length - 4} টি বিষয়
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress & Action Controls */}
                <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch sm:items-center gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                  {/* Progress Indicator */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 min-w-[130px] text-center">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-1">
                      <span>অগ্রগতি</span>
                      <span className={isZoology ? 'text-cyan-700' : 'text-emerald-700'}>
                        {stats.progressPercent}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          isZoology ? 'bg-cyan-600' : 'bg-emerald-600'
                        }`}
                        style={{ width: `${stats.progressPercent}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">
                      {stats.answered} / {ch.totalQuestions} সম্পন্ন
                    </div>
                  </div>

                  {/* Actions Buttons */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleStartFullChapter(ch)}
                      className={`flex-1 sm:flex-none px-4 py-2.5 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center space-x-1.5 cursor-pointer active:scale-95 ${
                        isZoology 
                          ? 'bg-cyan-600 hover:bg-cyan-700 shadow-cyan-600/25' 
                          : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/25'
                      }`}
                      title="১ থেকে শেষ পর্যন্ত সব প্রশ্ন একসাথে অনুশীলন"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>সম্পূর্ণ অধ্যায় ({ch.totalQuestions})</span>
                    </button>

                    <button
                      onClick={() => toggleExpand(ch.id)}
                      className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                        isExpanded
                          ? isZoology
                            ? 'bg-cyan-50 border-cyan-300 text-cyan-800'
                            : 'bg-emerald-50 border-emerald-300 text-emerald-800'
                          : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-600'
                      }`}
                      title="সেট তালিকা দেখুন"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Collapsible Practice Sets Section */}
              {isExpanded && (
                <div className="bg-slate-50/80 p-5 sm:p-6 border-t border-slate-200 space-y-4 animate-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-700 flex items-center space-x-1.5">
                        <Layers className="w-4 h-4 text-slate-500" />
                        <span>ধারাবাহিক অনুশীলন সেটস (প্রতি সেটে প্রায় ২৫টি প্রশ্ন)</span>
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        ধাপে ধাপে ২৫টি করে প্রশ্ন সমাধান করুন এবং প্রস্তুতি যাচাই করুন
                      </p>
                    </div>

                    {stats.answered > 0 && (
                      <button
                        onClick={() => {
                          if (confirm(`আপনি কি অধ্যায় ${ch.number}-এর সমস্ত অগ্রগতি রিসেট করতে চান?`)) {
                            resetChapterProgress(ch.id, currentSubject);
                          }
                        }}
                        className="text-[11px] font-bold text-rose-600 hover:text-rose-800 flex items-center space-x-1 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs hover:bg-rose-50 cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>রিসেট</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {sets.map(set => (
                      <div
                        key={set.id}
                        onClick={() => handleStartSet(ch, set)}
                        className={`bg-white p-4 rounded-xl border border-slate-200/90 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between ${
                          isZoology ? 'hover:border-cyan-400' : 'hover:border-emerald-400'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-md ${
                              isZoology ? 'bg-cyan-50 text-cyan-800' : 'bg-emerald-50 text-emerald-800'
                            }`}>
                              সেট {set.setNumber}
                            </span>
                            <span className="text-[11px] font-bold text-slate-400">
                              {set.questionIds.length} টি প্রশ্ন
                            </span>
                          </div>

                          <h5 className={`font-bold text-slate-800 text-sm transition-colors ${
                            isZoology ? 'group-hover:text-cyan-700' : 'group-hover:text-emerald-700'
                          }`}>
                            {set.title}
                          </h5>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                            {set.description}
                          </p>
                        </div>

                        <div className={`mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold ${
                          isZoology ? 'text-cyan-700' : 'text-emerald-700'
                        }`}>
                          <span>অনুশীলন শুরু করুন</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
    </div>
  );
};
