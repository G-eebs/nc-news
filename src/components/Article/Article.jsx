import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../../utils/util-api-calls";
import { capitaliseTopic, formatDate } from "../../utils/util-data-formatters";
import {
	HiBookmarkSquare,
	HiMiniUserCircle,
	HiCalendarDays,
	HiArrowUp,
	HiArrowDown,
} from "react-icons/hi2";
import "./Article.css";
import Comments from "../Comments/Comments";

function Article() {
	const { article_id } = useParams();
	const [articleData, setArticle] = useState([]);
	const [articleLoading, setArticleLoading] = useState(true);

	useEffect(() => {
		setArticleLoading(true);
		getArticleById(article_id)
			.then((res) => {
				setArticleLoading(false);
				setArticle(res.data.article);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<>
			{articleLoading ? (
				<h2>Loading ...</h2>
			) : (
				<article className="article">
					<h2 className="article-title">{articleData.title}</h2>
					<p className="article-author">
						<HiMiniUserCircle />
						<br />
						{articleData.author}
					</p>
					<p className="article-topic">
						<HiBookmarkSquare />
						<br />
						{capitaliseTopic(articleData.topic)}
					</p>
					<p className="article-date">
						<HiCalendarDays />
						<br />
						{formatDate(articleData.created_at)}
					</p>
					<img className="article-img" src={articleData.article_img_url} alt="" />
					<p className="article-body">{articleData.body}</p>
					<div className="article-vote-group">
						<button className="vote-button">
							<HiArrowUp />
						</button>
						<button className="vote-button">
							<HiArrowDown />
						</button>
						<p className="article-votes">{articleData.votes}</p>
					</div>
				</article>
			)}
			<Comments article_id={article_id} />
		</>
	);
}

export default Article;
