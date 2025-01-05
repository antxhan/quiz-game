export function ProgressBar(progress = 0) {
  return `
    <div class="progress-bar">
      <div class="progress-bar__progress" style="width: ${progress}%"></div>
    </div>
    `;
}
