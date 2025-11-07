import movieData from "./MovieData.json";
export const Movies = () => {
  return (
    <>
      <div>
        {" "}
        <h1>Movies</h1>
{/* 
        // search bar */}
        <div>
          <label
            htmlFor="username"
            className="block text-sm/6 font-medium text-white-900"
          >
            serach
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="username"
              name="mobile"
              required
              placeholder="search movies..."
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
        {/* // genre movie */}
        {/* <div>
        <form class="max-w-sm mx-auto">
  <label for="underline_select" class="sr-only">Underline select</label>
  <select id="underline_select" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
      <option selected>by Genre</option>
      <option value="comedy">comedys</option>
      <option value="science fiction">science fiction</option>
      <option value="fantasy">fantasy</option>
      <option value="horror">horror</option>
      <option value="thriller">thriller</option>
      <option value="western">western</option>
      <option value="war">war</option>
      <option value="history">History</option>
      <option value="romance">Romance</option>
      <option value="tV Movie">Crime</option>
      <option value="documentary">Documentary</option>
      <option value="adventure">Adventure</option>
       </select> 
</form></div> */}



        <br />
      </div>




      <div className="flex flex-wrap items-center gap-2">
        {movieData.results.map((data) => (
          <li key={data.id}>
            <div>
              <div className="  max-w-sm rounded overflow-hidden shadow-lg">
                <img
                  className="w-full"
                  src={`https://image.tmdb.org/t/p/w1280${data.poster_path}`}
                  alt=""
                />
                <div className="font-bold text-xl mb-2">{data.title}</div>
              </div>
              <div className="px-6 pt-4 pb-2 ">
                <button className=" hover:bg-sky-700 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2...">
                  Watch Now
                </button>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {data.original_language}
                </span>
                <span className="inline-block bg-gray-200 movie_idmovie_idmovie_idmovie_idmovie_idmovie_id-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {data.release_date}
                </span>
              </div>
            </div>
          </li>
        ))}
      </div>
    </>
  );
};


