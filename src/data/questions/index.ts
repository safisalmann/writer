import { Question, MCQSet, Subject, Chapter } from '../../types';
import { CHAPTERS as BOTANY_CHAPTERS } from '../chapters';
import { ZOOLOGY_CHAPTERS } from '../zoology_chapters';
import { PHYSICS_CHAPTERS } from '../physics_chapters';

// Botany Questions (Ch 1 - 12)
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

// Zoology Questions (Ch 1 - 12)
import { ZOOLOGY_CHAPTER_1_QUESTIONS } from './zoology/zoo_ch1';
import { ZOOLOGY_CHAPTER_2_QUESTIONS } from './zoology/zoo_ch2';
import { ZOOLOGY_CHAPTER_3_QUESTIONS } from './zoology/zoo_ch3';
import { ZOOLOGY_CHAPTER_4_QUESTIONS } from './zoology/zoo_ch4';
import { ZOOLOGY_CHAPTER_5_QUESTIONS } from './zoology/zoo_ch5';
import { ZOOLOGY_CHAPTER_6_QUESTIONS } from './zoology/zoo_ch6';
import { ZOOLOGY_CHAPTER_7_QUESTIONS } from './zoology/zoo_ch7';
import { ZOOLOGY_CHAPTER_8_QUESTIONS } from './zoology/zoo_ch8';
import { ZOOLOGY_CHAPTER_9_QUESTIONS } from './zoology/zoo_ch9';
import { ZOOLOGY_CHAPTER_10_QUESTIONS } from './zoology/zoo_ch10';
import { ZOOLOGY_CHAPTER_11_QUESTIONS } from './zoology/zoo_ch11';
import { ZOOLOGY_CHAPTER_12_QUESTIONS } from './zoology/zoo_ch12';

// Physics Questions (Ch 4 & Ch 5)
import { PHYSICS_CHAPTER_4_QUESTIONS } from './physics/phy_ch4';
import { PHYSICS_CHAPTER_5_QUESTIONS } from './physics/phy_ch5';

export { PHYSICS_CHAPTER_4_QUESTIONS, PHYSICS_CHAPTER_5_QUESTIONS };

export const BOTANY_QUESTIONS: Question[] = [
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
].map(q => ({ ...q, subject: 'botany' as Subject }));

export const ZOOLOGY_QUESTIONS: Question[] = [
  ...ZOOLOGY_CHAPTER_1_QUESTIONS,
  ...ZOOLOGY_CHAPTER_2_QUESTIONS,
  ...ZOOLOGY_CHAPTER_3_QUESTIONS,
  ...ZOOLOGY_CHAPTER_4_QUESTIONS,
  ...ZOOLOGY_CHAPTER_5_QUESTIONS,
  ...ZOOLOGY_CHAPTER_6_QUESTIONS,
  ...ZOOLOGY_CHAPTER_7_QUESTIONS,
  ...ZOOLOGY_CHAPTER_8_QUESTIONS,
  ...ZOOLOGY_CHAPTER_9_QUESTIONS,
  ...ZOOLOGY_CHAPTER_10_QUESTIONS,
  ...ZOOLOGY_CHAPTER_11_QUESTIONS,
  ...ZOOLOGY_CHAPTER_12_QUESTIONS
].map(q => ({ ...q, subject: 'zoology' as Subject }));

export const PHYSICS_QUESTIONS: Question[] = [
  ...PHYSICS_CHAPTER_4_QUESTIONS,
  ...PHYSICS_CHAPTER_5_QUESTIONS
].map(q => ({ ...q, subject: 'physics' as Subject }));

export const ALL_QUESTIONS: Question[] = [
  ...ZOOLOGY_QUESTIONS,
  ...BOTANY_QUESTIONS,
  ...PHYSICS_QUESTIONS
];

export const BOTANY_QUESTIONS_BY_CHAPTER: Record<number, Question[]> = {
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

export const ZOOLOGY_QUESTIONS_BY_CHAPTER: Record<number, Question[]> = {
  1: ZOOLOGY_CHAPTER_1_QUESTIONS,
  2: ZOOLOGY_CHAPTER_2_QUESTIONS,
  3: ZOOLOGY_CHAPTER_3_QUESTIONS,
  4: ZOOLOGY_CHAPTER_4_QUESTIONS,
  5: ZOOLOGY_CHAPTER_5_QUESTIONS,
  6: ZOOLOGY_CHAPTER_6_QUESTIONS,
  7: ZOOLOGY_CHAPTER_7_QUESTIONS,
  8: ZOOLOGY_CHAPTER_8_QUESTIONS,
  9: ZOOLOGY_CHAPTER_9_QUESTIONS,
  10: ZOOLOGY_CHAPTER_10_QUESTIONS,
  11: ZOOLOGY_CHAPTER_11_QUESTIONS,
  12: ZOOLOGY_CHAPTER_12_QUESTIONS
};

export const PHYSICS_QUESTIONS_BY_CHAPTER: Record<number, Question[]> = {
  4: PHYSICS_CHAPTER_4_QUESTIONS,
  5: PHYSICS_CHAPTER_5_QUESTIONS
};

export const QUESTIONS_BY_CHAPTER = ZOOLOGY_QUESTIONS_BY_CHAPTER;

export function getChaptersForSubject(subject: Subject): Chapter[] {
  if (subject === 'physics') return PHYSICS_CHAPTERS;
  if (subject === 'botany') return BOTANY_CHAPTERS;
  return ZOOLOGY_CHAPTERS;
}

export function getQuestionsForSubject(subject: Subject): Question[] {
  if (subject === 'physics') return PHYSICS_QUESTIONS;
  if (subject === 'botany') return BOTANY_QUESTIONS;
  return ZOOLOGY_QUESTIONS;
}

export function getQuestionsByChapterForSubject(subject: Subject): Record<number, Question[]> {
  if (subject === 'physics') return PHYSICS_QUESTIONS_BY_CHAPTER;
  if (subject === 'botany') return BOTANY_QUESTIONS_BY_CHAPTER;
  return ZOOLOGY_QUESTIONS_BY_CHAPTER;
}

// Generate sequential practice sets for each chapter (~25 questions per set)
export function generateChapterSets(chapterId: number, subject: Subject = 'zoology'): MCQSet[] {
  const chapters = getChaptersForSubject(subject);
  const questionsMap = getQuestionsByChapterForSubject(subject);
  const chapter = chapters.find(c => c.id === chapterId);
  const questions = questionsMap[chapterId] || [];
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
      id: `${subject}_set_ch${chapterId}_${i + 1}`,
      chapterId,
      setNumber: i + 1,
      title: `${chapter?.nameBangla || 'অধ্যায়'} - সেট ${i + 1}`,
      description: `প্রশ্ন নং ${startNum} থেকে ${endNum} (${topicsSummary})`,
      questionIds: setQuestions.map(q => q.id)
    });
  }

  return sets;
}

// Generate all sequential sets across all chapters for a given subject
export function getAllMCQSets(subject: Subject = 'zoology'): MCQSet[] {
  const chapters = getChaptersForSubject(subject);
  return chapters.flatMap(ch => generateChapterSets(ch.id, subject));
}

export const ALL_MCQ_SETS: MCQSet[] = getAllMCQSets('zoology');

export function getQuestionById(id: string): Question | undefined {
  return ALL_QUESTIONS.find(q => q.id === id);
}

export function getQuestionsByIds(ids: string[]): Question[] {
  const map = new Map<string, Question>();
  ALL_QUESTIONS.forEach(q => map.set(q.id, q));
  return ids.map(id => map.get(id)).filter((q): q is Question => q !== undefined);
}

export function searchQuestions(query: string, chapterId?: number, subject?: Subject): Question[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  let source: Question[];
  if (subject) {
    const byCh = getQuestionsByChapterForSubject(subject);
    source = chapterId ? (byCh[chapterId] || []) : getQuestionsForSubject(subject);
  } else {
    source = chapterId ? (QUESTIONS_BY_CHAPTER[chapterId] || []) : ALL_QUESTIONS;
  }
  return source.filter(item => {
    return (
      item.question.toLowerCase().includes(q) ||
      item.options.some(opt => opt.toLowerCase().includes(q)) ||
      (item.topic && item.topic.toLowerCase().includes(q)) ||
      (item.source && item.source.toLowerCase().includes(q)) ||
      (item.explanation && item.explanation.toLowerCase().includes(q)) ||
      item.number.toString() === q
    );
  });
}
