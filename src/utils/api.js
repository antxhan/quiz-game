export const api = {
  async request(endpoint, params = null) {
    const baseUrl = "https://opentdb.com";
    const url = new URL(endpoint, baseUrl);
    if (params) url.search = new URLSearchParams(params);
    const response = await fetch(url);
    return response.json();
  },
  categories() {
    const endpoint = "/api_category.php";
    return this.request(endpoint);
  },
};
