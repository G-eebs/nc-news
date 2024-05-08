import { useEffect, useState } from "react";
import { getArticleComments } from "../../utils/util-api-calls";
import { formatDate } from "../../utils/util-data-formatters";
import { HiArrowsUpDown, HiMiniUserCircle, HiCalendarDays, HiChevronDown, HiChevronUp, HiChatBubbleLeftEllipsis } from "react-icons/hi2";
import "./Comments.css";

function Comments({ article_id }) {
	const [comments, setComments] = useState([]);
	const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentsVisible, setCommentsVisible] = useState(true);

	useEffect(() => {
		setCommentsLoading(true);
		getArticleComments(article_id)
			.then((res) => {
				setCommentsLoading(false);
				setComments(res.data.comments);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

  useEffect(()=>{setCommentsVisible(false)}, [])

	return commentsLoading ? (
		<h2>Loading ...</h2>
	) : (
		<section className="comments">
			<div className="comments-heading" onClick={() => {setCommentsVisible(current => !current)}}>
        {commentsVisible ? <HiChevronUp className="comments-heading-icon"/> : <HiChevronDown className="comments-heading-icon"/>}
        <h3 className="comments-heading-text">Comments</h3>
        <div className="comments-heading-count-group">
						<HiChatBubbleLeftEllipsis className="comments-heading-count-icon"/> 
            <p className="comments-heading-count-number">{comments.length}</p>
				</div>
      </div>
			{commentsVisible && comments.map((comment) => {
				return (
					<article className="comment">
						<div className="comment-top-group">
							<p className="comment-author">
								<HiMiniUserCircle /> {comment.author}
							</p>
							<p className="comment-date">
								<HiCalendarDays /> {formatDate(comment.created_at)}
							</p>
						</div>
						<p className="comment-body">{comment.body}</p>
						<div className="comment-vote-group">
							<p className="comment-votes">
								<HiArrowsUpDown /> {comment.votes}
							</p>
						</div>
					</article>
				);
			})}
		</section>
	);
}

export default Comments;
