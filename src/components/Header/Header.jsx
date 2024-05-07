import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
	return (
		<div className="header">
			<h1 className="title">{"NC\nNews"}</h1>
			<nav className="nav-bar">
				<Link to="/" className="nav-link">
					Home
				</Link>
				<Link to="/articles" className="nav-link">
					Articles
				</Link>
				<Link to="/post-article" className="nav-link">
					{"Post Article"}
				</Link>
				<li className="nav-user">
					<img src="https://http.cat/images/100.jpg" alt="" className="user-image" />
					<p>Username</p>
				</li>
			</nav>
		</div>
	);
}

export default Header;
