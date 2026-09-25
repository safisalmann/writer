import { Question, MCQSet } from '../../types';
import { CHAPTERS } from '../chapters';

import { CHAPTER_1_QUESTIONS } from './ch1';
import { CHAPTER_2_QUESTIONS } from './ch2';
import { CHAPTER_3_QUESTIONS } from './ch3';
import { CHAPTER_4_QUESTIONS } from './ch4';
import { CHAPTER_5_QUESTIONS } from './ch5';
import { CHAPTER_6_QUESTIONS } from './ch6';
import { CHAPTER_7_QUESTIONS } from './ch7';
import { CHAPTER_8_QUESTIONS } from './ch8';
import { CHAPTER_9_QUESTIONS } from './ch9';
import { CHAPTER_10_QUESTIONS } from './ch10';
import { CHAPTER_11_QUESTIONS } from './ch11';
import { CHAPTER_12_QUESTIONS } from './ch12';

export const ALL_QUESTIONS: Question[] = [
  ...CHAPTER_1_QUESTIONS,
  ...CHAPTER_2_QUESTIONS,
  ...CHAPTER_3_QUESTIONS,
  ...CHAPTER_4_QUESTIONS,
  ...CHAPTER_5_QUESTIONS,
  ...CHAPTER_6_QUESTIONS,
  ...CHAPTER_7_QUESTIONS,
  ...CHAPTER_8_QUESTIONS,
  ...CHAPTER_9_QUESTIONS,
  ...CHAPTER_10_QUESTIONS,
  ...CHAPTER_11_QUESTIONS,
  ...CHAPTER_12_QUESTIONS
];

export const QUESTIONS_BY_CHAPTER: Record<number, Question[]> = {
  1: CHAPTER_1_QUESTIONS,
  2: CHAPTER_2_QUESTIONS,
  3: CHAPTER_3_QUESTIONS,
  4: CHAPTER_4_QUESTIONS,
  5: CHAPTER_5_QUESTIONS,
  6: CHAPTER_6_QUESTIONS,
  7: CHAPTER_7_QUESTIONS,
  8: CHAPTER_8_QUESTIONS,
  9: CHAPTER_9_QUESTIONS,
  10: CHAPTER_10_QUESTIONS,
  11: CHAPTER_11_QUESTIONS,
  12: CHAPTER_12_QUESTIONS
};

// Generate sequential practice sets for each chapter (~25 questions per set)
export function generateChapterSets(chapterId: number): MCQSet[] {
  const chapter = CHAPTERS.find(c => c.id === chapterId);
  const questions = QUESTIONS_BY_CHAPTER[chapterId] || [];
  const sets: MCQSet[] = [];
  const SET_SIZE = 25;

  const totalSets = Math.ceil(questions.length / SET_SIZE);

  for (let i = 0; i < totalSets; i++) {
    const startIdx = i * SET_SIZE;
    const endIdx = Math.min((i + 1) * SET_SIZE, questions.length);
    const setQuestions = questions.slice(startIdx, endIdx);
    const startNum = startIdx + 1;
    const endNum = endIdx;

    // Detect primary topics in this range
    const topicsInRange = Array.from(new Set(setQuestions.map(q => q.topic).filter(Boolean)));
    const topicsSummary = topicsInRange.slice(0, 2).join(' • ') || 'ধারাবাহিক অনুশীলন';

    sets.push({
      id: `set_ch${chapterId}_${i + 1}`,
      chapterId,
      setNumber: i + 1,
      title: `${chapter?.nameBangla || 'অধ্যায়'} - সেট ${i + 1}`,
      description: `প্রশ্ন নং ${startNum} থেকে ${endNum} (${topicsSummary})`,
      questionIds: setQuestions.map(q => q.id)
    });
  }

  return sets;
}

// Generate all sequential sets across all 12 chapters
export const ALL_MCQ_SETS: MCQSet[] = CHAPTERS.flatMap(ch => generateChapterSets(ch.id));

export function getQuestionById(id: string): Question | undefined {
  return ALL_QUESTIONS.find(q => q.id === id);
}

export function getQuestionsByIds(ids: string[]): Question[] {
  const map = new Map<string, Question>();
  ALL_QUESTIONS.forEach(q => map.set(q.id, q));
  return ids.map(id => map.get(id)).filter((q): q is Question => q !== undefined);
}

export function searchQuestions(query: string, chapterId?: number): Question[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const source = chapterId ? (QUESTIONS_BY_CHAPTER[chapterId] || []) : ALL_QUESTIONS;
  return source.filter(item => {
    return (
      item.question.toLowerCase().includes(q) ||
      item.options.some(opt => opt.toLowerCase().includes(q)) ||
      (item.topic && item.topic.toLowerCase().includes(q)) ||
      (item.source && item.source.toLowerCase().includes(q)) ||
      item.number.toString() === q
    );
  });
}
