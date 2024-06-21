import { useState, useEffect } from "react";
import CarouselComponent from "../components/Carousel/CarouselComponent";

const LandingPage = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    // Fetch or set the items you want to display in the carousel
    const fetchShows = async () => {
      // Replace with your API call or data source
      const response = await fetch("/api/shows");
      const data = await response.json();
      setShows(data);
    };

    fetchShows();
  }, []);

  return (
    <div>
      <h1>Discover New Shows</h1>
      <CarouselComponent items={shows} />
    </div>
  );
};

export default LandingPage;
