import { capitaliseFirstLetter, formatDate } from "../../utils/util-data-formatters";
import "./ArticleCard.css"
import { Link } from "react-router-dom";
import { HiArrowsUpDown, HiChatBubbleLeftEllipsis, HiBookmarkSquare, HiMiniUserCircle, HiCalendarDays } from "react-icons/hi2";

function ArticleCard({ articleData, searchParams, setSearchParams }) {

  const formattedDate = formatDate(articleData.created_at) 
  const capitalisedTopic = capitaliseFirstLetter(articleData.topic)
	
  function handleTopicClick() {
		const selectedTopic = articleData.topic;
		searchParams.set("topic", selectedTopic);
		setSearchParams(searchParams);
  }

  return (
		<article className="article-card">
			<Link to={`/articles/${articleData.article_id}`} className="article-card-title">{articleData.title}</Link>
      <p className="article-card-author"><HiMiniUserCircle /><br/>{articleData.author}</p>
      <p onClick={handleTopicClick} className="article-card-topic"><HiBookmarkSquare /><br/>{capitalisedTopic}</p>
      <p className="article-card-date"><HiCalendarDays /><br/>{formattedDate}</p>
      <img className="article-card-img" src={articleData.article_img_url} alt="" />
      <p className="article-card-votes"><HiArrowsUpDown /> {articleData.votes}</p>
      <p className="article-card-comment-count"><HiChatBubbleLeftEllipsis /> {articleData.comment_count}</p>
		</article>
	);
}

export default ArticleCard;
