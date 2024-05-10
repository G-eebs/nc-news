import { useContext, useState } from "react";
import { UserContext } from "../../contexts/User";
import { postComment } from "../../utils/util-api-calls";
import "./PostComment.css";
import ErrorComponent from "../ErrorComponent/ErrorComponent";

function PostComment({ article_id, setComments }) {
	const { user } = useContext(UserContext);
	const [newComment, setNewComment] = useState("");
  const [commentPosting , setCommentPosting] = useState(false)
	const [error, setError] = useState(null);

	function handleSubmit(event) {
		event.preventDefault();
    setCommentPosting(true)
		setError(null)
		postComment(article_id, { username: user.username, body: newComment })
			.then((res) => {
				setComments((current) => [res.data.postedComment, ...current]);
				setNewComment("");
        setCommentPosting(false)
			})
			.catch((err) => {
        setCommentPosting(false)
        setError(err.response)
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
			{error && <ErrorComponent status={error.status} message={error.data.msg} small={true} />}
		</>
	);
}

export default PostComment;
