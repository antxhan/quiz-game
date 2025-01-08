export default function ToasterErrorMessage(errorCode) {
  return `
    <div class="toaster-error-message">
      <span>Something went wrong... Error: ${errorCode}</span>
    </div>
  `;
}
