import { useEffect, useState } from "react";
import ArticleCard from "../ArticleCard/ArticleCard";
import "./Articles.css";
import { getArticles } from "../../utils/util-api-calls";
import SearchBar from "../SearchBar/SearchBar";
import { useSearchParams } from "react-router-dom";

function Articles() {
	const [articles, setArticles] = useState([]);
	const [articlesLoading, setArticlesLoading] = useState(true);
	const [searchParams, setSearchParams] = useSearchParams({});

	useEffect(() => {
		setArticlesLoading(true);
		getArticles({ params: searchParams })
			.then((res) => {
				setArticlesLoading(false);
				setArticles(res.data.articles);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [searchParams]);

	console.dir(searchParams);

	return (
		<>
			<SearchBar searchParams={searchParams} setSearchParams={setSearchParams} />
			{articlesLoading ? (
				<h2>Loading ...</h2>
			) : (
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
