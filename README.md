# Quiz Website using OpenTDB API

A responsive quiz website powered by the [Open Trivia Database (OpenTDB)](https://opentdb.com/api_config.php). Customize your quiz and enjoy dynamic features for a seamless experience.

**Live Demo**: [https://a-quiz-game.netlify.app/](https://a-quiz-game.netlify.app/)

---

## Features

- **Dynamic Form Validation**: Automatically checks if the selected category, difficulty, and question count are valid, providing real-time feedback.
- **LocalStorage Integration**: Caches data for faster browsing.
- **Error Handling with Notifications**: Displays friendly messages for API errors (e.g., handling the "Art - Hard" bug where only 8 questions are available instead of the 9 advertised).

---

## Usage

1. Choose a **Category** then optioanlly select **Difficulty**, and **Number of Questions**.
2. The form guides you if the inputs are invalid.
3. Start the quiz and have fun!

---

## Known Issue

- **Art - Hard Bug**: API incorrectly reports 9 questions, but only 8 exist. The app informs users and suggests lowering the question count.

---

## Technologies

- **Frontend**: HTML, CSS, Javascript
- **API**: OpenTDB
