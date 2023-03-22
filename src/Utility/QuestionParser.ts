const questionKeywords = ["Question", "question", "Q", "q"];
const answerKeywords = ["Answer", "answer", "A", "a"];
const multipleChoiceKeywords = ["-"];

export const parseBruteText = (text: string) => {
  const questions: string[] = [];
  const answers: string[] = [];
  const choices: string[] = [];

  let currentQuestionId = 0;
  const lines = splitTextIntoLines(text);

  lines.forEach((line) => {
    if (isLineQuestion(line)) {
      line = formatQuestion(line);
      questions.push(line);
    } else if (isLineAnswer(line)) {
      line = formatAnswer(line);
      answers.push(line);
      currentQuestionId++;
    } else if (isLineMultipleChoice(line)) {
      line = formatMultipleChoice(line);
      choices.push(line);
    }
  });

  console.log("Questions: ", questions);
  console.log("Answers: ", answers);
  console.log("Choices: ", choices);

  return { questions, answers, choices };
};

const splitTextIntoLines = (text: string) => {
  const lines = text.split(/\r?\n/);
  return lines;
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

const isLineQuestion = (line: string) => {
  //check if line contains any of the keywords
  const containsKeyword = questionKeywords.some((keyword) =>
    line.includes(keyword + ":")
  );

  return containsKeyword && line.includes("?");
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
  // remove whitespace at beginning and end
  question = question.trim();

  return question;
};

const formatAnswer = (answer: string) => {
  answer = answer.trim();
  return answer;
};

const formatMultipleChoice = (choice: string) => {
  //remove keywords
  let match = choice.match(/(MultipleChoice|multiplechoice|MC|mc|-):/);
  if (match) {
    choice = choice.replace(match[0], "");
  }
  choice = choice.trim();
  return choice;
};
