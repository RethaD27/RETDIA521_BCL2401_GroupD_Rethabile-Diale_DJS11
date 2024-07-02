import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import InputComponent from "../CommonComponents/Input";
import FileInput from "../CommonComponents/Input/FileInput";
import Button from "../CommonComponents/Button";

export default function CreatePodcastForm() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [displayImage, setDisplayImage] = useState();
  const [bannerImage, setBannerImage] = useState();
  const [seasons, setSeasons] = useState([
    { episodes: [{ title: "", id: "" }], episodeCount: 0 },
  ]); // Default to one season with zero episodes

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (title && desc && displayImage && bannerImage) {
      setLoading(true);
      try {
        const bannerImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(bannerImageRef, bannerImage);
        const bannerImageUrl = await getDownloadURL(bannerImageRef);

        const displayImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(displayImageRef, displayImage);
        const displayImageUrl = await getDownloadURL(displayImageRef);

        const podcastData = {
          title: title,
          description: desc,
          bannerImage: bannerImageUrl,
          displayImage: displayImageUrl,
          createdBy: auth.currentUser.uid,
          seasons: seasons,
        };

        toast.success("Handling Form");
        await addDoc(collection(db, "podcasts"), podcastData);

        setTitle("");
        setDesc("");
        setBannerImage(null);
        setDisplayImage(null);
        setSeasons([{ episodes: [{ title: "", id: "" }], episodeCount: 0 }]);
        toast.success("Podcast Created!");
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        console.log(e);
        setLoading(false);
      }
    } else {
      toast.error("Please Enter All Values");
      setLoading(false);
    }
  };

  const displayImageHandle = (file) => {
    setDisplayImage(file);
  };

  const bannerImageHandle = (file) => {
    setBannerImage(file);
  };

  const handleSeasonChange = (index, value) => {
    const newSeasons = [...seasons];
    newSeasons[index].episodeCount = value;
    setSeasons(newSeasons);
  };

  const handleEpisodeChange = (seasonIndex, episodeIndex, value) => {
    const newSeasons = [...seasons];
    newSeasons[seasonIndex].episodes[episodeIndex].title = value;
    newSeasons[seasonIndex].episodes[
      episodeIndex
    ].id = `${seasonIndex}-${episodeIndex}-${Date.now()}`;
    setSeasons(newSeasons);
  };

  const addSeason = () => {
    setSeasons([
      ...seasons,
      { episodes: [{ title: "", id: "" }], episodeCount: 0 },
    ]);
  };

  const addEpisode = (seasonIndex) => {
    const newSeasons = [...seasons];
    newSeasons[seasonIndex].episodes.push({ title: "", id: "" });
    setSeasons(newSeasons);
  };

  return (
    <>
      <InputComponent
        state={title}
        setState={setTitle}
        placeholder="Title"
        type="text"
        required={true}
      />
      <InputComponent
        state={desc}
        setState={setDesc}
        placeholder="Description"
        type="text"
        required={true}
      />
      <FileInput
        accept={"image/*"}
        id="display-image-input"
        fileHandleFnc={displayImageHandle}
        text={"Display Image Upload"}
      />
      <FileInput
        accept={"image/*"}
        id="banner-image-input"
        fileHandleFnc={bannerImageHandle}
        text={"Banner Image Upload"}
      />
      {seasons.map((season, seasonIndex) => (
        <div key={seasonIndex}>
          <InputComponent
            state={season.episodeCount}
            setState={(value) => handleSeasonChange(seasonIndex, value)}
            placeholder={`Season ${seasonIndex + 1} Episode Count`}
            type="number"
            required={true}
          />
          {season.episodes.map((episode, episodeIndex) => (
            <InputComponent
              key={episodeIndex}
              state={episode.title}
              setState={(value) =>
                handleEpisodeChange(seasonIndex, episodeIndex, value)
              }
              placeholder={`Episode ${episodeIndex + 1} Title`}
              type="text"
              required={true}
            />
          ))}
          <Button text="Add Episode" onClick={() => addEpisode(seasonIndex)} />
        </div>
      ))}
      <Button text="Add Season" onClick={addSeason} />
      <Button
        text={loading ? "Loading..." : "Create Podcast"}
        disabled={loading}
        onClick={handleSubmit}
      />
    </>
  );
}
