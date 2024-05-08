import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://northcoders-news-api-zzkn.onrender.com/api"
});

function getArticles(options) {
	return newsApi.get("/articles", options);
}

function getArticleById(article_id) {
  return newsApi.get(`/articles/${article_id}`);
}

function getArticleComments(article_id) {
  return newsApi.get(`/articles/${article_id}/comments`)
}

export {getArticles, getArticleById, getArticleComments}