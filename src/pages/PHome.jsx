import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { setSearch } from "../features/discover/DiscoverSlice";
import { useDispatch, useSelector } from "react-redux";
export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  
  const [loading, setLoading] = useState(false);

   const[serchMovie,setSerchMovie]=useState('');
   const dispatch=useDispatch();
     const { search } = useSelector((state) => state.discover);

  useEffect(() => {
    fetchGenres();
    fetchTrendingMovies();
  }, []);

 
  const fetchGenres = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDlhNmQ3OGNiMGNmZTgxZTA3OTE0MTZjZWQxOTY1YiIsIm5iZiI6MTc2MjQyNTk4NC41MTUsInN1YiI6IjY5MGM3YzgwZTY3MTk4Y2FkMzkzNTE1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IkXcOULuD1zQTn8sUeXkZejhNYTa4UduorAMtGen_uY",
      },
    };

    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=en",
        options
      );
      const data = await res.json();
      setGenres(data.genres || []);
    } catch (err) {
      console.error("Error fetching genres:", err);
    }
  };


  const fetchTrendingMovies = async () => {
    setLoading(true);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDlhNmQ3OGNiMGNmZTgxZTA3OTE0MTZjZWQxOTY1YiIsIm5iZiI6MTc2MjQyNTk4NC41MTUsInN1YiI6IjY5MGM3YzgwZTY3MTk4Y2FkMzkzNTE1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IkXcOULuD1zQTn8sUeXkZejhNYTa4UduorAMtGen_uY",
      },
    };

    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/trending/movie/week?language=en-US",
        options
      );
      const data = await res.json();
      setMovies(data.results || []);
    } catch (err) {
      console.error("Error fetching trending movies:", err);
    } finally {
      setLoading(false);
    }
  };



  const handleSearch = async (e) => {
    e.preventDefault();
    if (!serchMovie) return fetchTrendingMovies();
   
 
    setLoading(true);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDlhNmQ3OGNiMGNmZTgxZTA3OTE0MTZjZWQxOTY1YiIsIm5iZiI6MTc2MjQyNTk4NC41MTUsInN1YiI6IjY5MGM3YzgwZTY3MTk4Y2FkMzkzNTE1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IkXcOULuD1zQTn8sUeXkZejhNYTa4UduorAMtGen_uY",
      },
    };

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${search}&language=en-US&page=1`,
        options
      );
      const data = await res.json();
      setMovies(data.results || []);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
   
  };
  const handleMovieInput=(e)=>{
    setSerchMovie(e.target.value)
       dispatch(setSearch(serchMovie))

}
  
  const getGenreNames = (ids) => {
    const matched = genres.filter((g) => ids.includes(g.id)) .map((g) => g.name);
    return matched.join(", ");
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-6 py-10 sm:px-12">

      <form
        onSubmit={handleSearch}
        className="flex justify-center mb-10 w-full max-w-2xl mx-auto"
      >
        <input
          type="text"
          
          onChange={handleMovieInput}
          placeholder="Search Movies..."
          className="w-full rounded-l-lg p-3 bg-[#1a1a1a] text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          type="submit"
          className="bg-yellow-600 px-6 rounded-r-lg font-semibold hover:bg-yellow-700 transition"
        >
          Search
        </button>
      </form>

    {(!search)? (<h2 className="text-2xl font-semibold mb-8 text-gray-200 text-center">
       Trending This Week...
</h2>):(
 <h2 className="text-2xl font-semibold mb-8 text-gray-200 text-center">
       available movie
</h2> )}



     
      {loading ? (
        <p className="text-center text-gray-400 mt-10">Loading...</p>
      ) : movies.length === 0 ? (
        <p className="text-center text-gray-400">No movies found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {movies.map((movie) => (
            <Link key={movie.id} to={`/movies/${movie.id}`}>
              <div className="relative bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              
          <img
         src={
          movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "https://placehold.co/500x750?text=No+Image"
           }
            alt={movie.title}
         className="w-full h-[400px] object-cover"
             />

               
         <div className="absolute top-3 right-3 bg-yellow-500 text-black font-bold text-sm px-2 py-1 rounded-md">
          {movie.vote_average?.toFixed(1) || "N/A"}
         </div>

               
         <div className="p-4">
           <h3 className="text-lg font-bold mb-1 truncate">
            {movie.title}
            </h3>
           <p className="text-sm text-gray-400 truncate">
            {movie.release_date
            ? movie.release_date.slice(0, 4)
                : "----"}{" "}
              {getGenreNames(movie.genre_ids) || "N/A"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
