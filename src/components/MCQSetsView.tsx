import React, { useState, useMemo } from 'react';
import { 
  Layers, 
  Play, 
  CheckCircle2, 
  Filter, 
  ArrowRight, 
  Sparkles,
  Award,
  BookOpen,
  Dna,
  Sprout,
  Atom
} from 'lucide-react';
import { CHAPTERS as BOTANY_CHAPTERS } from '../data/chapters';
import { ZOOLOGY_CHAPTERS } from '../data/zoology_chapters';
import { getAllMCQSets, getChaptersForSubject } from '../data/questions';
import { MCQSet, PracticeSessionConfig, Subject } from '../types';

interface MCQSetsViewProps {
  currentSubject: Subject;
  onSelectSubject: (subject: Subject) => void;
  onStartSession: (config: PracticeSessionConfig) => void;
  completedSets: Record<string, { completedAt: number; score: number; total: number }>;
}

export const MCQSetsView: React.FC<MCQSetsViewProps> = ({
  currentSubject,
  onSelectSubject,
  onStartSession,
  completedSets
}) => {
  const [selectedChapterId, setSelectedChapterId] = useState<number | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending'>('all');

  const isPhysics = currentSubject === 'physics';
  const isZoology = currentSubject === 'zoology';
  const subjectName = isPhysics ? 'পদার্থবিজ্ঞান' : isZoology ? 'প্রাণিবিজ্ঞান' : 'উদ্ভিদবিজ্ঞান';
  const chapters = getChaptersForSubject(currentSubject);
  const allSubjectSets = useMemo(() => getAllMCQSets(currentSubject), [currentSubject]);

  const filteredSets = useMemo(() => {
    return allSubjectSets.filter(set => {
      // Chapter filter
      if (selectedChapterId !== 'all' && set.chapterId !== selectedChapterId) {
        return false;
      }
      // Status filter
      const isCompleted = completedSets[set.id] !== undefined;
      if (statusFilter === 'completed' && !isCompleted) return false;
      if (statusFilter === 'pending' && isCompleted) return false;

      return true;
    });
  }, [allSubjectSets, selectedChapterId, statusFilter, completedSets]);

  const completedCount = useMemo(() => {
    return allSubjectSets.filter(s => completedSets[s.id] !== undefined).length;
  }, [allSubjectSets, completedSets]);

  const handleStartSet = (set: MCQSet) => {
    onStartSession({
      mode: 'practice',
      subject: currentSubject,
      chapterId: set.chapterId,
      setId: set.id,
      title: `${subjectName}: ${set.title}`,
      subtitle: set.description,
      questionIds: set.questionIds
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold mb-2 ${
            isPhysics
              ? 'bg-violet-50 text-violet-800 border border-violet-200'
              : isZoology 
              ? 'bg-cyan-50 text-cyan-800 border border-cyan-200' 
              : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
          }`}>
            <Layers className="w-3.5 h-3.5" />
            <span>{subjectName} ধারাবাহিক সিরিজ</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            MCQ অনুশীলন সেটস
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            {isPhysics ? (
              <>পদার্থবিজ্ঞান ২য় পত্রের অধ্যায় ৪ ও ৫ এর <strong>{allSubjectSets.length}টি</strong> ধারাবাহিক সেট (প্রতিটিতে ~২৫টি প্রশ্ন)।</>
            ) : isZoology ? (
              <>প্রাণিবিজ্ঞানের ১২টি অধ্যায়ের <strong>{allSubjectSets.length}টি</strong> ধারাবাহিক সেট (প্রতিটিতে ~২৫টি প্রশ্ন)।</>
            ) : (
              <>উদ্ভিদবিজ্ঞানের ১২টি অধ্যায়ের <strong>{allSubjectSets.length}টি</strong> ধারাবাহিক সেট (প্রতিটিতে ~২৫টি প্রশ্ন)।</>
            )}
          </p>

          {/* Subject Navigation Tabs */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => {
                onSelectSubject('physics');
                setSelectedChapterId('all');
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isPhysics
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Atom className="w-3.5 h-3.5" />
              <span>পদার্থবিজ্ঞান সেটস (১৪ সেট)</span>
            </button>
            <button
              onClick={() => {
                onSelectSubject('zoology');
                setSelectedChapterId('all');
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isZoology
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Dna className="w-3.5 h-3.5" />
              <span>প্রাণিবিজ্ঞান সেটস</span>
            </button>
            <button
              onClick={() => {
                onSelectSubject('botany');
                setSelectedChapterId('all');
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                !isZoology && !isPhysics
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Sprout className="w-3.5 h-3.5" />
              <span>উদ্ভিদবিজ্ঞান সেটস</span>
            </button>
          </div>
        </div>

        {/* Quick summary badge */}
        <div className={`flex items-center space-x-3 p-3.5 rounded-2xl border shrink-0 ${
          isPhysics ? 'bg-violet-50/80 border-violet-100' : isZoology ? 'bg-cyan-50/80 border-cyan-100' : 'bg-emerald-50/80 border-emerald-100'
        }`}>
          <div className={`w-10 h-10 rounded-xl text-white flex items-center justify-center font-black ${
            isPhysics ? 'bg-violet-600' : isZoology ? 'bg-cyan-600' : 'bg-emerald-600'
          }`}>
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500">সেট সমাধান অগ্রগতি</div>
            <div className={`text-lg font-extrabold ${isPhysics ? 'text-violet-900' : isZoology ? 'text-cyan-900' : 'text-emerald-900'}`}>
              {completedCount} / {allSubjectSets.length} টি
            </div>
          </div>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Chapter Selector Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
            <button
              onClick={() => setSelectedChapterId('all')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedChapterId === 'all'
                  ? isZoology ? 'bg-cyan-600 text-white shadow-xs' : 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              সকল অধ্যায় ({allSubjectSets.length} সেট)
            </button>
            {chapters.map(ch => (
              <button
                key={ch.id}
                onClick={() => setSelectedChapterId(ch.id)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedChapterId === ch.id
                    ? isZoology ? 'bg-cyan-600 text-white shadow-xs' : 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                অধ্যায় {ch.number}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl text-xs shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                statusFilter === 'all' ? 'bg-white text-slate-800 shadow-2xs' : 'text-slate-500'
              }`}
            >
              সবগুলো
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                statusFilter === 'pending' ? 'bg-white text-slate-800 shadow-2xs' : 'text-slate-500'
              }`}
            >
              বাকি আছে
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                statusFilter === 'completed' ? 'bg-white text-slate-800 shadow-2xs' : 'text-slate-500'
              }`}
            >
              সম্পন্ন ({completedCount})
            </button>
          </div>
        </div>
      </div>

      {/* Sets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSets.map(set => {
          const ch = chapters.find(c => c.id === set.chapterId);
          const completion = completedSets[set.id];
          const isCompleted = completion !== undefined;

          return (
            <div
              key={set.id}
              onClick={() => handleStartSet(set)}
              className={`bg-white rounded-2xl p-5 border shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between ${
                isCompleted 
                  ? 'border-emerald-300 bg-emerald-50/20' 
                  : isZoology 
                    ? 'border-slate-200/90 hover:border-cyan-400' 
                    : 'border-slate-200/90 hover:border-emerald-400'
              }`}
            >
              <div>
                {/* Card Top Badges */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1.5">
                    <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-md ${
                      isZoology ? 'bg-cyan-100 text-cyan-900' : 'bg-emerald-100 text-emerald-900'
                    }`}>
                      অধ্যায় {set.chapterId}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">
                      সেট {set.setNumber}
                    </span>
                  </div>

                  {isCompleted ? (
                    <span className="inline-flex items-center space-x-1 text-[11px] font-black text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-md">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{completion.score}/{completion.total} সঠিক</span>
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-slate-400">
                      {set.questionIds.length} টি প্রশ্ন
                    </span>
                  )}
                </div>

                {/* Set Title & Chapter Name */}
                <h3 className={`font-extrabold text-base text-slate-800 transition-colors ${
                  isZoology ? 'group-hover:text-cyan-700' : 'group-hover:text-emerald-700'
                }`}>
                  {set.title}
                </h3>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  {ch?.nameBangla}
                </p>

                <p className="text-xs text-slate-600 mt-2 font-normal line-clamp-2">
                  {set.description}
                </p>
              </div>

              {/* Bottom Action Footer */}
              <div className={`mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold ${
                isZoology ? 'text-cyan-700' : 'text-emerald-700'
              }`}>
                <span>{isCompleted ? 'পুনরায় টেস্ট দিন' : 'অনুশীলন শুরু করুন'}</span>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                  isZoology 
                    ? 'bg-cyan-50 group-hover:bg-cyan-600 group-hover:text-white' 
                    : 'bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white'
                }`}>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSets.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">কোনো সেট পাওয়া যায়নি</h3>
          <p className="text-xs text-slate-400 mt-1">ফিল্টারের ধরন পরিবর্তন করে পুনরায় চেষ্টা করুন।</p>
        </div>
      )}
    </div>
  );
};
