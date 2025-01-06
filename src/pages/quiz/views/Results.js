export function ResultsView(quiz) {
  console.log(quiz);
  const correct_answers = quiz.answers.correct;
  const incorrect_answers = quiz.answers.incorrect;
  const score = correct_answers.length;
  // show score
  // show results
  return `
    Game over
    `;
}
