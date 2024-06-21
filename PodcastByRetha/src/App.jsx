import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUpPage from "./pages/SignUpPage";
import Profile from "./pages/Profile";
import CreateAPodcast from "./pages/CreateAPodcast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { setUser } from "./slices/userSlice";
import { useDispatch } from "react-redux";
import PrivateRoutes from "./components/CommonComponents/PrivateRoutes";
import PodcastsPage from "./pages/Podcasts";
import PodcastDetailsPage from "./pages/PodcastDetails";
import FavouritesPage from "./pages/FavouritesPage";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsubscribeSnapshot = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: user.uid,
                })
              );
            }
          },
          (error) => {
            console.error("Error fetching user data:", error);
          }
        );

        return () => {
          unsubscribeSnapshot();
        };
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, [dispatch]);

  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-a-podcast" element={<CreateAPodcast />} />
            <Route path="/podcasts" element={<PodcastsPage />} />
            <Route path="/podcast/:id" element={<PodcastDetailsPage />} />
            <Route path="/favourites" element={<FavouritesPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
