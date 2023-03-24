import {
  IQuestionItem,
  MultipleChoiceQuestion,
  QuestionType,
} from "../interfaces";
import { getQuestionStackIdFromLocalStorage } from "../Stores/QuestionstackStore";

const questionKeywords = ["Question", "question", "Q", "q"];
const answerKeywords = ["Answer", "answer", "A", "a"];
const multipleChoiceKeywords = ["-"];

export const parseBruteText = (text: string): IQuestionItem[] => {
  const questionList: IQuestionItem[] = [];

  var currentQuestionId = getQuestionStackIdFromLocalStorage();

  const blocks = splitTextIntoQuestionBlocks(text);
  const linesInBLock: string[][] = [];
  blocks.forEach((block) => {
    const lines = splitTextIntoLines(block);
    linesInBLock.push(lines);
  });

  linesInBLock.forEach((block) => {
    let question = "";
    let answer = "";
    let choices: string[] = [];
    block.forEach((line) => {
      if (isLineQuestion(line)) {
        question = formatQuestion(line);
      } else if (isLineAnswer(line)) {
        answer = formatAnswer(line);
      } else if (isLineMultipleChoice(line)) {
        line = formatMultipleChoice(line);
        choices.push(line);
      }
    });
    const questionItem = buildQuestionItem(
      currentQuestionId,
      question,
      answer,
      choices
    );
    currentQuestionId = currentQuestionId + 1;
    questionList.push(questionItem);
  });

  return questionList;
};

const buildQuestionItem = (
  id: number,
  question: string,
  answer: string,
  choices?: string[]
) => {
  if (choices && choices.length > 0) {
    const questionItem: MultipleChoiceQuestion = {
      id: id,
      question: question,
      isAnswered: false,
      answer: answer,
      type: QuestionType.MultipleChoice,
      choices: choices,
    };
    return questionItem;
  }
  const questionItem: IQuestionItem = {
    id: id,
    question: question,
    isAnswered: false,
    answer: answer,
    type: QuestionType.ShortAnswer,
  };
  return questionItem;
};

export const splitTextIntoQuestionBlocks = (text: string): string[] => {
  var blocks: string[] = [];
  var currentBlock = "";
  const lines = splitTextIntoLines(text);
  lines.forEach((line) => {
    if (!isLineAnswer(line)) {
      currentBlock += line + "\n";
    }
    if (isLineAnswer(line)) {
      currentBlock += line;
      currentBlock = currentBlock.trim();
      blocks.push(currentBlock);
      currentBlock = "";
    }
  });
  return blocks;
};

const splitTextIntoLines = (text: string) => {
  const lines = text.split(/\r?\n/);
  return lines;
};

const isLineQuestion = (line: string) => {
  //check if line contains any of the keywords
  const containsKeyword = questionKeywords.some((keyword) =>
    line.includes(keyword + ":")
  );

  return containsKeyword || line.includes("?");
};

const isLineAnswer = (line: string) => {
  //check if line contains any of the keywords
  const containsKeyword = answerKeywords.some((keyword) =>
    line.includes(keyword + ":")
  );
  return containsKeyword;
};

const isLineMultipleChoice = (line: string) => {
  //check if line contains any of the keywords
  const containsKeyword = multipleChoiceKeywords.some((keyword) =>
    line.includes(keyword)
  );
  return containsKeyword;
};

const formatQuestion = (question: string) => {
  //remove keywords + ":"
  questionKeywords.forEach((keyword) => {
    let match = question.match(keyword + ":");
    if (match) {
      question = question.replace(match[0], "");
    }
  });

  // remove whitespace at beginning and end
  question = question.trim();
  return question;
};

const formatAnswer = (answer: string) => {
  //remove keywords + ":"
  answerKeywords.forEach((keyword) => {
    let match = answer.match(keyword + ":");
    if (match) {
      answer = answer.replace(match[0], "");
    }
  });
  // remove whitespace at beginning and end
  answer = answer.trim();
  return answer;
};

const formatMultipleChoice = (choice: string) => {
  //remove keywords
  let match = choice.match(/-/);
  if (match) {
    choice = choice.replace(match[0], "");
  }
  choice = choice.trim();
  return choice;
};
