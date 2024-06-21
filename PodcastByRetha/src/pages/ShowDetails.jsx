import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    // Fetch the show details based on the ID
    const fetchShow = async () => {
      const response = await fetch(`/api/shows/${id}`);
      const data = await response.json();
      setShow(data);
    };

    fetchShow();
  }, [id]);

  if (!show) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{show.title}</h1>
      <img src={show.image} alt={show.title} />
      <p>{show.description}</p>
    </div>
  );
};

export default ShowDetails;
