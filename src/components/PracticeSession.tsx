import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Bookmark, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Grid3X3, 
  Check, 
  Award,
  Clock,
  Sparkles,
  HelpCircle,
  Share2
} from 'lucide-react';
import { Question, OptionIndex, PracticeSessionConfig, AnswerRecord } from '../types';
import { getQuestionsByIds } from '../data/questions';
import { CHAPTERS } from '../data/chapters';

interface PracticeSessionProps {
  config: PracticeSessionConfig;
  onBack: () => void;
  onFinishSet?: (score: number, total: number) => void;
  recordAnswer: (qId: string, optIdx: OptionIndex, isCorrect: boolean) => void;
  toggleSaveQuestion: (qId: string) => void;
  isQuestionSaved: (qId: string) => boolean;
  existingAnswers: Record<string, AnswerRecord>;
}

export const PracticeSession: React.FC<PracticeSessionProps> = ({
  config,
  onBack,
  onFinishSet,
  recordAnswer,
  toggleSaveQuestion,
  isQuestionSaved,
  existingAnswers
}) => {
  const questions: Question[] = useMemo(() => {
    return getQuestionsByIds(config.questionIds);
  }, [config.questionIds]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionAnswers, setSessionAnswers] = useState<Record<string, { selectedOption: OptionIndex; isCorrect: boolean }>>(() => {
    const initial: Record<string, { selectedOption: OptionIndex; isCorrect: boolean }> = {};
    config.questionIds.forEach(id => {
      if (existingAnswers[id]) {
        initial[id] = {
          selectedOption: existingAnswers[id].selectedOption,
          isCorrect: existingAnswers[id].isCorrect
        };
      }
    });
    return initial;
  });

  const [isCompleted, setIsCompleted] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentQuestion = questions[currentIndex];
  const chapter = currentQuestion ? CHAPTERS.find(c => c.id === currentQuestion.chapterId) : undefined;
  const currentAnswer = currentQuestion ? sessionAnswers[currentQuestion.id] : undefined;
  const isSaved = currentQuestion ? isQuestionSaved(currentQuestion.id) : false;

  // Show temporary toast message
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  };

  // Handle option selection
  const handleSelectOption = (optIdx: OptionIndex) => {
    if (!currentQuestion) return;

    // In practice mode, allow clicking
    const isCorrect = optIdx === currentQuestion.correctAnswer;
    setSessionAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: {
        selectedOption: optIdx,
        isCorrect
      }
    }));

    recordAnswer(currentQuestion.id, optIdx, isCorrect);
  };

  // Handle save for later toggle
  const handleToggleSave = () => {
    if (!currentQuestion) return;
    const nowSaved = !isSaved;
    toggleSaveQuestion(currentQuestion.id);
    if (nowSaved) {
      triggerToast('কঠিন প্রশ্ন হিসেবে "সেভ করা প্রশ্ন"-তে যোগ করা হয়েছে ⭐');
    } else {
      triggerToast('সংরক্ষিত তালিকা থেকে সরানো হয়েছে');
    }
  };

  // Navigation handlers
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFinish = () => {
    setIsCompleted(true);
    const correctTotal = Object.values(sessionAnswers).filter(a => a.isCorrect).length;
    if (onFinishSet) {
      onFinishSet(correctTotal, questions.length);
    }
  };

  const handleRetake = () => {
    setSessionAnswers({});
    setCurrentIndex(0);
    setIsCompleted(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (['1', '2', '3', '4'].includes(e.key)) {
        const idx = (parseInt(e.key, 10) - 1) as OptionIndex;
        handleSelectOption(idx);
      } else if (e.key.toLowerCase() === 's') {
        handleToggleSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, questions, sessionAnswers, isSaved]);

  if (!currentQuestion && !isCompleted) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <HelpCircle className="w-12 h-12 text-slate-400 mb-3 animate-bounce" />
        <h3 className="text-lg font-bold text-slate-700">কোনো প্রশ্ন পাওয়া যায়নি</h3>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700"
        >
          ফিরে যান
        </button>
      </div>
    );
  }

  // Summary / Result Screen
  if (isCompleted) {
    const answeredCount = Object.keys(sessionAnswers).length;
    const correctCount = Object.values(sessionAnswers).filter(a => a.isCorrect).length;
    const incorrectCount = answeredCount - correctCount;
    const unattempted = questions.length - answeredCount;
    const percentage = Math.round((correctCount / questions.length) * 100);

    return (
      <div className="max-w-3xl mx-auto px-4 py-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-100 text-center relative overflow-hidden">
          {/* Top Decorative Header */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
          
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-5">
            <Award className="w-10 h-10" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            অনুশীলন সম্পন্ন হয়েছে!
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-1 font-medium">
            {config.title} • {config.subtitle}
          </p>

          {/* Big Score Card */}
          <div className="my-8 py-6 px-4 bg-gradient-to-b from-emerald-50/70 to-teal-50/40 rounded-2xl border border-emerald-200/60 max-w-sm mx-auto">
            <div className="text-5xl font-black text-emerald-700 tracking-tight">
              {correctCount} <span className="text-2xl font-bold text-slate-400">/ {questions.length}</span>
            </div>
            <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest mt-2">
              প্রাপ্ত স্কোর ({percentage}% নির্ভুলতা)
            </p>
          </div>

          {/* Stats Breakdown Grid */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-8">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/50">
              <div className="flex items-center justify-center text-emerald-600 mb-1">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                <span className="text-xs font-bold">সঠিক</span>
              </div>
              <span className="text-xl font-extrabold text-emerald-800">{correctCount}</span>
            </div>

            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200/50">
              <div className="flex items-center justify-center text-rose-600 mb-1">
                <XCircle className="w-4 h-4 mr-1" />
                <span className="text-xs font-bold">ভুল</span>
              </div>
              <span className="text-xl font-extrabold text-rose-800">{incorrectCount}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-100 border border-slate-200/60">
              <div className="flex items-center justify-center text-slate-500 mb-1">
                <HelpCircle className="w-4 h-4 mr-1" />
                <span className="text-xs font-bold">অনুত্তরিত</span>
              </div>
              <span className="text-xl font-extrabold text-slate-700">{unattempted}</span>
            </div>
          </div>

          {/* Quick Review of Questions */}
          <div className="text-left mb-8">
            <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center justify-between">
              <span>প্রশ্নের ফলাফল তালিকা:</span>
              <span className="text-xs text-slate-400">প্রশ্নে ক্লিক করে দেখুন</span>
            </h4>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {questions.map((q, idx) => {
                const ans = sessionAnswers[q.id];
                const saved = isQuestionSaved(q.id);
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setIsCompleted(false);
                    }}
                    className={`h-10 rounded-xl text-xs font-bold flex items-center justify-center relative transition-all border ${
                      ans?.isCorrect
                        ? 'bg-emerald-100 border-emerald-300 text-emerald-800 hover:bg-emerald-200'
                        : ans
                        ? 'bg-rose-100 border-rose-300 text-rose-800 hover:bg-rose-200'
                        : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <span>{idx + 1}</span>
                    {saved && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border border-white" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleRetake}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition-colors flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>পুনরায় অনুশীলন করুন</span>
            </button>
            <button
              onClick={onBack}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center space-x-2"
            >
              <span>সেট তালিকায় ফিরে যান</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const optionLabels = ['ক', 'খ', 'গ', 'ঘ'];
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="min-h-[85vh] flex flex-col pb-28 sm:pb-12 max-w-4xl mx-auto px-4 sm:px-6 pt-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-xl border border-white/10 flex items-center space-x-2 animate-in fade-in slide-in-from-top-4 duration-150">
          <Bookmark className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-emerald-100/80 mb-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-emerald-700 transition-colors p-1.5 -ml-1 rounded-lg hover:bg-slate-100"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">ফিরে যান</span>
        </button>

        <div className="flex-1 mx-4 text-center">
          <div className="flex items-center justify-center space-x-2 text-xs text-slate-500 font-semibold truncate">
            <span>{config.title}</span>
            <span>•</span>
            <span className="text-emerald-700 font-bold">প্রশ্ন {currentIndex + 1} / {questions.length}</span>
          </div>
          {/* Progress Mini Bar */}
          <div className="w-full max-w-xs mx-auto bg-slate-100 rounded-full h-1.5 mt-1.5 overflow-hidden">
            <div 
              className="bg-emerald-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Font size & Palette toggle */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={() => setFontSize(f => f === 'normal' ? 'large' : 'normal')}
            className="p-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
            title="ফন্ট সাইজ পরিবর্তন করুন"
          >
            {fontSize === 'normal' ? 'A+' : 'A-'}
          </button>
          <button
            onClick={() => setShowPalette(!showPalette)}
            className={`p-2 rounded-lg transition-colors flex items-center space-x-1 text-xs font-bold ${
              showPalette ? 'bg-emerald-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
            title="প্রশ্ন তালিকা দেখুন"
          >
            <Grid3X3 className="w-4 h-4" />
            <span className="hidden sm:inline">তালিকা</span>
          </button>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-sm border border-slate-200/80 flex-1 flex flex-col justify-between relative overflow-hidden">
        {/* Top Badges & Bookmark */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800">
                অধ্যায় {currentQuestion.chapterId}: {chapter?.nameBangla}
              </span>
              {currentQuestion.topic && (
                <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600">
                  {currentQuestion.topic}
                </span>
              )}
              {currentQuestion.source && (
                <span className="px-2 py-0.5 rounded-md text-xs font-medium text-slate-400 bg-slate-50 border border-slate-100">
                  {currentQuestion.source}
                </span>
              )}
            </div>

            {/* Save for later / Bookmark Button */}
            <button
              onClick={handleToggleSave}
              className={`p-2.5 rounded-xl transition-all flex items-center space-x-1.5 text-xs font-bold border ${
                isSaved
                  ? 'bg-amber-50 border-amber-300 text-amber-700 shadow-xs'
                  : 'bg-slate-50 border-slate-200/80 text-slate-500 hover:bg-slate-100 hover:text-slate-800'
              }`}
              title="কঠিন প্রশ্ন? পরবর্তীতে দেখার জন্য সেভ করে রাখুন"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'text-amber-500 fill-amber-500' : ''}`} />
              <span className="hidden sm:inline">
                {isSaved ? 'সংরক্ষিত' : 'Save for Later'}
              </span>
            </button>
          </div>

          {/* Question Text */}
          <div className="py-2">
            <h3 className={`font-bold text-slate-800 leading-relaxed ${
              fontSize === 'large' ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
            }`}>
              <span className="text-emerald-600 mr-2 font-black">{currentQuestion.number}.</span>
              {currentQuestion.question}
            </h3>
          </div>

          {/* 4 Options Grid */}
          <div className="mt-6 space-y-3">
            {currentQuestion.options.map((optionText, idx) => {
              const optionIndex = idx as OptionIndex;
              const isSelected = currentAnswer?.selectedOption === optionIndex;
              const isAnswered = currentAnswer !== undefined;
              const isCorrectKey = currentQuestion.correctAnswer === optionIndex;

              // Style states
              let cardStyle = 'border-slate-200/90 hover:border-emerald-400 hover:bg-slate-50 text-slate-800 bg-white';
              let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-300';
              let iconNode = null;

              if (isAnswered) {
                if (isSelected && currentAnswer.isCorrect) {
                  // User chose correct
                  cardStyle = 'border-emerald-500 bg-emerald-50/80 text-emerald-950 font-bold shadow-xs ring-1 ring-emerald-500';
                  badgeStyle = 'bg-emerald-600 text-white border-emerald-600';
                  iconNode = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
                } else if (isSelected && !currentAnswer.isCorrect) {
                  // User chose wrong
                  cardStyle = 'border-rose-400 bg-rose-50/70 text-rose-950 font-semibold ring-1 ring-rose-400';
                  badgeStyle = 'bg-rose-600 text-white border-rose-600';
                  iconNode = <XCircle className="w-5 h-5 text-rose-600 shrink-0" />;
                } else if (isCorrectKey) {
                  // Reveal backend correct answer key as requested by prompt
                  cardStyle = 'border-emerald-400/80 bg-emerald-50/50 text-emerald-900 font-semibold';
                  badgeStyle = 'bg-emerald-500 text-white border-emerald-500';
                  iconNode = <Check className="w-4 h-4 text-emerald-600 shrink-0" />;
                } else {
                  cardStyle = 'border-slate-200 bg-slate-50/40 text-slate-400 opacity-60';
                }
              }

              return (
                <div
                  key={idx}
                  onClick={() => handleSelectOption(optionIndex)}
                  className={`w-full p-4 sm:p-4.5 rounded-2xl border text-left flex items-center justify-between cursor-pointer transition-all select-none group active:scale-[0.99] ${cardStyle}`}
                >
                  <div className="flex items-center space-x-3.5">
                    <span className={`w-8 h-8 rounded-xl text-sm font-extrabold flex items-center justify-center shrink-0 border transition-colors ${badgeStyle}`}>
                      {optionLabels[idx]}
                    </span>
                    <span className={`text-base sm:text-lg leading-snug ${fontSize === 'large' ? 'font-semibold' : 'font-medium'}`}>
                      {optionText}
                    </span>
                  </div>

                  {iconNode && (
                    <div className="ml-3 shrink-0">
                      {iconNode}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Correct Answer Key Status Banner (Reveals after selection) */}
          {currentAnswer && (
            <div className={`mt-5 p-3.5 rounded-xl border flex items-center justify-between text-xs sm:text-sm font-semibold animate-in fade-in duration-200 ${
              currentAnswer.isCorrect 
                ? 'bg-emerald-50/90 border-emerald-300 text-emerald-800' 
                : 'bg-rose-50/90 border-rose-200 text-rose-900'
            }`}>
              <div className="flex items-center space-x-2">
                {currentAnswer.isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span>
                  {currentAnswer.isCorrect 
                    ? 'চমৎকার! সঠিক উত্তর দিয়েছেন।' 
                    : `ভুল উত্তর। সঠিক উত্তর: (${optionLabels[currentQuestion.correctAnswer]}) ${currentQuestion.options[currentQuestion.correctAnswer]}`
                  }
                </span>
              </div>

              {!isSaved && !currentAnswer.isCorrect && (
                <button
                  onClick={handleToggleSave}
                  className="ml-2 text-xs font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-lg transition-colors shrink-0"
                >
                  + সেভ করুন
                </button>
              )}
            </div>
          )}
        </div>

        {/* Desktop Question Footer Controls */}
        <div className="hidden sm:flex items-center justify-between pt-8 border-t border-slate-100 mt-8">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`px-5 py-2.5 rounded-xl border text-sm font-bold flex items-center space-x-2 transition-all ${
              currentIndex === 0
                ? 'border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50'
                : 'border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>পূর্ববর্তী প্রশ্ন</span>
          </button>

          <div className="text-xs font-semibold text-slate-400">
            কীবোর্ড শর্টকাট: ১, ২, ৩, ৪ (অপশন) • Space বা → (পরবর্তী)
          </div>

          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center space-x-2"
          >
            <span>{currentIndex === questions.length - 1 ? 'অনুশীলন শেষ করুন' : 'পরবর্তী প্রশ্ন'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 shadow-lg">
        <div className="flex items-center justify-between space-x-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`p-3 rounded-xl border font-bold text-xs flex items-center justify-center ${
              currentIndex === 0 ? 'text-slate-300 border-slate-200 bg-slate-50' : 'text-slate-700 border-slate-300'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleToggleSave}
            className={`px-3 py-3 rounded-xl border text-xs font-bold flex items-center space-x-1 ${
              isSaved
                ? 'bg-amber-500 border-amber-500 text-white'
                : 'border-slate-300 text-slate-700 bg-slate-50'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
            <span>{isSaved ? 'সেভড' : 'সেভ'}</span>
          </button>

          <button
            onClick={() => setShowPalette(!showPalette)}
            className="px-3 py-3 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold bg-slate-50 flex items-center space-x-1"
          >
            <Grid3X3 className="w-4 h-4" />
            <span>{currentIndex + 1}/{questions.length}</span>
          </button>

          <button
            onClick={handleNext}
            className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-md shadow-emerald-600/20"
          >
            <span>{currentIndex === questions.length - 1 ? 'ফলাফল দেখুন' : 'পরবর্তী'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Question Palette Modal / Drawer */}
      {showPalette && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div 
            className="bg-white w-full sm:max-w-xl rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h4 className="font-extrabold text-slate-800 text-base">প্রশ্ন তালিকা নেভিগেশন</h4>
                <p className="text-xs text-slate-400">যে কোনো প্রশ্নে সরাসরি লাফ দিতে পারেন</p>
              </div>
              <button
                onClick={() => setShowPalette(false)}
                className="text-xs font-bold px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
              >
                বন্ধ করুন
              </button>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-2 text-[11px] font-semibold mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-1" /> সঠিক</span>
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 mr-1" /> ভুল</span>
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 mr-1" /> সেভ করা</span>
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-slate-300 mr-1" /> বাকি আছে</span>
            </div>

            {/* Questions Grid */}
            <div className="grid grid-cols-5 sm:grid-cols-8 gap-2 max-h-72 overflow-y-auto p-1">
              {questions.map((q, idx) => {
                const ans = sessionAnswers[q.id];
                const saved = isQuestionSaved(q.id);
                const isCurrent = idx === currentIndex;

                let btnBg = 'bg-slate-100 text-slate-700 border-slate-200';
                if (ans) {
                  btnBg = ans.isCorrect
                    ? 'bg-emerald-500 text-white border-emerald-600 font-bold'
                    : 'bg-rose-500 text-white border-rose-600 font-bold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowPalette(false);
                    }}
                    className={`h-11 rounded-xl text-xs font-extrabold border transition-all relative flex items-center justify-center ${btnBg} ${
                      isCurrent ? 'ring-2 ring-emerald-500 ring-offset-2 scale-105' : 'hover:opacity-90'
                    }`}
                  >
                    <span>{idx + 1}</span>
                    {saved && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border border-white" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Finish set button */}
            <button
              onClick={() => {
                setShowPalette(false);
                handleFinish();
              }}
              className="mt-6 w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-md transition-colors"
            >
              এখনই ফলাফল দেখুন ({Object.keys(sessionAnswers).length} / {questions.length} উত্তর দেওয়া হয়েছে)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
