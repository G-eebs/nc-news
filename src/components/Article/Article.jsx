import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, voteOnArticle } from "../../utils/util-api-calls";
import { capitaliseTopic, formatDate } from "../../utils/util-data-formatters";
import { HiBookmarkSquare, HiMiniUserCircle, HiCalendarDays, HiArrowUp, HiArrowDown } from "react-icons/hi2";
import "./Article.css";
import Comments from "../Comments/Comments";
import { Link } from "react-router-dom";

function Article() {
	const { article_id } = useParams();
	const [articleData, setArticleData] = useState([]);
	const [articleLoading, setArticleLoading] = useState(true);
	const [articleVote, setArticleVote] = useState(0);

	useEffect(() => {
		setArticleLoading(true);
		getArticleById(article_id)
			.then((res) => {
				setArticleLoading(false);
				setArticleData(res.data.article);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	function handleUpVote() {
		const initialVote = articleVote;
		if (articleVote === -1) {
			setArticleVote(1);
			voteOnArticle(article_id, 2).catch((error) => {
				console.log(error);
				setArticleVote(initialVote);
			});
		} else if (articleVote === 0) {
			setArticleVote(1);
			voteOnArticle(article_id, 1).catch((error) => {
				console.log(error);
				setArticleVote(initialVote);
			});
		} else if (articleVote === 1) {
			setArticleVote(0);
			voteOnArticle(article_id, -1).catch((error) => {
				console.log(error);
				setArticleVote(initialVote);
			});
		}
	}

	function handleDownVote() {
		const initialVote = articleVote;
		if (articleVote === 1) {
			setArticleVote(-1);
			voteOnArticle(article_id, -2).catch((error) => {
				console.log(error);
				setArticleVote(initialVote);
			});
		} else if (articleVote === 0) {
			setArticleVote(-1);
			voteOnArticle(article_id, -1).catch((error) => {
				console.log(error);
				setArticleVote(initialVote);
			});
		} else if (articleVote === -1) {
			setArticleVote(0);
			voteOnArticle(article_id, 1).catch((error) => {
				console.log(error);
				setArticleVote(initialVote);
			});
		}
	}

	return (
		<>
			{articleLoading ? (
				<h2>Article Loading ...</h2>
			) : (
				<article className="article">
					<h2 className="article-title">{articleData.title}</h2>
					<p className="article-author">
						<HiMiniUserCircle />
						<br />
						{articleData.author}
					</p>
					<Link to={`/articles?topic=${articleData.topic}`} className="article-topic">
						<HiBookmarkSquare />
						<br />
						{capitaliseTopic(articleData.topic)}
					</Link>
					<p className="article-date">
						<HiCalendarDays />
						<br />
						{formatDate(articleData.created_at)}
					</p>
					<img className="article-img" src={articleData.article_img_url} alt="" />
					<p className="article-body">{articleData.body}</p>
					<div className="article-vote-group">
						<button
							className={"article-vote-button" + (articleVote > 0 ? " upVoted" : "")}
							id="article-up-vote"
							onClick={handleUpVote}
							type="button"
						>
							<HiArrowUp />
						</button>
						<button
							className={"article-vote-button" + (articleVote < 0 ? " downVoted" : "")}
							id="article-down-vote"
							onClick={handleDownVote}
							type="button"
						>
							<HiArrowDown />
						</button>
						<p className="article-votes">{articleData.votes + articleVote}</p>
					</div>
				</article>
			)}
			<Comments article_id={article_id} />
		</>
	);
}

export default Article;
