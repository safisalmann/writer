import { useState, useEffect, useCallback } from 'react';
import { UserProgress, OptionIndex, Subject } from '../types';
import { ALL_QUESTIONS, getQuestionsForSubject } from '../data/questions';

const STORAGE_KEY = 'biology_master_user_progress_v2';

const defaultProgress: UserProgress = {
  answers: {},
  savedQuestionIds: [],
  completedSets: {}
};

export function useProgress(currentSubject: Subject = 'zoology') {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('botany_master_user_progress_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load progress from localStorage', e);
    }
    return defaultProgress;
  });

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  }, [progress]);

  // Record an answer
  const recordAnswer = useCallback((questionId: string, selectedOption: OptionIndex, isCorrect: boolean) => {
    setProgress(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: {
          selectedOption,
          isCorrect,
          answeredAt: Date.now()
        }
      }
    }));
  }, []);

  // Toggle save for later (bookmark)
  const toggleSaveQuestion = useCallback((questionId: string) => {
    setProgress(prev => {
      const isSaved = prev.savedQuestionIds.includes(questionId);
      const newSaved = isSaved
        ? prev.savedQuestionIds.filter(id => id !== questionId)
        : [...prev.savedQuestionIds, questionId];
      return {
        ...prev,
        savedQuestionIds: newSaved
      };
    });
  }, []);

  const isQuestionSaved = useCallback((questionId: string) => {
    return progress.savedQuestionIds.includes(questionId);
  }, [progress.savedQuestionIds]);

  // Mark set as completed
  const completeSet = useCallback((setId: string, score: number, total: number) => {
    setProgress(prev => ({
      ...prev,
      completedSets: {
        ...prev.completedSets,
        [setId]: {
          completedAt: Date.now(),
          score,
          total
        }
      }
    }));
  }, []);

  // Reset all progress
  const resetAllProgress = useCallback(() => {
    setProgress({
      answers: {},
      savedQuestionIds: [],
      completedSets: {}
    });
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('botany_master_user_progress_v1');
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Clear answers for a specific chapter
  const resetChapterProgress = useCallback((chapterId: number, subject: Subject = currentSubject) => {
    setProgress(prev => {
      const newAnswers = { ...prev.answers };
      const prefix = subject === 'physics' ? `phy_ch${chapterId}_` : subject === 'zoology' ? `zoo_ch${chapterId}_` : `ch${chapterId}_`;
      Object.keys(newAnswers).forEach(qId => {
        if (qId.startsWith(prefix)) {
          delete newAnswers[qId];
        }
      });
      return {
        ...prev,
        answers: newAnswers
      };
    });
  }, [currentSubject]);

  const matchesSubject = useCallback((qId: string, subject: Subject) => {
    if (subject === 'physics') return qId.startsWith('phy_');
    if (subject === 'zoology') return qId.startsWith('zoo_');
    return !qId.startsWith('phy_') && !qId.startsWith('zoo_');
  }, []);

  // Subject-specific and overall Statistics
  const subjectQuestions = getQuestionsForSubject(currentSubject);
  const totalQuestions = subjectQuestions.length;
  
  const subjectAnswers = Object.entries(progress.answers).filter(([qId]) => {
    return matchesSubject(qId, currentSubject);
  });

  const answeredCount = subjectAnswers.length;
  const correctCount = subjectAnswers.filter(([, a]) => a.isCorrect).length;
  const incorrectCount = answeredCount - correctCount;
  const overallAccuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
  const completionPercentage = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  const subjectSavedCount = progress.savedQuestionIds.filter(qId => {
    return matchesSubject(qId, currentSubject);
  }).length;

  // Chapter specific stats helper
  const getChapterStats = useCallback((chapterId: number, chapterTotalQuestions: number, subject: Subject = currentSubject) => {
    const prefix = subject === 'physics' ? `phy_ch${chapterId}_` : subject === 'zoology' ? `zoo_ch${chapterId}_` : `ch${chapterId}_`;
    let answered = 0;
    let correct = 0;

    Object.entries(progress.answers).forEach(([qId, record]) => {
      if (qId.startsWith(prefix)) {
        answered++;
        if (record.isCorrect) correct++;
      }
    });

    const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;
    const progressPercent = chapterTotalQuestions > 0 ? Math.round((answered / chapterTotalQuestions) * 100) : 0;

    return {
      answered,
      correct,
      incorrect: answered - correct,
      accuracy,
      progressPercent,
      total: chapterTotalQuestions
    };
  }, [progress.answers, currentSubject]);

  return {
    progress,
    recordAnswer,
    toggleSaveQuestion,
    isQuestionSaved,
    completeSet,
    resetAllProgress,
    resetChapterProgress,
    stats: {
      totalQuestions,
      answeredCount,
      correctCount,
      incorrectCount,
      overallAccuracy,
      completionPercentage,
      savedCount: subjectSavedCount,
      completedSetsCount: Object.keys(progress.completedSets).length
    },
    getChapterStats
  };
}
