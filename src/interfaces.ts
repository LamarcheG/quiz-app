export interface IQuestionItem {
  id: number;
  question: string;
  choices?: string[];
  answer: string;
  isAnswered: boolean;
  type: QuestionType;
}

export enum QuestionType {
  MultipleChoice = "MultipleChoice",
  TrueFalse = "TrueFalse",
  FillInTheBlank = "FillInTheBlank",
  ShortAnswer = "ShortAnswer",
  Matching = "Matching",
  DragAndDrop = "DragAndDrop",
}
