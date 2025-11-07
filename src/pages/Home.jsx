import { Link } from "react-router-dom";
import movieData from "./MovieData.json";
export const Home = () => {
  // const [movieData,setMovieData]=useState([]);

  //      useEffect(() => {
  //     const options = {
  //     method: 'GET',
  //     headers: {
  //     accept: 'application/json',
  //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDlhNmQ3OGNiMGNmZTgxZTA3OTE0MTZjZWQxOTY1YiIsIm5iZiI6MTc2MjQyNTk4NC41MTUsInN1YiI6IjY5MGM3YzgwZTY3MTk4Y2FkMzkzNTE1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IkXcOULuD1zQTn8sUeXkZejhNYTa4UduorAMtGen_uY'
  //   }
  // };

  // fetch('https://api.themoviedb.org/3/discover/movie?449a6d78cb0cfe81e0791416ced1965binclude_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
  //   .then(res => res.json())
  //   .then(res => setMovieData(res))
  //   .catch(err => console.error(err));}, []);
  //   console.log(movieData)

  console.log(movieData.results);

  return (
    <>
      <div
        style={{
          position: "relative",
          height: "90vh",
          backgroundImage:
            "url('https://i.pinimg.com/1200x/49/d6/8f/49d68fc983b66770f629ff9dad146d04.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(4px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            color: "white",
            padding: "0 20px",
          }}
        >
          <h1
            style={{
              fontSize: "60px",
              fontWeight: "800",
              textShadow: "2px 2px 10px rgba(0,0,0,0.7)",
              marginBottom: "20px",
            }}
          >
            Welcome to <span style={{ color: "#ffcc00" }}>CineHaven</span>
          </h1>

          <p
            style={{
              fontSize: "22px",
              maxWidth: "900px",
              lineHeight: "1.6",
              textShadow: "1px 1px 6px rgba(0,0,0,0.6)",
            }}
          >
            Experience cinema at its best — only on <b>CineHaven</b>. <br />
            Turning movie nights into pure bliss with stories rated by fans,
            loved by all.
          </p>
        </div>
      </div>

      <div>
        <h1>Trending (this week)...</h1>
        
        <div className="flex flex-wrap items-center gap-2">
        {movieData.results.map((data) => (
          
          <li 
          key={data.id}>
            
            <div >
              <div className="  max-w-sm rounded overflow-hidden shadow-lg">
                <img
                  class="w-full"
                  src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                  alt=""
                />
                <div class="font-bold text-xl mb-2">{data.title}</div>
              </div>
              <div class="px-6 pt-4 pb-2 ">
                <Link to='/'>
                <button class=" hover:bg-sky-700 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2...">
                  Watch Now
                </button>
                </Link>
                
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {data.original_language}
                </span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {data.release_date}
                </span>
              </div>
            </div>
            
          </li>
          
          
        ))}</div>
      </div>
      
    </>
  );
};

// Experience cinema at its best — only on CineHeaven. Turning movie nights into pure bliss with stories rated by fans, loved by all
