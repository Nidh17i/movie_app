import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("cinehavenUser"));
  if (!user) {
    return (
      <div className="text-center text-white p-8">
        Please{" "}
        <Link to="/login" className="text-yellow-400 underline">
          Login
        </Link>{" "}
        to view your profile.
      </div>
    );
  }

  const favKey = `cinehaven_${user.name}_favorites`;
  const watchKey = `cinehaven_${user.name}_watchNext`;

  const [favorites, setFavorites] = useState([]);
  const [watchNext, setWatchNext] = useState([]);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem(favKey)) || []);
    setWatchNext(JSON.parse(localStorage.getItem(watchKey)) || []);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter((m) => m.id !== id);
    setFavorites(updated);
    localStorage.setItem(favKey, JSON.stringify(updated));
  };

  const removeWatchNext = (id) => {
    const updated = watchNext.filter((m) => m.id !== id);
    setWatchNext(updated);
    localStorage.setItem(watchKey, JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-yellow-500 mb-6">
          {user.name}’s Profile
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-4 rounded-xl">
            <h3 className="text-xl font-semibold mb-3"> Favorite Movies</h3>
            {favorites.length === 0 ? (
              <p className="text-gray-400">No favorite movies added yet.</p>
            ) : (
              <ul className="space-y-3">
                {favorites.map((movie) => (
                  <li key={movie.id} className="flex items-center justify-between bg-gray-700 p-2 rounded">
                    <div className="flex items-center gap-3">
                      {movie.poster && (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${movie.poster}`}
                          alt={movie.title}
                          className="rounded w-12"
                        />
                      )}
                      <span>{movie.title}</span>
                    </div>
                    <button
                      onClick={() => removeFavorite(movie.id)}
                      className="text-sm bg-red-500 px-2 py-1 rounded hover:bg-red-400"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-gray-800 p-4 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">⏳ Watch Next</h3>
            {watchNext.length === 0 ? (
              <p className="text-gray-400">No movies in Watch Next list.</p>
            ) : (
              <ul className="space-y-3">
                {watchNext.map((movie) => (
                  <li key={movie.id} className="flex items-center justify-between bg-gray-700 p-2 rounded">
                    <div className="flex items-center gap-3">
                      {movie.poster && (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${movie.poster}`}
                          alt={movie.title}
                          className="rounded w-12"
                        />
                      )}
                      <span>{movie.title}</span>
                    </div>
                    <button
                      onClick={() => removeWatchNext(movie.id)}
                      className="text-sm bg-red-500 px-2 py-1 rounded hover:bg-red-400"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
