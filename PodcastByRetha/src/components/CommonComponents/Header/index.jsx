import "./styles.css";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="navbar">
      <div className="gradient"></div>
      <div className="links">
        <Link to="/" className={currentPath === "/" ? "active" : ""}>
          Signup
        </Link>
        <Link
          to="/podcasts"
          className={currentPath === "/podcasts" ? "active" : ""}
        >
          Podcasts
        </Link>
        <Link
          to="/create-a-podcast"
          className={currentPath === "/create-a-podcast" ? "active" : ""}
        >
          Start A Podcast
        </Link>
        <Link
          to="/profile"
          className={currentPath === "/profile" ? "active" : ""}
        >
          Profile
        </Link>
        <Link
          to="/favorites"
          className={currentPath === "/favorites" ? "active" : ""}
        >
          Favorites
        </Link>
      </div>
    </div>
  );
}
