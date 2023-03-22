import { parseBruteText } from "../Utility/QuestionParser";

describe("QuestionParser", () => {
  it("should parse a question", () => {
    const question = parseBruteText(
      "q: Why is the sky blue? \n a: Because it is."
    );

    expect(question).toEqual(["Why is the sky blue?"]);
  });
});
