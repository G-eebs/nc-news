import { useContext, useEffect, useState } from "react";
import { deleteComment, getArticleComments } from "../../utils/util-api-calls";
import { formatDate } from "../../utils/util-data-formatters";
import {
	HiArrowsUpDown,
	HiMiniUserCircle,
	HiCalendarDays,
	HiChevronDown,
	HiChevronUp,
	HiChatBubbleLeftEllipsis,
} from "react-icons/hi2";
import "./Comments.css";
import PostComment from "../PostComment/PostComment";
import { UserContext } from "../../contexts/User";
import ErrorComponent from "../ErrorComponent/ErrorComponent";

function Comments({ article_id }) {
	const { user } = useContext(UserContext);
	const [comments, setComments] = useState([]);
	const [commentsLoading, setCommentsLoading] = useState(true);
	const [commentsVisible, setCommentsVisible] = useState(false);
	const [commentsError, setCommentsError] = useState(null);
	const [commentDeleting, setCommentDeleting] = useState(false);

	useEffect(() => {
		setCommentsLoading(true);
		getArticleComments(article_id)
			.then((res) => {
				setCommentsLoading(false);
				setComments(res.data.comments);
			})
			.catch((err) => {
				setCommentsLoading(false);
				setCommentsError(err.response);
			});
	}, []);

	function handleDelete(event) {
		setCommentDeleting(true);
		const comment_id = +event.target.dataset.comment_id;
		deleteComment(comment_id)
			.then(() => {
				setComments((current) => {
					const deletedIndex = current.findIndex((element) => element.comment_id === comment_id);
					current[deletedIndex] = { deletedMessage: <p className="comment-deleted-message">Comment Deleted</p> }
					return [...current]
				});
				setCommentDeleting(false);
			})
			.catch((err) => {
				setCommentDeleting(false);
				setComments((current) => {
					const comment = current.find((element) => element.comment_id === comment_id);
					comment.deleteError = err.response;
					return [...current];
				});
			});
	}

	return (
		<section className="comments">
			<div
				className="comments-heading"
				onClick={() => {
					setCommentsVisible((current) => !current);
				}}
			>
				{commentsVisible ? (
					<HiChevronUp className="comments-heading-icon" />
				) : (
					<HiChevronDown className="comments-heading-icon" />
				)}
				<h3 className="comments-heading-text">Comments</h3>
				<div className="comments-heading-count-group">
					<HiChatBubbleLeftEllipsis className="comments-heading-count-icon" />
					<p className="comments-heading-count-number">{comments.length}</p>
				</div>
			</div>
			
			{commentsError ? (
				<ErrorComponent status={commentsError.status} message={commentsError.data.msg} />
			) : commentsVisible && commentsLoading ? (
				<h2>Comments Loading ...</h2>
			) : (
				<>
					{commentsVisible && <PostComment article_id={article_id} setComments={setComments} />}
					{commentsVisible &&
						comments.map((comment) => {
							return comment.deletedMessage ? comment.deletedMessage : (
								<article className="comment" key={comment.comment_id}>
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
									{user.username === comment.author && (
										<button
											type="button"
											onClick={handleDelete}
											className={"comment-delete-button"}
											data-comment_id={comment.comment_id}
											disabled={commentDeleting}
										>
											Delete
										</button>
									)}
									{comment.deleteError && <ErrorComponent status={comment.deleteError.status} message={comment.deleteError.data.msg} small={true} />}
								</article>
							);
						})}
				</>
			)}
		</section>
	);
}

export default Comments;
