export function Score(amount, correct) {
  return `
      <div class="score">
        <span>Score</span>
        <span class="score__amount">${correct} / ${amount}</span>
      </div>
      `;
}
