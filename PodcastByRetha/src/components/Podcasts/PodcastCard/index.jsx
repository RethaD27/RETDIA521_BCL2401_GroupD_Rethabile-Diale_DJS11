import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./styles.css";

export default function PodcastsCard({ item = {} }) {
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);

  useEffect(() => {
    // Load favorite episodes from localStorage on component mount
    const storedFavorites =
      JSON.parse(localStorage.getItem("favoriteEpisodes")) || [];
    setFavoriteEpisodes(storedFavorites);
  }, []);

  const isFavorite = (episodeId) =>
    favoriteEpisodes.some((ep) => ep.id === episodeId);

  const handleFavoriteClick = (episode, seasonIndex, showTitle) => {
    const updatedFavorites = isFavorite(episode.id)
      ? favoriteEpisodes.filter((ep) => ep.id !== episode.id)
      : [
          ...favoriteEpisodes,
          { ...episode, season: seasonIndex + 1, show: showTitle },
        ];

    setFavoriteEpisodes(updatedFavorites);
    localStorage.setItem("favoriteEpisodes", JSON.stringify(updatedFavorites));
  };

  if (!item || !item.id) {
    return <div>Loading...</div>; // or some other fallback content
  }

  return (
    <Link to={`/podcast/${item.id}`}>
      <div className="podcast-card">
        <img
          src={item.displayImage}
          alt={item.title}
          className="podcast-image"
        />
        <h4 className="podcast-title">{item.title}</h4>
        <h5 className="podcast-para">
          Last Update: {new Date(item.updated).toLocaleDateString()}
        </h5>
        <h6 className="podcast-para">Genre: {item.genre}</h6>
      </div>
    </Link>
  );
}

PodcastsCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    displayImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    updated: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    seasons: PropTypes.arrayOf(
      PropTypes.shape({
        episodeCount: PropTypes.number.isRequired,
        episodes: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

PodcastsCard.defaultProps = {
  item: {},
};
