const questionKeywords = ["Question", "question", "Q", "q"];
const answerKeywords = ["Answer", "answer", "A", "a"];
const multipleChoiceKeywords = ["MultipleChoice", "multiplechoice", "MC", "mc"];

export const parseBruteText = (text: string) => {
  const questions: string[] = [];
  const answers: string[] = [];
  const lines = text.split(/\r?\n/);

  lines.forEach((line) => {
    if (isLineQuestion(line)) {
      line = formatQuestion(line);
      questions.push(line);
    } else if (isLineAnswer(line)) {
      line = formatAnswer(line);
      answers.push(line);
    }
  });

  console.log(questions, answers);
};

const isLineQuestion = (line: string) => {
  //check if line contains any of the keywords
  const containsKeyword = questionKeywords.some((keyword) =>
    line.includes(keyword)
  );

  return containsKeyword && line.includes("?");
};
const isLineAnswer = (line: string) => {
  //check if line contains any of the keywords
  const containsKeyword = answerKeywords.some((keyword) =>
    line.includes(keyword)
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
  //remove keywords
  questionKeywords.forEach((keyword) => {
    question = question.replace(keyword, "");
  });

  //remove :
  question = question.replace(":", "");
  // remove whitespace at beginning and end
  question = question.trim();

  return question;
};
const formatAnswer = (answer: string) => {
  //remove keywords
  answerKeywords.forEach((keyword) => {
    answer = answer.replace(keyword, "");
  });
  //remove :
  answer = answer.replace(":", "");
  // remove whitespace at beginning and end
  answer = answer.trim();
  return answer;
};
const formatMultipleChoice = (choices: string[]) => {
  //remove keywords
  multipleChoiceKeywords.forEach((keyword) => {
    choices = choices.map((choice) => choice.replace(keyword, ""));
  });
  return choices;
};
