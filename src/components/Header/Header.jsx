import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/User";
import { getUser } from "../../utils/util-api-calls";
import ErrorComponent from "../ErrorComponent/ErrorComponent";

function Header() {
	const { user, setUser } = useContext(UserContext);
	const [error, setError] = useState(null);

	useEffect(() => {
		getUser("grumpy19")
			.then((res) => {
				setUser(res.data.user);
			})
			.catch((err) => {
				setError(err.response);
			});
	}, []);

	const currentLocation = useLocation().pathname

	return (
		<header className="header">
			<h1 className="title">{"NC\nNews"}</h1>
			<nav className="nav-bar">
				<Link to="/" className={"nav-link" + (currentLocation === "/" ? " nav-link-current" : "")}>
					Home
				</Link>
				<Link to="/articles" className={"nav-link" + (currentLocation === "/articles" ? " nav-link-current" : "")}>
					Articles
				</Link>
				<Link to="/post-article" className={"nav-link" + (currentLocation === "/post-article" ? " nav-link-current" : "")}>
					{"Post Article"}
				</Link>
				{error ? (
					<ErrorComponent status={error.status} message={error.data.msg} small={true} />
				) : (
					<li className="nav-user">
						<img src={user.avatar_url} alt="" className="user-image" />
						<p>{user.username}</p>
					</li>
				)}
			</nav>
		</header>
	);
}

export default Header;
