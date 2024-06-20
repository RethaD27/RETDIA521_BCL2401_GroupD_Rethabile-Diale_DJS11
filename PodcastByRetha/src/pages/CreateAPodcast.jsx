import Header from "../components/CommonComponents/Header";
import CreatePodcastForm from "../components/StartAPodcast/CreatePodcastForm";

export default function CreateAPodcast() {
  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>Create A Podcast</h1>
        <CreatePodcastForm />
      </div>
    </div>
  );
}
