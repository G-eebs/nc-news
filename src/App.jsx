import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import AllArticles from "./components/Articles/Articles";

function App() {
	return (
		<>
			<Header />
			<Routes>
        <Route path="/articles" element={<AllArticles />} ></Route>
      </Routes>
		</>
	);
}

export default App;
