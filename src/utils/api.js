import { db } from "./db";

export const api = {
  async _request(endpoint, params = null) {
    console.log("requesting from API");
    const baseUrl = "https://opentdb.com";
    const url = new URL(endpoint, baseUrl);
    if (params) url.search = new URLSearchParams(params);
    const response = await fetch(url);
    return response.json();
  },
  async categories() {
    const cachedCategories = db.getCategories();
    if (cachedCategories && cachedCategories?.trivia_categories?.length > 0) {
      return cachedCategories;
    } else {
      const endpoint = "/api_category.php";
      const categories = await this._request(endpoint);
      db.setCategories(categories);
      return categories;
    }
  },
  async categoryMaxQuestions(categoryId) {
    const endpoint = `/api_count.php?category=${categoryId}`;
    const cachedCategories = db.getCategories();
    if (cachedCategories) {
      const category = cachedCategories.trivia_categories.find(
        (category) => category.id === parseInt(categoryId)
      );
      if (category && category.question_count) {
        return category.question_count;
      } else {
        const questionCount = await this._request(endpoint);
        category.question_count = questionCount.category_question_count;
        db.setCategories(cachedCategories);
        return questionCount.category_question_count;
      }
    } else {
      const questionCount = await this._request(endpoint);
      return questionCount.category_question_count;
    }
  },
  quiz({
    amount = 10,
    category = null,
    difficulty = null,
    type = "multiple",
    encoding = null,
  } = {}) {
    const endpoint = "/api.php";
    const params = Object.fromEntries(
      Object.entries({ amount, category, difficulty, type, encoding }).filter(
        ([_, value]) => value !== null && value !== ""
      )
    );

    console.log(params);
    return this._request(endpoint, params);

    // const mockQuiz = {
    //   response_code: 0,
    //   results: [
    //     {
    //       type: "multiple",
    //       difficulty: "hard",
    //       category: "Entertainment: Video Games",
    //       question:
    //         "In the &quot;Ace Attorney&quot; series, who was the truly responsible of the forging of the autopsy report of the pivotal IS-7 incident?",
    //       correct_answer: "Bansai Ichiyanagi",
    //       incorrect_answers: [
    //         "Manfred Von Karma",
    //         "Gregory Edgeworth",
    //         "Tateyuki Shigaraki",
    //       ],
    //     },
    //     {
    //       type: "multiple",
    //       difficulty: "medium",
    //       category: "General Knowledge",
    //       question:
    //         "What did the Spanish autonomous community of Catalonia ban in 2010, that took effect in 2012?",
    //       correct_answer: "Bullfighting",
    //       incorrect_answers: ["Fiestas", "Flamenco", "Mariachi"],
    //     },
    //     {
    //       type: "multiple",
    //       difficulty: "easy",
    //       category: "Entertainment: Video Games",
    //       question:
    //         "In &quot;Pheonix Wright: Ace Attorney&quot; which character is the District Chief of Police?",
    //       correct_answer: "Damon Gant",
    //       incorrect_answers: ["Miles Edgeworth", "Lana Skye", "Mike Meekins"],
    //     },
    //     {
    //       type: "multiple",
    //       difficulty: "medium",
    //       category: "Entertainment: Music",
    //       question:
    //         "Which band had hits in 1972 with the songs &quot;Baby I&#039;m A Want You&quot;, &quot;Everything I Own&quot; and &quot;The Guitar Man&quot;",
    //       correct_answer: "Bread",
    //       incorrect_answers: ["America", "Chicago", "Smokie"],
    //     },
    //     {
    //       type: "multiple",
    //       difficulty: "easy",
    //       category: "General Knowledge",
    //       question: "What is the famous Papa John&#039;s last name?",
    //       correct_answer: "Schnatter",
    //       incorrect_answers: ["Chowder", "Williams", "ANDERSON"],
    //     },
    //     {
    //       type: "multiple",
    //       difficulty: "medium",
    //       category: "Entertainment: Video Games",
    //       question:
    //         "What year was the video game streaming platform TwitchTV founded?",
    //       correct_answer: "2011",
    //       incorrect_answers: ["2012", "2010", "2014"],
    //     },
    //     {
    //       type: "multiple",
    //       difficulty: "medium",
    //       category: "Politics",
    //       question: "What year did Gerald Ford Become President?",
    //       correct_answer: "1974",
    //       incorrect_answers: ["1977", "1973", "1969"],
    //     },
    //     {
    //       type: "multiple",
    //       difficulty: "medium",
    //       category: "Entertainment: Music",
    //       question:
    //         "Johnny Cash did a cover of this song written by lead singer of Nine Inch Nails, Trent Reznor.",
    //       correct_answer: "Hurt",
    //       incorrect_answers: ["Closer", "A Warm Place", "Big Man with a Gun"],
    //     },
    //     {
    //       type: "multiple",
    //       difficulty: "hard",
    //       category: "Mythology",
    //       question:
    //         "Who is a minor god that is protector and creator of various arts, such as cheese making and bee keeping.",
    //       correct_answer: "Aristaeus",
    //       incorrect_answers: ["Autonoe", "Carme", "Cephisso"],
    //     },
    //     {
    //       type: "multiple",
    //       difficulty: "easy",
    //       category: "Entertainment: Video Games",
    //       question: "Which of 2 Valve Games are set in the same universe?",
    //       correct_answer: "Half-life and Portal",
    //       incorrect_answers: [
    //         "Portal and Left 4 Dead",
    //         "Half-life and Left 4 Dead",
    //         "Half-life and Counter Strike",
    //       ],
    //     },
    //   ],
    // };
    // return mockQuiz;
  },
};
