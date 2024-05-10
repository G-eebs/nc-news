import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Articles from "./components/Articles/Articles";
import Article from "./components/Article/Article";
import ErrorComponent from "./components/ErrorComponent/ErrorComponent";

function App() {
	return (
		<>
			<Header />
			<Routes>
        <Route path="/articles" element={<Articles />} ></Route>
        <Route path="/articles/:article_id" element={<Article />} ></Route>
				<Route path="*" element={<ErrorComponent status="404" message="Page Not Found" />} />
      </Routes>
		</>
	);
}

export default App;
