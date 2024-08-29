import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import Welcome from "./pages/Welcome";
import Books from "./pages/Books";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/Auth";
import BookDetails from "./pages/BookDetails";
import SearchResults from "./pages/SearchResults";
import ChatPage from "./pages/ChatWithAi";
import Loader from "./components/loader/Loader";
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(login({ uid, email, displayName }));
      } else {
        dispatch(logout());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <ToastContainer />
      <Navbar isSignedUp={!!user} />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route
          path="/books"
          element={user ? <Books /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to="/books" />}
        />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </>
  );
}

export default App;
