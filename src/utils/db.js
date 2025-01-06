export const db = {
  getQuiz() {
    try {
      const quiz = JSON.parse(localStorage.getItem("quiz"));
      return quiz;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  setQuiz(quiz) {
    localStorage.setItem("quiz", JSON.stringify(quiz));
    if (!quiz.current_question) this.setCurrentQuestion(0);
    if (!quiz.score) this.setScore(0);
    if (!quiz.answers) this.setAnswers({ correct: [], incorrect: [] });
  },
  setCurrentQuestion(index = 0) {
    const quiz = this.getQuiz();
    quiz.current_question = index;
    localStorage.setItem("quiz", JSON.stringify(quiz));
  },
  incrementQuestionIndex() {
    const quiz = this.getQuiz();
    quiz.current_question++;
    this.setQuiz(quiz);
  },
  incrementScore() {
    const quiz = this.getQuiz();
    quiz.score++;
    this.setQuiz(quiz);
  },
  setScore(score = 0) {
    const quiz = this.getQuiz();
    quiz.score = score;
    localStorage.setItem("quiz", JSON.stringify(quiz));
  },
  setAnswers(answers = { correct: [], incorrect: [] }) {
    console.log("called");
    const quiz = this.getQuiz();
    quiz.answers = answers;
    localStorage.setItem("quiz", JSON.stringify(quiz));
  },
  setCategories(categories) {
    localStorage.setItem("categories", JSON.stringify(categories));
  },
  getCategories() {
    return JSON.parse(localStorage.getItem("categories") || "[]");
  },
};

// quiz.score = 0;
// quiz.correctlyAnsweredQuestions = [];
