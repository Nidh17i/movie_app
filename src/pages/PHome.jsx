import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDlhNmQ3OGNiMGNmZTgxZTA3OTE0MTZjZWQxOTY1YiIsIm5iZiI6MTc2MjQyNTk4NC41MTUsInN1YiI6IjY5MGM3YzgwZTY3MTk4Y2FkMzkzNTE1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IkXcOULuD1zQTn8sUeXkZejhNYTa4UduorAMtGen_uY";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w780";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPopular();
  }, []);

  const fetchPopular = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        {
          headers: { accept: "application/json", Authorization: API_TOKEN },
        }
      );
      const data = await res.json();
      setMovies(data.results.slice(0, 10));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return fetchPopular();

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${search}&language=en-US&page=1`,
        {
          headers: { accept: "application/json", Authorization: API_TOKEN },
        }
      );
      const data = await res.json();
      setMovies(data.results.slice(0, 10));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0f0f0f] text-white p-6 sm:p-12">
      <form
        onSubmit={handleSearch}
        className="flex justify-center mb-8 w-full max-w-2xl mx-auto"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search movies..."
          className="w-full rounded-l-lg p-3 bg-gray-800 text-white focus:outline-none"
        />
        <button
          type="submit"
          className="bg-yellow-500 px-6 rounded-r-lg font-semibold hover:bg-yellow-400 transition"
        >
          Search
        </button>
      </form>

      {loading ? (
        <p className="text-center text-gray-400 mt-10">Loading...</p>
      ) : (
        <div className="flex overflow-x-auto gap-6 snap-x snap-mandatory scrollbar-hide">
          {movies.map((movie) => {
            return (
              <div
                key={movie.id}
                className="flex-shrink-0 w-[80%] sm:w-[60%] md:w-[45%] lg:w-[30%] snap-center relative"
              >
                <Link to={`/movies/${movie.id}`}>
                  <img
                    src={
                      movie.backdrop_path
                        ? `${IMAGE_BASE}${movie.backdrop_path}`
                        : "https://via.placeholder.com/780x450?text=No+Image"
                    }
                    alt={movie.title}
                    className="rounded-2xl object-cover w-full h-[400px]"
                  />
                </Link>

                <div className="flex gap-4 flex-wrap mt-4">
                  <button className="px-5 py-2 rounded-lg font-medium border border-white text-white hover:text-gray-200 transition-colors duration-300">
                    Add to Favorite
                  </button>

                  <button className="px-5 py-2 rounded-lg font-medium border border-white text-white hover:text-gray-200 transition-colors duration-300">
                    Add to Watchlist
                  </button>
                </div>

                <h3 className="mt-2 text-xl font-bold text-center truncate">
                  {movie.title}
                </h3>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
