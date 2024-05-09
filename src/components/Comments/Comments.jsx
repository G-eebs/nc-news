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

function Comments({ article_id }) {
	const { user } = useContext(UserContext);
	const [comments, setComments] = useState([]);
	const [commentsLoading, setCommentsLoading] = useState(true);
	const [commentsVisible, setCommentsVisible] = useState(true);
	const [commentDeleting, setCommentDeleting] = useState(false)

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

	useEffect(() => {
		setCommentsVisible(false);
	}, []);

	function handleDelete(event) {
		setCommentDeleting(true)
		const comment_id = +event.target.dataset.comment_id;
		deleteComment(comment_id)
			.then(() => {
				setComments(current => {
					return current.filter(comment => comment.comment_id !== comment_id)
				})
				setCommentDeleting(false)
			})
			.catch((error) => {
				console.log(error);
				setCommentDeleting(false)
				setComments(current => {
					const comment = current.find(element => element.comment_id === comment_id)
					comment.deleteFailed = true
					return [...current]
				})
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
			{commentsVisible && <PostComment article_id={article_id} setComments={setComments} />}
			{commentsLoading ? (
				<h2>Comments Loading ...</h2>
			) : (
				commentsVisible &&
				comments.map((comment) => {
					return (
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
							{comment.deleteFailed && <p className="comment-delete-failed-message">Failed to delete</p>}
						</article>
					);
				})
			)}
		</section>
	);
}

export default Comments;
