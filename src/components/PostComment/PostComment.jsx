import { useContext, useState } from "react";
import { UserContext } from "../../contexts/User";
import { postComment } from "../../utils/util-api-calls";
import "./PostComment.css";

function PostComment({ article_id, setComments }) {
	const { user } = useContext(UserContext);
	const [newComment, setNewComment] = useState("");
  const [commentPosting , setCommentPosting] = useState(false)
	const [commentFailed, setCommentFailed] = useState(false);

	function handleSubmit(event) {
		event.preventDefault();
    setCommentPosting(true)
    setCommentFailed(false)
		postComment(article_id, { username: user.username, body: newComment })
			.then((res) => {
				setComments((current) => [res.data.postedComment, ...current]);
				setNewComment("");
        setCommentPosting(false)
			})
			.catch((error) => {
				console.log(error);
        setCommentPosting(false)
        setCommentFailed(true)
			});
	}

	return (
		<>
			<form action="" method="post" onSubmit={handleSubmit} className="post-comment">
				<textarea
					value={newComment}
					onChange={(event) => {
						setNewComment(event.target.value);
					}}
					placeholder="Add a comment..."
					required
					rows={1}
					className="post-comment-input"
				/>
				<button type="submit" className="post-comment-button" disabled={commentPosting}>
					Comment
				</button>
			</form>
			<p className={"post-comment-fail-message" + (commentFailed ? "" : " hidden")}>Comment failed to post, please try again</p>
		</>
	);
}

export default PostComment;
