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
  },
  setCurrentQuestion(index = 0) {
    const quiz = this.getQuiz();
    quiz.current_question = index;
    localStorage.setItem("quiz", JSON.stringify(quiz));
  },
  getNextQuestion() {
    const quiz = this.getQuiz();
    return quiz.results[quiz.current_question];
  },
  incrementQuestionIndex() {
    const quiz = this.getQuiz();
    quiz.current_question++;
    this.setQuiz(quiz);
  },
};
