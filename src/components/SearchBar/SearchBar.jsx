import { useEffect, useState } from "react";
import { getTopics } from "../../utils/util-api-calls";
import { capitaliseTopic } from "../../utils/util-data-formatters";
import "./SearchBar.css"

function SearchBar({ setSearchParams }) {
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
		setSearchParams((current) => {
			return { ...current, topic: selectedTopic };
		});
	}


	return (
		<nav className="search-bar">
			<div className="search-topic">
				<label htmlFor="topic" className="search-topic-label">Topic</label>
				<select name="topic" id="topic" onChange={handleTopicSelect} className="search-topic-select">
					<option value="" >All</option>
					{topics.map((topic) => {
						const topicName = capitaliseTopic(topic.slug);
						return (
							<option value={topic.slug} key={topic.slug} >
								{topicName}
							</option>
						);
					})}
				</select>
			</div>
		</nav>
	);
}

export default SearchBar;
