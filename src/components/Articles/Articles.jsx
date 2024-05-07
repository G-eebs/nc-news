import { useEffect, useState } from "react";
import axios from "axios";
import ArticleCard from "../ArticleCard/ArticleCard"
import "./Articles.css"

function AllArticles() {
	const [articles, setArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(true)

	useEffect(() => {
    setArticlesLoading(true)
		axios
			.get("https://northcoders-news-api-zzkn.onrender.com/api/articles")
			.then((res) => {
        setArticlesLoading(false)
				setArticles(res.data.articles);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	console.log(articles);

	return articlesLoading ? <h3>Loading ...</h3> : (
		<div className="articles">
      {articles.map(article => {
        return <ArticleCard articleData={article} />
      })}
		</div>
	);
}

export default AllArticles;
