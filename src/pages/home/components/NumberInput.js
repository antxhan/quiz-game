export default function NumberInput(
  className,
  label,
  name,
  value = 10,
  min = 1,
  max = 50
) {
  return `
    <div class="${className}">
        <label for="${name}">${label}</label>
        <input type="number" id="${name}" name="${name}" min="${min}" max="${max}" value="${value}" required />
        <span class="error-message">Max: ${max} questions for this category and difficulty</span>
    </div>
  `;
}
