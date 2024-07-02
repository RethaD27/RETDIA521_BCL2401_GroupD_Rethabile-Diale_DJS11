import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";

export default function FavoritesList() {
  const favoriteEpisodes = useSelector((state) => state.favorites.episodes);
  const [sortedEpisodes, setSortedEpisodes] = useState([...favoriteEpisodes]);

  const sortByTitleAZ = () => {
    const sorted = [...favoriteEpisodes].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setSortedEpisodes(sorted);
  };

  const sortByTitleZA = () => {
    const sorted = [...favoriteEpisodes].sort((a, b) =>
      b.title.localeCompare(a.title)
    );
    setSortedEpisodes(sorted);
  };

  const sortByOldestUpdated = () => {
    const sorted = [...favoriteEpisodes].sort(
      (a, b) => new Date(a.updated) - new Date(b.updated)
    );
    setSortedEpisodes(sorted);
  };

  const resetSort = () => {
    setSortedEpisodes([...favoriteEpisodes]);
  };

  if (favoriteEpisodes.length === 0) {
    return <p>No favorite episodes yet.</p>;
  }

  return (
    <div className="favorites-list">
      <h2>Favorite Episodes</h2>
      <div className="sort-buttons">
        <button onClick={sortByTitleAZ}>Sort by Title (A-Z)</button>
        <button onClick={sortByTitleZA}>Sort by Title (Z-A)</button>
        <button onClick={sortByOldestUpdated}>Sort by Oldest Updated</button>
        <button onClick={resetSort}>Reset</button>
      </div>
      {sortedEpisodes.map((episode, index) => (
        <div key={index} className="favorite-episode">
          <h4>{episode.title}</h4>
          <p>Show: {episode.show}</p>
          <p>Season: {episode.season}</p>
          <Link to={`/podcast/${episode.id}`}>Go to Episode</Link>
        </div>
      ))}
    </div>
  );
}
