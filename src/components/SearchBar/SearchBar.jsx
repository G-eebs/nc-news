import { useEffect, useState } from "react";
import { getTopics } from "../../utils/util-api-calls";
import { capitaliseFirstLetter } from "../../utils/util-data-formatters";
import "./SearchBar.css";
import ErrorComponent from "../ErrorComponent/ErrorComponent";

function SearchBar({ searchParams, setSearchParams }) {
	const [topics, setTopics] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		getTopics()
			.then((res) => {
				setTopics(res.data.topics);
			})
			.catch((err) => {
				setError(err.response);
			});
	}, []);

	function handleTopicSelect(event) {
		const selectedTopic = event.target.value;
		const newParams = new URLSearchParams(searchParams);
		newParams.set("topic", selectedTopic);
		setSearchParams(newParams);
	}

	function handleSortBySelect(event) {
		const selectedSortBy = event.target.value;
		const newParams = new URLSearchParams(searchParams);
		newParams.set("sort_by", selectedSortBy);
		setSearchParams(newParams);
	}

	function handleOrderClick(event) {
		const newOrder = event.target.textContent === "Desc" ? "asc" : "desc";
		const newParams = new URLSearchParams(searchParams);
		newParams.set("order", newOrder);
		setSearchParams(newParams);
	}

	return (
		<nav className="search-bar">
			{error ? (
				<ErrorComponent status={error.status} message={error.data.msg} small={true} />
			) : (
				<div className="search-topic">
					<label htmlFor="topic" className="search-label">
						Topic
					</label>
					<select
						name="topic"
						id="topic"
						onChange={handleTopicSelect}
						className="search-select"
						value={searchParams.get("topic") || ""}
					>
						<option value="">All</option>
						{topics.map((topic) => {
							const topicName = capitaliseFirstLetter(topic.slug);
							return (
								<option value={topic.slug} key={topic.slug}>
									{topicName}
								</option>
							);
						})}
					</select>
				</div>
			)}

			<div className="search-sort-by">
				<label htmlFor="sort-by" className="search-label">
					Sort By
				</label>
				<select
					name="topic"
					id="sort-by"
					onChange={handleSortBySelect}
					className="search-select"
					value={searchParams.get("sort_by") || ""}
				>
					<option value="created_at">Date</option>
					<option value="comment_count">Comments</option>
					<option value="votes">Votes</option>
				</select>
			</div>

			<div className="search-order">
				<label htmlFor="order" className="search-label">
					Order
				</label>
				<button type="button" id="order" onClick={handleOrderClick} className="search-order-button">
					{capitaliseFirstLetter(searchParams.get("order")) || "Desc"}
				</button>
			</div>
		</nav>
	);
}

export default SearchBar;
