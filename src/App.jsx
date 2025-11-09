import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { Home } from "./pages/Home";
import Example from "./components/Navbar";
import "./App.css";
import { ProtectedRoute } from "./components/protectedRoute";

import { DiscoverMovies } from "./pages/Discover";
import { TopMovies } from "./pages/AllStars";
import { Upnext } from "./pages/Upnext";
import SignUp from "./pages/SignUp";
import Profile from "./components/Profile";
import MovieDetails from "./components/MovieDetail";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Example />

        <Routes>
          <Route element={<ProtectedRoute />}>
            
            <Route path="/discover" element={<DiscoverMovies />} />
            <Route path="/all-stars" element={<TopMovies />} />
            <Route path="/upnext" element={<Upnext />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
