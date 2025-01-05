import { ProgressBar } from "../components/ProgressBar";
import { Question } from "../components/Question";
import { Score } from "../components/Score";
import xIcon from "../../../assets/icons/x.svg";

export function QuizView(quiz) {
  const questions = quiz ? quiz.results : [];
  const currentQuestionIndex = quiz ? quiz.current_question : 0;
  return `
  <header>
    <div class="wrapper">
      <button class="close-button">
          <img src="${xIcon}" alt="Close" />
      </button>
      ${ProgressBar(10)}
      ${Score()}
    </div>
  </header>
  <main>
    ${Question(questions[currentQuestionIndex])}
  </main>
 `;
}
