export default function NumberInput(className, label, name, min = 1, max = 10) {
  return `
    <div class="${className}">
        <label for="${name}">${label}</label>
        <input type="number" id="${name}" name="${name}" min="${min}" max="${max}" value="${max}" required />
    </div>
  `;
}
