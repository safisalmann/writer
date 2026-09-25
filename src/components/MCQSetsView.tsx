import React, { useState, useMemo } from 'react';
import { 
  Layers, 
  Play, 
  CheckCircle2, 
  Filter, 
  ArrowRight, 
  Sparkles,
  Award,
  BookOpen
} from 'lucide-react';
import { CHAPTERS } from '../data/chapters';
import { ALL_MCQ_SETS } from '../data/questions';
import { MCQSet, PracticeSessionConfig } from '../types';

interface MCQSetsViewProps {
  onStartSession: (config: PracticeSessionConfig) => void;
  completedSets: Record<string, { completedAt: number; score: number; total: number }>;
}

export const MCQSetsView: React.FC<MCQSetsViewProps> = ({
  onStartSession,
  completedSets
}) => {
  const [selectedChapterId, setSelectedChapterId] = useState<number | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending'>('all');

  const filteredSets = useMemo(() => {
    return ALL_MCQ_SETS.filter(set => {
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
  }, [selectedChapterId, statusFilter, completedSets]);

  const handleStartSet = (set: MCQSet) => {
    onStartSession({
      mode: 'practice',
      chapterId: set.chapterId,
      setId: set.id,
      title: set.title,
      subtitle: set.description,
      questionIds: set.questionIds
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>বিজ্ঞান প্রশ্নব্যাংক • ধারাবাহিক সিরিজ</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            MCQ অনুশীলন সেটস (Science Sets)
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            উদ্ভিদবিজ্ঞান, প্রাণিবিজ্ঞান, পদার্থবিজ্ঞান ও রসায়ন সিরিজের অধ্যায়ভিত্তিক সেট। বর্তমানে বোটানির ৭৪টি ধারাবাহিক সেট সম্পূর্ণ সক্রিয়।
          </p>
        </div>

        {/* Quick summary badge */}
        <div className="flex items-center space-x-3 bg-emerald-50 p-3 rounded-2xl border border-emerald-100 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500">বোটানি সেট সমাধান</div>
            <div className="text-lg font-extrabold text-emerald-800">
              {Object.keys(completedSets).length} / {ALL_MCQ_SETS.length} টি
            </div>
          </div>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Chapter Selector Tabs/Dropdown */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
            <button
              onClick={() => setSelectedChapterId('all')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors ${
                selectedChapterId === 'all'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              সকল অধ্যায় ({ALL_MCQ_SETS.length} সেট)
            </button>
            {CHAPTERS.map(ch => (
              <button
                key={ch.id}
                onClick={() => setSelectedChapterId(ch.id)}
                className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-colors ${
                  selectedChapterId === ch.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                অধ্যায় {ch.number}: {ch.nameBangla.slice(0, 10)}...
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-1 shrink-0 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                statusFilter === 'all' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-600'
              }`}
            >
              সব
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                statusFilter === 'completed' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              সম্পন্ন
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                statusFilter === 'pending' ? 'bg-white text-amber-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              বাকি
            </button>
          </div>
        </div>
      </div>

      {/* Sets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSets.map(set => {
          const ch = CHAPTERS.find(c => c.id === set.chapterId);
          const completion = completedSets[set.id];
          const isDone = completion !== undefined;

          return (
            <div
              key={set.id}
              onClick={() => handleStartSet(set)}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                    অধ্যায় {ch?.number} • সেট {set.setNumber}
                  </span>
                  
                  {isDone ? (
                    <span className="flex items-center space-x-1 font-bold text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{completion.score}/{completion.total}</span>
                    </span>
                  ) : (
                    <span className="font-bold text-slate-400">
                      {set.questionIds.length} টি প্রশ্ন
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-base text-slate-800 group-hover:text-emerald-800 transition-colors">
                  {set.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {set.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">
                  {ch?.nameBangla}
                </span>

                <button className="text-xs font-bold text-emerald-600 group-hover:text-emerald-700 flex items-center space-x-1">
                  <span>{isDone ? 'পুনরায় দিন' : 'শুরু করুন'}</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
