import { useEffect, useState } from "react";
import { getTopics } from "../../utils/util-api-calls";
import { capitaliseFirstLetter } from "../../utils/util-data-formatters";
import "./SearchBar.css";
import ErrorComponent from "../ErrorComponent/ErrorComponent";

function SearchBar({ searchParams, setSearchParams, pages }) {
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

	function handlePaginateClick(event) {
		const newLimit = event.target.value === "10" ? 0 : 10;
		const newParams = new URLSearchParams(searchParams);
		newParams.set("limit", newLimit);
		newParams.set("p", 1);
		setSearchParams(newParams);
	}

	function handlePageClick(event) {
		const pageClicked = event.target.innerText
		let newPage = +event.target.innerText || 1
		if (pageClicked === "<") {
			newPage = Math.max(+searchParams.get("p") - 1, 1)
		}
		if (pageClicked === "<<") {
			newPage = 1
		}
		if (pageClicked === ">") {
			newPage = Math.min(+searchParams.get("p") + 1, pages)
		}
		if (pageClicked === ">>") {
			newPage = pages
		}
		const newParams = new URLSearchParams(searchParams);
		newParams.set("p", newPage);
		setSearchParams(newParams);
	}

	return (
		<nav className="search-bar">
			{error ? (
				<ErrorComponent status={error.status} message={error.data.msg} small={true} />
			) : (
				<div className="search-bar-content">
					<div className="search-options">
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
					</div>

					<div className="pagination-selector">
						<label htmlFor="paginate" className="paginate-label">
							Continuous
						</label>
						<input
							type="range"
							id="paginate"
							className="paginate-switch"
							min={0}
							max={10}
							step={10}
							value={searchParams.get("limit") || 0}
							onClick={handlePaginateClick}
							onChange={() => {}}
						></input>
						<label htmlFor="paginate" className="paginate-label">
							Pages
						</label>
					</div>
					{searchParams.get("limit") > 0 && (
						<ol className="paginate-page-numbers">
							<li className="paginate-page-number" onClick={handlePageClick}>{"<"}</li>
							<li className="paginate-page-number" onClick={handlePageClick}>{"<<"}</li>
							{[...Array(pages)].map((element, i) => (
								<li className={"paginate-page-number" + (+searchParams.get("p") === i + 1 ? " paginate-page-number-selected" : "")} onClick={handlePageClick} key={i+1}>{i + 1}</li>
							))}
							<li className="paginate-page-number" onClick={handlePageClick}>{">>"}</li>
							<li className="paginate-page-number" onClick={handlePageClick}>{">"}</li>
						</ol>
					)}
				</div>
			)}
		</nav>
	);
}

export default SearchBar;
