import { IQuestionItem } from "../interfaces";

export const getQuestionStackFromLocalStorage = (): IQuestionItem[] => {
  const questionStack = localStorage.getItem("questionStack");
  if (questionStack) {
    return JSON.parse(questionStack);
  }
  return [];
};

export const setQuestionStackToLocalStorage = (
  questionStack: IQuestionItem[]
) => {
  localStorage.setItem("questionStack", JSON.stringify(questionStack));
};

export const getQuestionStackIdFromLocalStorage = (): number => {
  const questionStack = getQuestionStackFromLocalStorage();
  if (questionStack.length > 0) {
    return questionStack[questionStack.length - 1].id + 1;
  }
  return 0;
};

export const setQuestionStackIdToLocalStorage = (id: number) => {
  localStorage.setItem("questionStackId", id.toString());
};
