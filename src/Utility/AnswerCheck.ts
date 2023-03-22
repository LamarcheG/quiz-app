export const checkAnswer = (answer: string, correctAnswer: string) => {
  let isCorrect = false;
  // remove all spaces and make lowercase
  const answerNoSpaces = answer.replace(/\s/g, "").toLowerCase();
  const correctAnswerNoSpaces = correctAnswer.replace(/\s/g, "").toLowerCase();
  //remove accents
  const answerNoAccents = answerNoSpaces
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const correctAnswerNoAccents = correctAnswerNoSpaces
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  //check if answer is correct
  if (answerNoAccents === correctAnswerNoAccents) {
    isCorrect = true;
  }
  return isCorrect;
};
