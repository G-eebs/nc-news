import { capitaliseTopic, formatDate } from "../../utils/util-data-formatters";
import "./ArticleCard.css"
import { Link } from "react-router-dom";
import { HiArrowsUpDown, HiChatBubbleLeftEllipsis, HiBookmarkSquare, HiMiniUserCircle, HiCalendarDays } from "react-icons/hi2";

function ArticleCard({ articleData }) {

  const formattedDate = formatDate(articleData.created_at) 
  const capitalisedTopic = capitaliseTopic(articleData.topic)
	
  return (
		<Link to={`/articles/${articleData.article_id}`} className="article-card">
			<h3 className="article-card-title">{articleData.title}</h3>
      <p className="article-card-author"><HiMiniUserCircle /><br/>{articleData.author}</p>
      <Link to={`/articles?topic=${articleData.topic}`} className="article-card-topic"><HiBookmarkSquare /><br/>{capitalisedTopic}</Link>
      <p className="article-card-date"><HiCalendarDays /><br/>{formattedDate}</p>
      <img className="article-card-img" src={articleData.article_img_url} alt="" />
      <p className="article-card-votes"><HiArrowsUpDown /> {articleData.votes}</p>
      <p className="article-card-comment-count"><HiChatBubbleLeftEllipsis /> {articleData.comment_count}</p>
		</Link>
	);
}

export default ArticleCard;
