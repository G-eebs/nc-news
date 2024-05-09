import { useEffect, useState } from "react";
import ArticleCard from "../ArticleCard/ArticleCard";
import "./Articles.css";
import { getArticles } from "../../utils/util-api-calls";

function Articles() {
	const [articles, setArticles] = useState([]);
	const [articlesLoading, setArticlesLoading] = useState(true);

	useEffect(() => {
		setArticlesLoading(true);
		getArticles()
			.then((res) => {
				setArticlesLoading(false);
				setArticles(res.data.articles);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return articlesLoading ? (
		<h2>Loading ...</h2>
	) : (
		<div className="articles">
			{articles.map((article) => {
				return <ArticleCard articleData={article} key={article.article_id} />;
			})}
		</div>
	);
}

export default Articles;
