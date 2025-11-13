import { BrowserRouter, Routes, Route } from "react-router-dom";
import Example from "./components/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Home } from "./pages/Home";

import { NotFound } from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";

import "./App.css";
import { DiscoverMovies } from "./features/discover/DiscoverMovies";
import { AllStars } from "./features/allStarts/AllStars";
import { UpNext } from "./features/upNext/UpNext";
import MovieDetails from "./features/favMovie/MovieDetails";
import Profile from "./components/Profile";
import HomePage from "./pages/PHome";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter >
     <Toaster position="top-right"
     toastOptions={{
          duration: 2000,
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "8px",
            padding: "10px 16px",
          },
        }}
      />
      <Example />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/movies" element={<DiscoverMovies />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/allstars" element={<AllStars />} />
          <Route path="/upnext" element={<UpNext />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
