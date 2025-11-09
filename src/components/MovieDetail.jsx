import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const user = JSON.parse(localStorage.getItem("cinehavenUser"));

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=449a6d78cb0cfe81e0791416ced1965b`
      );
      const data = await res.json();
      setMovie(data);
    };
    fetchMovie();
  }, [id]);

  if (!movie)
    return <div className="text-center text-white p-8">Loading...</div>;

  const favKey = `cinehaven_${user?.name}_favorites`;
  const watchKey = `cinehaven_${user?.name}_watchNext`;

  const handleAddFavorite = () => {
    const existing = JSON.parse(localStorage.getItem(favKey)) || [];
    const already = existing.find((m) => m.id === movie.id);
    if (!already) {
      const newFav = [
        ...existing,
        { id: movie.id, title: movie.title, poster: movie.poster_path },
      ];
      localStorage.setItem(favKey, JSON.stringify(newFav));
      alert("Added to Favorites ");
    } else {
      alert("Already in Favorites!");
    }
  };

  const handleAddWatchNext = () => {
    const existing = JSON.parse(localStorage.getItem(watchKey)) || [];
    const already = existing.find((m) => m.id === movie.id);
    if (!already) {
      const newList = [
        ...existing,
        { id: movie.id, title: movie.title, poster: movie.poster_path },
      ];
      localStorage.setItem(watchKey, JSON.stringify(newList));
      alert("Added to Watch Next ");
    } else {
      alert("Already in Watch Next!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg shadow-lg w-full md:w-1/3"
        />
        <div>
          <h1 className="text-3xl font-bold text-yellow-500 mb-2">
            {movie.title}
          </h1>
          <p className="text-gray-300 mb-4">{movie.overview}</p>
          <p className="text-sm text-gray-400 mb-1">
            Release Date: {movie.release_date}
          </p>
          <p className="text-sm text-gray-400 mb-4">
            Rating: {movie.vote_average}
          </p>

          {user ? (
            <div className="flex gap-3">
              <button
                onClick={handleAddFavorite}
                className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-400"
              >
                Add to Favorites
              </button>
              <button
                onClick={handleAddWatchNext}
                className="bg-gray-700 text-white font-semibold px-4 py-2 rounded hover:bg-gray-600"
              >
                Add to Watch Next
              </button>
            </div>
          ) : (
            <p className="text-red-400 mt-4">Login to save movies.</p>
          )}
        </div>
      </div>
    </div>
  );
}
