import React, { useEffect, useState } from "react";
import Header from "../components/CommonComponents/Header";
import PodcastCard from "../components/Podcasts/PodcastCard/";
import InputComponent from "../components/CommonComponents/Input";

// Genre ID to Title mapping
const genreMap = {
  1: "Personal Growth",
  2: "Investigative Journalism",
  3: "History",
  4: "Comedy",
  5: "Entertainment",
  6: "Business",
  7: "Fiction",
  8: "News",
  9: "Kids and Family",
};

export default function PodcastsPage() {
  const [podcasts, setPodcasts] = useState([]);
  const [originalPodcasts, setOriginalPodcasts] = useState([]); // Store the original podcasts list
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortedBy, setSortedBy] = useState(null); // State to track sorting type

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch("https://podcast-api.netlify.app");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched Data:", data);
        const podcastsData = data.map((item) => ({
          id: item.id,
          title: item.title,
          displayImage: item.image,
          genre: genreMap[item.genres], // Map genre ID to title
          genreId: item.genres, // keep genre ID for filtering
          updated: item.updated,
          seasons: item.seasons, // Include seasons data
        }));
        console.log("Mapped Podcasts Data:", podcastsData);
        setPodcasts(podcastsData);
        setOriginalPodcasts(podcastsData); // Save the original list of podcasts
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      }
    };

    fetchPodcasts();
  }, []);

  const filteredPodcasts = podcasts.filter(
    (item) =>
      item.title.trim().toLowerCase().includes(search.trim().toLowerCase()) &&
      (selectedGenre ? item.genre === selectedGenre : true)
  );

  const sortByTitleAZ = () => {
    const sortedPodcasts = [...filteredPodcasts].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setPodcasts(sortedPodcasts);
    setSortedBy("titleAZ");
  };

  const sortByTitleZA = () => {
    const sortedPodcasts = [...filteredPodcasts].sort((a, b) =>
      b.title.localeCompare(a.title)
    );
    setPodcasts(sortedPodcasts);
    setSortedBy("titleZA");
  };

  const sortByOldestUpdated = () => {
    const sortedPodcasts = [...filteredPodcasts].sort(
      (a, b) => new Date(a.updated) - new Date(b.updated)
    );
    setPodcasts(sortedPodcasts);
    setSortedBy("oldestUpdated");
  };

  const resetSort = () => {
    setPodcasts(originalPodcasts); // Restore the original list of podcasts
    setSearch("");
    setSelectedGenre("");
    setSortedBy(null);
  };

  return (
    <div>
      <Header />
      <div className="input-wrapper" style={{ marginTop: "2rem" }}>
        <h1>Discover Podcasts</h1>
        <InputComponent
          state={search}
          setState={setSearch}
          placeholder="Search By Title"
          type="text"
        />

        <div style={{ marginTop: "1rem" }}>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            style={{ padding: "0.5rem", fontSize: "1rem" }}
          >
            <option value="">All Genres</option>
            {Object.entries(genreMap).map(([id, title]) => (
              <option key={id} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>

        <div className="sort-buttons" style={{ marginTop: "1rem" }}>
          <button onClick={sortByTitleAZ}>Sort by Title (A-Z)</button>
          <button onClick={sortByTitleZA}>Sort by Title (Z-A)</button>
          <button onClick={sortByOldestUpdated}>Sort by Oldest Updated</button>
          <button onClick={resetSort}>Reset</button>
        </div>

        {filteredPodcasts.length > 0 ? (
          <div className="podcasts-layout" style={{ marginTop: "1.5rem" }}>
            {filteredPodcasts.map((item) => (
              <PodcastCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p>{search ? "Podcast Not Found" : "No Podcasts On The Platform"}</p>
        )}
      </div>
    </div>
  );
}
