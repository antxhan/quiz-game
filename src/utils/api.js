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
  },
};
