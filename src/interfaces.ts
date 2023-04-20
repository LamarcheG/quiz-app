export interface IQuestionItem {
  id: string;
  question: string;
  isAnswered: boolean;
  answer: string;
  type: QuestionType;
}

export interface MultipleChoiceQuestion extends IQuestionItem {
  type: QuestionType.MultipleChoice;
  choices: string[];
}

export interface TrueFalseQuestion extends IQuestionItem {
  type: QuestionType.TrueFalse;
}

export interface FillInTheBlankQuestion extends IQuestionItem {
  type: QuestionType.FillInTheBlank;
}

export interface ShortAnswerQuestion extends IQuestionItem {
  type: QuestionType.ShortAnswer;
}

export enum QuestionType {
  MultipleChoice = "MultipleChoice",
  TrueFalse = "TrueFalse",
  FillInTheBlank = "FillInTheBlank",
  ShortAnswer = "ShortAnswer",
}

export interface User {
  user: {
    uid: string;
    name: string;
    email: string;
  };
}

export interface BasicStat {
  nbOfStats: number;
  averageScore: number;
  averageTime: number;
}

export interface StackWithStats {
  id: string;
  name: string;
  stats: BasicStat;
}
