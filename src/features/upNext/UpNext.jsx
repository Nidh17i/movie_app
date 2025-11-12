import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setMovies, setLoading } from "./upNextSlice";

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDlhNmQ3OGNiMGNmZTgxZTA3OTE0MTZjZWQxOTY1YiIsIm5iZiI6MTc2MjQyNTk4NC41MTUsInN1YiI6IjY5MGM3YzgwZTY3MTk4Y2FkMzkzNTE1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IkXcOULuD1zQTn8sUeXkZejhNYTa4UduorAMtGen_uY",
  },
};


export const UpNext = () => {
  const dispatch = useDispatch();
  const { movies, loading } = useSelector((state) => state.upNext);

  useEffect(() => {
    const fetchUpcoming = async () => {
      dispatch(setLoading(true));
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
          API_OPTIONS
        );
        const data = await res.json();
        dispatch(setMovies(data.results || []));
      } catch (err) {
        console.error("Error fetching upcoming movies:", err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUpcoming();
  }, [dispatch]);

  return (
    <div className="w-full bg-[#0f0f0f] text-white px-12 py-10">
      <h1 className="text-4xl font-extrabold mb-8">Upcoming Movies</h1>

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
                  <p className="text-sm text-gray-400 mt-1">
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
