import {
  parseBruteText,
  splitTextIntoQuestionBlocks,
} from "../Utility/QuestionParser";

describe("QuestionParser", () => {
  it("should parse a question with any keywords", () => {
    const questionKeywords = ["Question", "question", "Q", "q"];
    const answerKeywords = ["Answer", "answer", "A", "a"];

    let questions = [];

    questionKeywords.forEach((questionKeyword, index) => {
      questions.push(
        parseBruteText(
          `${questionKeywords[index]}: Why is the sky blue?\n${answerKeywords[index]}: Because it is.`
        )
      );
    });

    questions.forEach((question, index) => {
      let expectedQuestion = questionKeywords[index] + ": Why is the sky blue?";
      let expectedAnswer = answerKeywords[index] + ": Because it is.";
      expect(question).toEqual({
        questions: [expectedQuestion],
        answers: [expectedAnswer],
        choices: [],
      });
    });
  });

  it("should parse multiple questions", () => {
    const question = parseBruteText(
      " q: Why is the sky blue? \n a: Because it is. \n q: Why is the grass green? \n a: Because it is."
    );

    expect(question).toEqual({
      questions: ["q: Why is the sky blue?", "q: Why is the grass green?"],
      answers: ["a: Because it is.", "a: Because it is."],
      choices: [],
    });
  });

  it("should parse a multiple choice question", () => {
    const question = parseBruteText(
      "q: What is the capital of France?\n -Paris\n -London\n -Rome\n a: Paris"
    );

    expect(question).toEqual({
      questions: ["q: What is the capital of France?"],
      answers: ["a: Paris"],
      choices: ["-Paris", "-London", "-Rome"],
    });
  });
  it("should split text into question blocks", () => {
    const text = `q: Why is the sky blue? \n a: Because it is. \n q: Why is the grass green? \n a: Because it is. \n q: What is the capital of France? \n -Paris \n -London \n -Rome \n a: Paris`;

    const questionBlocks = splitTextIntoQuestionBlocks(text);

    expect(questionBlocks).toEqual([
      "q: Why is the sky blue? \n a: Because it is.",
      "q: Why is the grass green? \n a: Because it is.",
      "q: What is the capital of France? \n -Paris \n -London \n -Rome \n a: Paris",
    ]);
  });
});
