import { useEffect, useState } from "react";
import "./Home.css";
import { getArticles } from "../../utils/util-api-calls";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import ArticleCard from "../ArticleCard/ArticleCard";
import { Link, useSearchParams } from "react-router-dom";
import { capitaliseFirstLetter } from "../../utils/util-data-formatters";

function Home() {
	const [popularArticles, setPopularArticles] = useState([]);
	const [articlesLoading, setArticlesLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchParams, setSearchParams] = useSearchParams({});

	useEffect(() => {
		setArticlesLoading(true);
		setError(null);
		getArticles({ params: { sortBy: "votes", order: "desc" } })
			.then((res) => {
				setArticlesLoading(false);
				const allArticles = res.data.articles;
				const coveredTopics = [];
				const topArticleEachTopic = allArticles.filter((article) => {
					if (!coveredTopics.includes(article.topic)) {
						coveredTopics.push(article.topic);
						return article;
					}
				});
				setPopularArticles(topArticleEachTopic);
			})
			.catch((err) => {
				setArticlesLoading(false);
				setError(err.response);
			});
	}, []);

	return (
		<>
			{articlesLoading ? (
				<h2>Loading ...</h2>
			) : error ? (
				<ErrorComponent status={error.status} message={error.data.msg} />
			) : (
				<>
					<h2 className="home-title">Popular Articles</h2>
					<div className="popular-topics-container">
						{popularArticles.map((article) => {
							return (
								<div className="popular-topic" key={article.topic}>
									<Link to={`/articles?topic=${article.topic}`} className="popular-topic-title">
										{capitaliseFirstLetter(article.topic)}
									</Link>
									<ArticleCard articleData={article} key={article.article_id} searchParams={searchParams} setSearchParams={setSearchParams} />
								</div>
							);
						})}
					</div>
				</>
			)}
		</>
	);
}

export default Home;
