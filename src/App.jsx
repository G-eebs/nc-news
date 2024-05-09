import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Articles from "./components/Articles/Articles";
import Article from "./components/Article/Article";

function App() {
	return (
		<>
			<Header />
			<Routes>
        <Route path="/articles" element={<Articles />} ></Route>
        <Route path="/articles/:article_id" element={<Article />} ></Route>
      </Routes>
		</>
	);
}

export default App;
