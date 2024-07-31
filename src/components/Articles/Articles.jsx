import { useEffect, useState } from "react";
import ArticleCard from "../ArticleCard/ArticleCard";
import "./Articles.css";
import { getArticles } from "../../utils/util-api-calls";
import SearchBar from "../SearchBar/SearchBar";
import { useSearchParams } from "react-router-dom";
import ErrorComponent from "../ErrorComponent/ErrorComponent";

function Articles() {
	const [articles, setArticles] = useState([]);
	const [articlesLoading, setArticlesLoading] = useState(true);
	const [searchParams, setSearchParams] = useSearchParams({limit: 0});
	const [error, setError] = useState(null)

	useEffect(() => {
		setArticlesLoading(true);
		setError(null)
		getArticles({ params: searchParams })
			.then((res) => {
				setArticlesLoading(false);
				setArticles(res.data.articles);
			})
			.catch((err) => {
				setArticlesLoading(false);
				setError(err.response)
			});
	}, [searchParams]);

	return (
		<>
			<SearchBar searchParams={searchParams} setSearchParams={setSearchParams} />
			{articlesLoading ? (
				<h2>Loading ...</h2>
			) : error ? <ErrorComponent status={error.status} message={error.data.msg}/> : (
				<div className="articles">
					{articles.map((article) => {
						return <ArticleCard articleData={article} key={article.article_id} searchParams={searchParams} setSearchParams={setSearchParams} />;
					})}
				</div>
			)}
		</>
	);
}

export default Articles;
