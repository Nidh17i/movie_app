import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Upnext = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [genres, setGenres] = useState([]);

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
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDlhNmQ3OGNiMGNmZTgxZTA3OTE0MTZjZWQxOTY1YiIsIm5iZiI6MTc2MjQyNTk4NC41MTUsInN1YiI6IjY5MGM3YzgwZTY3MTk4Y2FkMzkzNTE1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IkXcOULuD1zQTn8sUeXkZejhNYTa4UduorAMtGen_uY",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      options
    )
      .then((res) => res.json())
      .then((data) => setUpcoming(data.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="px-10 py-12 bg-[#0f0f0f] text-white">
      <h2 className="text-3xl font-extrabold mb-6"> Up next...</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {upcoming.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <div
              key={movie.id}
              className="relative bg-[#1f1f1f] rounded-2xl overflow-hidden shadow-md hover:scale-[1.03] transition-transform duration-300"
            >
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
                {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
              </span>

              <div className="p-4 bg-[#1a1a1a]">
                <h3 className="text-lg font-bold truncate">{movie.title}</h3>
                <p className="text-sm text-gray-400 mt-1">
                  {movie.release_date ? movie.release_date.slice(0, 4) : "----"}{" "}
                  •{" "}
                  <span>
                    {movie.genre_ids
                      ?.map((id) => genres.find((g) => g.id === id)?.name)
                      .filter(Boolean)
                      .slice(0, 2)
                      .join(", ") || "Unknown"}
                  </span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
