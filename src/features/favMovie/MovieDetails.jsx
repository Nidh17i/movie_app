import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
  addToWatchlist,
  removeFromWatchlist,
} from "../favMovie/favSlice";

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { favorites, watchlist } = useSelector((state) => state.favmovies);

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const isFavorite = favorites.some((m) => m.id === Number(id));
  const isInWatchlist = watchlist.some((m) => m.id === Number(id));

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: "Bearer YOUR_API_KEY_HERE",
          },
        };
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          options
        );
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error("Failed to fetch movie details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <p className="text-center text-gray-400 mt-10">Loading...</p>;
  if (!movie) return <p className="text-center text-gray-400 mt-10">Movie not found.</p>;

  return (
    <div className="w-full min-h-screen bg-[#0f0f0f] text-white p-6 sm:p-12">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Poster */}
        <div className="md:w-1/3">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://placehold.co/500x750?text=No+Image"
            }
            alt={movie.title}
            className="rounded-2xl shadow-lg w-full"
          />
        </div>

        {/* Details */}
        <div className="md:w-2/3 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-6">{movie.title}</h1>

          {/* Info Boxes */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="border border-white text-white rounded-lg p-4 flex-1 min-w-[120px] text-center">
              <p className="font-semibold">Rating</p>
              <p>{movie.vote_average?.toFixed(1) || "N/A"}</p>
            </div>

            <div className="border border-white text-white rounded-lg p-4 flex-1 min-w-[120px] text-center">
              <p className="font-semibold">Release Date</p>
              <p>{movie.release_date || "Unknown"}</p>
            </div>

            <div className="border border-white text-white rounded-lg p-4 flex-1 min-w-[120px] text-center">
              <p className="font-semibold">Genres</p>
              <p>{movie.genres?.map((g) => g.name).join(", ") || "N/A"}</p>
            </div>
          </div>

          {/* Overview */}
          <p className="text-gray-300 leading-relaxed mb-6">
            {movie.overview || "No description available."}
          </p>

          {/* Buttons */}
          <div className="flex gap-4 flex-wrap mt-4">
            {/* Favorite Button */}
            <button
              onClick={() =>
                isFavorite
                  ? dispatch(removeFavorite(movie.id))
                  : dispatch(addFavorite(movie))
              }
              className="px-5 py-2 rounded-lg font-medium border border-white text-white hover:text-gray-200 transition-colors duration-300"
            >
              {isFavorite ? "Remove Favorite" : "Add to Favorite"}
            </button>

            {/* Watchlist Button */}
            <button
              onClick={() =>
                isInWatchlist
                  ? dispatch(removeFromWatchlist(movie.id))
                  : dispatch(addToWatchlist(movie))
              }
              className="px-5 py-2 rounded-lg font-medium border border-white text-white hover:text-gray-200 transition-colors duration-300"
            >
              {isInWatchlist ? "Remove Watchlist" : "Add to Watchlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
