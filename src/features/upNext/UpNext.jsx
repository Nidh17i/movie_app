import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSort } from "../upNext/upNextSlice";
import { Link } from "react-router-dom";

export const UpNext = () => {
  const { sort } = useSelector((state) => state.upNext);
  const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_TOKEN =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDlhNmQ3OGNiMGNmZTgxZTA3OTE0MTZjZWQxOTY1YiIsIm5iZiI6MTc2MjQyNTk4NC41MTUsInN1YiI6IjY5MGM3YzgwZTY3MTk4Y2FkMzkzNTE1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IkXcOULuD1zQTn8sUeXkZejhNYTa4UduorAMtGen_uY";

  useEffect(() => {
    fetchMovies();
  }, [sort]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US`;
      const res = await fetch(url, {
        headers: { accept: "application/json", Authorization: API_TOKEN },
      });
      const data = await res.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#0f0f0f] text-white px-12 py-10">
      <h1 className="text-4xl font-extrabold mb-8">Upcoming Movies</h1>

      <div className="flex flex-col sm:flex-row justify-start items-center bg-[#1c1c1c] p-6 rounded-xl shadow-md mb-6">
        <div className="flex flex-col w-64">
          <label className="text-sm font-semibold text-gray-300 mb-2">Sort By</label>
          <select
            value={sort}
            onChange={(e) => dispatch(setSort(e.target.value))}
            className="bg-[#2a2a2a] rounded-lg px-4 py-2 outline-none text-gray-200"
          >
            <option value="release_date.desc">Newest First</option>
            <option value="release_date.asc">Oldest First</option>
            <option value="popularity.desc">Most Popular</option>
            <option value="popularity.asc">Least Popular</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-center mt-10 text-gray-400">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <Link key={movie.id} to={`/movies/${movie.id}`}>
              <div className="relative bg-[#1f1f1f] rounded-2xl overflow-hidden shadow-md hover:scale-[1.03] transition-transform duration-300">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://via.placeholder.com/500x750?text=No+Image"
                  }
                  alt={movie.title}
                  className="w-full h-[380px] object-cover"
                />
                <div className="p-4 bg-[#1a1a1a]">
                  <h3 className="text-lg font-bold truncate">{movie.title}</h3>
                  <p className="text-sm text-gray-400">
                    {movie.release_date || "Unknown"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
