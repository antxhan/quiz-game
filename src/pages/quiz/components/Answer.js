export function Answer(index, answer) {
  return `
      <button class="answer-button">
          <span>${index + 1}.</span>
          <span>${answer}</span>
      </button>
      `;
}
