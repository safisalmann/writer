export type OptionIndex = 0 | 1 | 2 | 3;
export type Subject = 'zoology' | 'botany' | 'physics';

export interface Question {
  id: string; // e.g. "ch1_1" or "zoo_ch1_1" or "phy_ch4_1"
  chapterId: number;
  number: number;
  question: string;
  options: [string, string, string, string] | string[]; // [ক, খ, গ, ঘ]
  correctAnswer: OptionIndex | number; // 0 for ক, 1 for খ, 2 for গ, 3 for ঘ
  topic?: string;
  source?: string;
  subject?: Subject;
  explanation?: string;
}

export interface MCQSet {
  id: string; // e.g. "set_1_1"
  chapterId: number;
  setNumber: number;
  title: string;
  description: string;
  questionIds: string[];
}

export interface Chapter {
  id: number;
  number: number;
  nameBangla: string;
  nameEnglish: string;
  shortDesc: string;
  totalQuestions: number;
  topics: string[];
  icon: string;
  color: string;
  gradient: string;
}

export interface AnswerRecord {
  selectedOption: OptionIndex;
  isCorrect: boolean;
  answeredAt: number;
}

export interface UserProgress {
  answers: Record<string, AnswerRecord>; // questionId -> AnswerRecord
  savedQuestionIds: string[]; // difficult questions bookmarked
  completedSets: Record<string, { completedAt: number; score: number; total: number }>;
}

export type ViewMode = 'dashboard' | 'chapters' | 'sets' | 'practice' | 'saved' | 'exam' | 'analytics';

export interface PracticeSessionConfig {
  mode: 'practice' | 'exam' | 'saved';
  subject?: Subject;
  chapterId?: number;
  setId?: string;
  title: string;
  subtitle: string;
  questionIds: string[];
  timeLimitMinutes?: number;
}
