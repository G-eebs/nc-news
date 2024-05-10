import { useEffect, useState } from "react";
import { getTopics } from "../../utils/util-api-calls";
import { capitaliseFirstLetter } from "../../utils/util-data-formatters";
import "./SearchBar.css";

function SearchBar({ searchParams, setSearchParams }) {
	const [topics, setTopics] = useState([]);

	useEffect(() => {
		getTopics()
			.then((res) => {
				setTopics(res.data.topics);
			})
			.catch((error) => {
				console.log(console.error());
			});
	}, []);

	function handleTopicSelect(event) {
		const selectedTopic = event.target.value;
		searchParams.set("topic", selectedTopic);
		setSearchParams(searchParams);
	}

	function handleSortBySelect(event) {
		const selectedSortBy = event.target.value;
		searchParams.set("sort_by", selectedSortBy);
		setSearchParams(searchParams);
	}

	function handleOrderClick(event) {
		const newOrder = event.target.textContent === "Desc" ? "asc" : "desc";
		searchParams.set("order", newOrder);
		setSearchParams(searchParams);
	}

	return (
		<nav className="search-bar">
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
