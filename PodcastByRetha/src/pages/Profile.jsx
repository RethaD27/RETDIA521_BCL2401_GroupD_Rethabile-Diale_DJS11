import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/CommonComponents/Header";
import Button from "../components/CommonComponents/Button";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import CarouselComponent from "../components/Carousel/CarouselComponent";

export default function Profile() {
  const user = useSelector((state) => state.user.user);
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch("https://podcast-api.netlify.app");
        const data = await response.json();
        const podcastsData = data.map((item) => ({
          key: item.id,
          id: item.id,
          title: item.title,
          displayImage: item.image,
          // genre: genreMap[item.genres], // Map genre ID to title
          // genreId: item.genre, // keep genre ID for filtering
        }));
        console.log(data);
        setPodcasts(podcastsData);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      }
    };
    console.log(fetchPodcasts());
    fetchPodcasts();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Logged out successfully");
        toast.success("You Have Successfully Logged Out!");
      })
      .catch((error) => {
        console.log("Error logging out", error);
        toast.error(error.message);
      });
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>{user.name}</h1>
        <h1>{user.email}</h1>
        <h1>{user.uid}</h1>
        <Button text={"Logout"} onClick={handleLogout} />
        <h2>Recently Updated Podcasts</h2>
        <CarouselComponent items={podcasts} />
      </div>
    </div>
  );
}
