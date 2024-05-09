import { Link } from "react-router-dom";
import "./Header.css";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/User";
import { getUser } from "../../utils/util-api-calls";

function Header() {
	const { user, setUser } = useContext(UserContext);

	useEffect(() => {
		getUser("grumpy19")
			.then((res) => {
				setUser(res.data.user);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<header className="header">
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
					<img src={user.avatar_url} alt="" className="user-image" />
					<p>{user.username}</p>
				</li>
			</nav>
		</header>
	);
}

export default Header;
