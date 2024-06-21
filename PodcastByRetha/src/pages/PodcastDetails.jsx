import { useEffect, useState } from "react";
import Header from "../components/CommonComponents/Header";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import EpisodeDetails from "../components/Podcasts/EpisodeDetails";
import AudioPlayer from "../components/Podcasts/AudioPlayer";

export default function PodcastDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState({});
  const [seasons, setSeasons] = useState([]);
  const [playingFile, setPlayingFile] = useState("");

  // getData is defined only once per render
  useEffect(() => {
    if (id) {
      const getData = async () => {
        try {
          const response = await fetch(
            `https://podcast-api.netlify.app/id/${id}`
          );
          const data = await response.json();

          if (data) {
            console.log("Fetched Podcast Data:", data);
            setPodcast(data);
            setSeasons(data.seasons);
          } else {
            console.log("No such Podcast!");
            toast.error("No such Podcast!");
            navigate("/podcasts");
          }
        } catch (e) {
          toast.error(e.message);
        }
      };

      getData();
    }
  }, [id, navigate]);

  return (
    <div>
      <Header />
      <div className="input-wrapper" style={{ marginTop: "0rem" }}>
        {podcast.id && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                margin: "1rem",
              }}
            >
              <h1 className="podcast-title-heading">{podcast.title}</h1>
            </div>

            <div className="banner-wrapper">
              <img src={podcast.image} alt={podcast.title} />
            </div>
            <p className="podcast-description">{podcast.description}</p>
            <h1 className="podcast-title-heading ">Seasons</h1>
            {seasons.length > 0 ? (
              seasons.map((season, seasonIndex) => (
                <div key={seasonIndex}>
                  <h2>Season {seasonIndex + 1}</h2>
                  {season.episodes.length > 0 ? (
                    season.episodes.map((episode, episodeIndex) => (
                      <EpisodeDetails
                        key={episodeIndex}
                        index={episodeIndex + 1}
                        title={episode.title}
                        description={episode.description}
                        audioFile={episode.file} // Assuming 'file' is the key for the audio URL
                        onClick={(file) => setPlayingFile(file)}
                      />
                    ))
                  ) : (
                    <p>No Episodes</p>
                  )}
                </div>
              ))
            ) : (
              <p>No Seasons</p>
            )}
          </>
        )}
      </div>
      {playingFile && (
        <AudioPlayer audioSrc={playingFile} image={podcast.image} />
      )}
    </div>
  );
}
