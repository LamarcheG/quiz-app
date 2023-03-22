import { parseBruteText } from "../Utility/QuestionParser";

export const QuestionForm = (props: any) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const bruteText = formData.get("bruteText");
    parseBruteText(bruteText as string);
  };
  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <label htmlFor="bruteText">Enter your question and answer here:</label>
      <textarea
        name="bruteText"
        id="bruteText"
        rows={10}
        className="resize p-3"
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};
