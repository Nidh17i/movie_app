import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {setSearch,setGenre,setRating,setSort,} from "../discover/DiscoverSlice";

export const DiscoverMovies = () => {
  const dispatch = useDispatch();
  const { search, genre, rating, sort } = useSelector(
    (state) => state.discover
  );

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDlhNmQ3OGNiMGNmZTgxZTA3OTE0MTZjZWQxOTY1YiIsIm5iZiI6MTc2MjQyNTk4NC41MTUsInN1YiI6IjY5MGM3YzgwZTY3MTk4Y2FkMzkzNTE1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IkXcOULuD1zQTn8sUeXkZejhNYTa4UduorAMtGen_uY",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en-US",
      options
    )
      .then((res) => res.json())
      .then((data) => setGenres(data.genres))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [search, genre, rating, sort]);

  const fetchMovies = async () => {
    setLoading(true);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDlhNmQ3OGNiMGNmZTgxZTA3OTE0MTZjZWQxOTY1YiIsIm5iZiI6MTc2MjQyNTk4NC41MTUsInN1YiI6IjY5MGM3YzgwZTY3MTk4Y2FkMzkzNTE1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IkXcOULuD1zQTn8sUeXkZejhNYTa4UduorAMtGen_uY",
      },
    };

    let url = "";

    if (search) {
      url = `https://api.themoviedb.org/3/search/movie?query=${search}&language=en-US&page=1&include_adult=false`;
    } else {
      url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1`;
      if (genre) url += `&with_genres=${genre}`;
      if (rating) url += `&vote_average.gte=${rating}`;
      if (sort) url += `&sort_by=${sort}`;
    }

    try {
      const res = await fetch(url, options);
      const data = await res.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("Movie fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#0f0f0f] text-white px-12 py-10">
      <h1 className="text-4xl font-extrabold mb-8">Discover Movies</h1>

      <div className="flex flex-wrap items-center justify-between bg-[#1c1c1c] p-6 rounded-xl shadow-md">
        <div className="flex flex-col grow max-w-md">
          <label
            htmlFor="search"
            className="text-sm font-semibold text-gray-300 mb-2"
          >
            Search Movies
          </label>
          <input
            type="text"
            placeholder="Search Movies..."
            id="search"
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            className="bg-[#2a2a2a] rounded-lg px-4 py-2 outline-none text-gray-200 w-full text-sm"
          />
        </div>

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
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={rating}
              onChange={(e) => dispatch(setRating(e.target.value))}
              className="accent-yellow-500 w-full"
            />
            <span className="text-sm text-gray-300 w-6">{rating}</span>
          </div>
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
            <option value="popularity.desc">Popularity (High to Low)</option>
            <option value="popularity.asc">Popularity (Low to High)</option>
            <option value="vote_average.desc">Rating (High to Low)</option>
            <option value="vote_average.asc">Rating (Low to High)</option>
            <option value="release_date.desc">Newest</option>
            <option value="release_date.asc">Oldest</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-400 mt-10">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-10">
          {movies.map((movie) => (
            <Link key={movie.id} to={`/movies/${movie.id}`}>
              <div className="relative bg-[#1f1f1f] rounded-2xl overflow-hidden shadow-md hover:scale-[1.03] transition-transform duration-300">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://placehold.co/500x750?text=No+Image"
                  }
                  alt={movie.title}
                  onError={(e) =>
                    (e.target.src =
                      "https://placehold.co/500x750?text=No+Image")
                  }
                  className="w-full h-[380px] object-cover"
                />
                <span className="absolute top-3 right-3 bg-[#b5a816] text-white text-sm font-semibold px-2 py-1 rounded-md shadow-lg">
                  {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                </span>
                <div className="p-4 bg-[#1a1a1a]">
                  <h3 className="text-lg font-bold truncate">{movie.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {movie.release_date
                      ? movie.release_date.slice(0, 4)
                      : "----"}{" "}
                    •{" "}
                    {movie.genre_ids
                      ?.map((id) => genres.find((g) => g.id === id)?.name)
                      .filter(Boolean)
                      .slice(0, 3)
                      .join(", ") || "Unknown"}
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
