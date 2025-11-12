import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {addFavorite,addtoWatchList} from '../favMovie/favSlice'

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch=useDispatch();
      
  const {Favorite,WatchList}=useSelector((state)=>state.favmovies)
  const { userData } = useSelector((state) => state.MovieUser);
  console.log(userData);

 /// console.log( 'fav mvoie',Favorite);
  //console.log( 'watch',WatchList);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDlhNmQ3OGNiMGNmZTgxZTA3OTE0MTZjZWQxOTY1YiIsIm5iZiI6MTc2MjQyNTk4NC41MTUsInN1YiI6IjY5MGM3YzgwZTY3MTk4Y2FkMzkzNTE1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IkXcOULuD1zQTn8sUeXkZejhNYTa4UduorAMtGen_uY",
          },
        };
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          options
        );
        const data = await res.json();
        //console.log(data);
        setMovie(data);
      } catch (err) {
        console.error("Failed to fetch movie details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading)
    return <p className="text-center text-gray-400 mt-10">Loading...</p>;
  if (!movie)
    return <p className="text-center text-gray-400 mt-10">Movie not found.</p>;
  

 
  return (
    <div className="w-full min-h-screen bg-[#0f0f0f] text-white p-6 sm:p-12">
      <div className="flex flex-col md:flex-row gap-10">
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

        <div className="md:w-2/3 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-6">{movie.title}</h1>

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

          <p className="text-gray-300 leading-relaxed mb-6">
            {movie.overview || "No description available."}
          </p>

         <div className="flex gap-4 flex-wrap mt-4">

  <button
    onClick={() => {
      if (!userData) return alert("Please login first!");
      dispatch(addFavorite({ movie, userKey: userData.name }));
    }}
    className="px-6 py-2 rounded-lg font-medium border border-green-400 text-green-300 hover:bg-green-400 hover:text-black active:scale-95 transition-all duration-300 shadow-md hover:shadow-green-500/50"
  >
     Add to Favorite
  </button>

 
  <button
    onClick={() => {
      if (!userData) return alert("Please login first!");
      dispatch(addtoWatchList({ movie, userKey: userData.name }));
    }}
    className="px-6 py-2 rounded-lg font-medium border border-blue-400 text-blue-300 hover:bg-blue-400 hover:text-black active:scale-95 transition-all duration-300 shadow-md hover:shadow-blue-500/50"
  >
   Add to Watchlist
  </button>
</div>

        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
