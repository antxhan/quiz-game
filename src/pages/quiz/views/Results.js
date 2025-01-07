export function ResultsView(quiz) {
  console.log(quiz);
  const correct_answers = quiz.answers.correct;
  const incorrect_answers = quiz.answers.incorrect;
  const score = correct_answers.length;
  // show score
  // show results
  return `
    <div>
        <h2>Results</h2>
        <p>You got ${score} out of ${quiz.results.length} questions correct!</p>
        <ul>
            ${incorrect_answers
              .map((answer) => `<li>${answer + 1}</li>`)
              .join("")}
    </div>
    `;
}
