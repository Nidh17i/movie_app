import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../AuthSlice";
import {  useNavigate } from "react-router-dom";
import {removeFavorite,removetoWatchList} from '../features/favMovie/favSlice'

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Favorite, WatchList } = useSelector((state) => state.favmovies);
  //console.log("fav mvoie", Favorite);

  const { userData } = useSelector((state) => state.MovieUser);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 sm:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{userData.name}'s Profile</h1>
          <button
            onClick={handleLogout}
            className="bg-red-300 hover:bg-red-400 text-white px-3 py-1 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Favorites</h2>
        {Favorite.length === 0 ? (
          <p className="text-gray-400">No favorite movies </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Favorite.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow"
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://placehold.co/500x750?text=No+Image"
                  }
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-2 flex justify-between items-center">
                  <p className="text-sm font-medium">{movie.title}</p>
                  <button
                    onClick={() => dispatch(removeFavorite(movie.id))}
                    className="text-red-500 hover:text-red-400"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Watchlist</h2>
        {WatchList.length === 0 ? (
          <p className="text-gray-400">No movies in your watchlist.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {WatchList.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow"
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://placehold.co/500x750?text=No+Image"
                  }
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-2 flex justify-between items-center">
                  <p className="text-sm font-medium">{movie.title}</p>
                  <button
                    onClick={() => dispatch(removetoWatchList(movie.id))}
                    className="text-red-500 hover:text-red-400"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
