export interface IQuestionItem {
  id: number;
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

export enum QuestionType {
  MultipleChoice = "MultipleChoice",
  TrueFalse = "TrueFalse",
  FillInTheBlank = "FillInTheBlank",
  ShortAnswer = "ShortAnswer",
}
