import { useDispatch, useSelector } from "react-redux";
import Button from "../CommonComponents/Button";
import PropTypes from "prop-types";
import { addFavorite, removeFavorite } from "../../slices/favouriteSlice";

export default function EpisodeDetails({
  index,
  title,
  description,
  audioFile,
  onClick,
  episodeId,
  showTitle, // added prop for show title
  seasonIndex, // added prop for season index
}) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.episodes);

  const isFavorite = favorites.some((episode) => episode.id === episodeId);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFavorite(episodeId));
    } else {
      dispatch(
        addFavorite({
          id: episodeId,
          title,
          description,
          audioFile,
          show: showTitle,
          season: seasonIndex + 1,
        })
      );
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <h1 style={{ textAlign: "left", marginBottom: 0 }}>
        {index}. {title}
      </h1>
      <p style={{ marginLeft: "1.5rem" }} className="podcast-description">
        {description}
      </p>
      <Button
        text={"Play"}
        onClick={() => onClick(audioFile)}
        width={"100px"}
      />
      <Button
        text={isFavorite ? "Unfavorite" : "Favorite"}
        onClick={handleFavoriteClick}
        width={"100px"}
      />
    </div>
  );
}

EpisodeDetails.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  audioFile: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  episodeId: PropTypes.number.isRequired,
  showTitle: PropTypes.string.isRequired, // added prop type
  seasonIndex: PropTypes.number.isRequired, // added prop type
};
