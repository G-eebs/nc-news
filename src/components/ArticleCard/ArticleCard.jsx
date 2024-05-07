import "./ArticleCard.css"

function ArticleCard({ articleData }) {
  const formattedDate = articleData.created_at.slice(0,10).split("-").reverse().join("-")
  const capitalisedTopic = articleData.topic[0].toUpperCase() + articleData.topic.slice(1)
	console.log(articleData);
	return (
		<div className="article-card">
			<h3 className="article-card-title">{articleData.title}</h3>
      <p className="article-card-date">{formattedDate}</p>
      <p className="article-card-topic">{capitalisedTopic}</p>
      <p className="article-card-author">{articleData.author}</p>
      <img className="article-card-img" src={articleData.article_img_url} alt="" />
      <p className="article-card-votes">Votes: {articleData.votes}</p>
      <p className="article-card-comment-count">Comments: {articleData.comment_count}</p>
		</div>
	);
}

export default ArticleCard;
