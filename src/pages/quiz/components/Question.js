import { shuffle } from "../../../utils/utils";
import { Answer } from "./Answer";

export function Question({ question, correct_answer, incorrect_answers }) {
  const answers = shuffle([correct_answer, ...incorrect_answers]);
  return `
    <div class="question-container">
      <p>${question}</p>
      <div class="answers-container">
        ${answers.map((answer, index) => Answer(index, answer)).join("")}
      </div>
    </div>
    `;
}
