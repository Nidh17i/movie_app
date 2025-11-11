import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setSort, setGenre, setRating } from "./allStarsSlice";


const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDlhNmQ3OGNiMGNmZTgxZTA3OTE0MTZjZWQxOTY1YiIsIm5iZiI6MTc2MjQyNTk4NC41MTUsInN1YiI6IjY5MGM3YzgwZTY3MTk4Y2FkMzkzNTE1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IkXcOULuD1zQTn8sUeXkZejhNYTa4UduorAMtGen_uY",
  },
};

export const AllStars = () => {
  const { sort, genre, rating } = useSelector((state) => state.allStars);
  const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en-US",
      API_OPTIONS
    )
      .then((res) => res.json())
      .then((data) => setGenres(data.genres || []))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let url = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&sort_by=${sort}&vote_average.gte=${rating}&include_adult=false&include_video=false`;
        if (genre) url += `&with_genres=${genre}`;

        const res = await fetch(url, API_OPTIONS);
        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [sort, genre, rating]);

  return (
    <div className="w-full bg-[#0f0f0f] text-white px-12 py-10">
      <h1 className="text-4xl font-extrabold mb-8">
        Top Rated Movies (All Stars)
      </h1>

      <div className="flex flex-wrap justify-between bg-[#1c1c1c] p-6 rounded-xl shadow-md">
        <div className="flex flex-col w-52">
          <label className="text-sm font-semibold text-gray-300 mb-2">
            Genre
          </label>
          <select
            value={genre}
            onChange={(e) => dispatch(setGenre(e.target.value))}
            className="bg-[#2a2a2a] rounded-lg px-4 py-2 outline-none text-gray-200"
          >
            <option value="">All</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col w-56">
          <label className="text-sm font-semibold text-gray-300 mb-2">
            Minimum Rating
          </label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={rating}
            onChange={(e) => dispatch(setRating(e.target.value))}
            className="accent-yellow-500 w-full"
          />
          <span className="text-sm text-gray-300 mt-1">{rating}</span>
        </div>

        <div className="flex flex-col w-64">
          <label className="text-sm font-semibold text-gray-300 mb-2">
            Sort By
          </label>
          <select
            value={sort}
            onChange={(e) => dispatch(setSort(e.target.value))}
            className="bg-[#2a2a2a] rounded-lg px-4 py-2 outline-none text-gray-200"
          >
            <option value="vote_average.desc">Rating (High to Low)</option>
            <option value="vote_average.asc">Rating (Low to High)</option>
            <option value="popularity.desc">Popularity (High to Low)</option>
            <option value="popularity.asc">Popularity (Low to High)</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-center mt-10 text-gray-400">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-10">
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
                <span className="absolute top-3 right-3 bg-[#b5a816] text-white text-sm font-semibold px-2 py-1 rounded-md shadow-lg">
                  {movie.vote_average?.toFixed(1) || "N/A"}
                </span>
                <div className="p-4 bg-[#1a1a1a]">
                  <h3 className="text-lg font-bold truncate">{movie.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
