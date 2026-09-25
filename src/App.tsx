import React, { useState } from 'react';
import { ViewMode, PracticeSessionConfig, Question } from './types';
import { useProgress } from './hooks/useProgress';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { ChaptersView } from './components/ChaptersView';
import { MCQSetsView } from './components/MCQSetsView';
import { SavedQuestionsView } from './components/SavedQuestionsView';
import { AnalyticsView } from './components/AnalyticsView';
import { PracticeSession } from './components/PracticeSession';
import { SearchModal } from './components/SearchModal';
import { CHAPTERS } from './data/chapters';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [previousView, setPreviousView] = useState<ViewMode>('dashboard');
  const [activeSession, setActiveSession] = useState<PracticeSessionConfig | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const {
    progress,
    recordAnswer,
    toggleSaveQuestion,
    isQuestionSaved,
    completeSet,
    resetAllProgress,
    resetChapterProgress,
    stats,
    getChapterStats
  } = useProgress();

  const handleStartSession = (config: PracticeSessionConfig) => {
    setActiveSession(config);
    setPreviousView(currentView);
    setCurrentView('practice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromPractice = () => {
    setActiveSession(null);
    setCurrentView(previousView === 'practice' ? 'dashboard' : previousView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishSet = (score: number, total: number) => {
    if (activeSession?.setId) {
      completeSet(activeSession.setId, score, total);
    }
  };

  const handleSelectQuestionFromSearch = (q: Question) => {
    const ch = CHAPTERS.find(c => c.id === q.chapterId);
    handleStartSession({
      mode: 'practice',
      chapterId: q.chapterId,
      title: `${ch?.nameBangla || 'অধ্যায়'} - প্রশ্ন ${q.number}`,
      subtitle: q.topic || 'অনুশীলন সেশন',
      questionIds: [q.id]
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 font-['Hind_Siliguri',sans-serif] flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onSelectView={(view) => {
          if (currentView === 'practice') {
            setActiveSession(null);
          }
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        savedCount={stats.savedCount}
        overallAccuracy={stats.overallAccuracy}
        completionPercentage={stats.completionPercentage}
        answeredCount={stats.answeredCount}
        totalQuestions={stats.totalQuestions}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentView === 'practice' && activeSession ? (
          <PracticeSession
            config={activeSession}
            onBack={handleBackFromPractice}
            onFinishSet={handleFinishSet}
            recordAnswer={recordAnswer}
            toggleSaveQuestion={toggleSaveQuestion}
            isQuestionSaved={isQuestionSaved}
            existingAnswers={progress.answers}
          />
        ) : currentView === 'chapters' ? (
          <ChaptersView
            onStartSession={handleStartSession}
            getChapterStats={getChapterStats}
            resetChapterProgress={resetChapterProgress}
          />
        ) : currentView === 'sets' ? (
          <MCQSetsView
            onStartSession={handleStartSession}
            completedSets={progress.completedSets}
          />
        ) : currentView === 'saved' ? (
          <SavedQuestionsView
            savedQuestionIds={progress.savedQuestionIds}
            toggleSaveQuestion={toggleSaveQuestion}
            onStartSession={handleStartSession}
          />
        ) : currentView === 'analytics' ? (
          <AnalyticsView
            stats={stats}
            getChapterStats={getChapterStats}
            resetAllProgress={resetAllProgress}
          />
        ) : (
          <DashboardView
            onStartSession={handleStartSession}
            onNavigateChapters={() => setCurrentView('chapters')}
            onNavigateSets={() => setCurrentView('sets')}
            onNavigateSaved={() => setCurrentView('saved')}
            stats={stats}
            getChapterStats={getChapterStats}
          />
        )}
      </main>

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectQuestion={handleSelectQuestionFromSearch}
        isQuestionSaved={isQuestionSaved}
      />

      {/* Footer */}
      {currentView !== 'practice' && (
        <footer className="border-t border-slate-200/80 bg-white py-8 px-4 text-center mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
            <div className="font-semibold text-slate-700">
              <span className="text-emerald-700 font-bold">Science Master</span> — এইচএসসি ও মেডিকেল ভর্তি পরীক্ষার বিজ্ঞান প্রস্তুতি প্ল্যাটফর্ম (উদ্ভিদবিজ্ঞান, প্রাণিবিজ্ঞান, পদার্থবিজ্ঞান ও রসায়ন)
            </div>
            <div className="flex items-center space-x-3 font-medium text-slate-400 text-[11px]">
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">বোটানি: ১২টি অধ্যায় • ১,৬৯১টি MCQ</span>
              <span>•</span>
              <span>প্রাণিবিজ্ঞান, পদার্থবিজ্ঞান ও রসায়ন সেকশন সংযুক্ত হচ্ছে</span>
              <span>•</span>
              <span>অফলাইন প্রগ্রেস সেভ</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
