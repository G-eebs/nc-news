import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://northcoders-news-api-zzkn.onrender.com/api"
});

export function getArticles(options) {
	return newsApi.get("/articles", options);
}

export function getArticleById(article_id) {
  return newsApi.get(`/articles/${article_id}`);
}

export function getArticleComments(article_id) {
  return newsApi.get(`/articles/${article_id}/comments`)
}

export function voteOnArticle(article_id, vote) {
  return newsApi.patch(`/articles/${article_id}`, { inc_votes: vote })
}

export function getUser(username) {
  return newsApi.get(`/users/${username}`)
}

export function postComment(article_id, userComment) {
  return newsApi.post(`/articles/${article_id}/comments`, userComment)
}

export function deleteComment(comment_id) {
  return newsApi.delete(`/comments/${comment_id}`)
}