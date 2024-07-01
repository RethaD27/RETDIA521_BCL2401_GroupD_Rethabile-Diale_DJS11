import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../index.css";

export default function FavoritesList() {
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);

  useEffect(() => {
    // Load favorite episodes from localStorage on component mount
    const storedFavorites =
      JSON.parse(localStorage.getItem("favoriteEpisodes")) || [];
    setFavoriteEpisodes(storedFavorites);
  }, []);

  if (favoriteEpisodes.length === 0) {
    return <p>No favorite episodes yet.</p>;
  }

  return (
    <div className="favorites-list">
      <h2>Favorite Episodes</h2>
      {favoriteEpisodes.map((episode, index) => (
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
