export function Score(correct) {
  return `
      <div class="score">
      <span class="score__label">Score</span>
      <span class="score__amount">${correct}</span>
      </div>
      `;
}
