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
  const questionStackId = localStorage.getItem("questionStackId");
  if (questionStackId) {
    return parseInt(questionStackId);
  }
  return 0;
};

export const setQuestionStackIdToLocalStorage = (
  questionStack: IQuestionItem[]
) => {
  //get highest id from questionStack
  let highestId = 0;
  questionStack.forEach((question) => {
    if (question.id > highestId) {
      highestId = question.id;
    }
  });
  localStorage.setItem("questionStackId", highestId.toString());
};
