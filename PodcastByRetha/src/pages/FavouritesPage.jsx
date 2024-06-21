import { useSelector } from "react-redux";
import Header from "../components/CommonComponents/Header";
import EpisodeDetails from "../components/Podcasts/EpisodeDetails";

export default function FavoriteEpisodesPage() {
  const favorites = useSelector((state) => state.favorites.episodes);

  return (
    <div>
      <Header />
      <div className="input-wrapper" style={{ marginTop: "2rem" }}>
        <h1>Your Favourite Episodes</h1>
        {favorites.length > 0 ? (
          <div className="podcasts-flex" style={{ marginTop: "1.5rem" }}>
            {favorites.map((episode, index) => (
              <EpisodeDetails
                key={index}
                index={index + 1}
                title={episode.title}
                description={episode.description}
                audioFile={episode.audioFile}
                episodeId={episode.id}
                onClick={() => {}}
              />
            ))}
          </div>
        ) : (
          <p>No favourite episodes found.</p>
        )}
      </div>
    </div>
  );
}
