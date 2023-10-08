import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { searchMovies } from "../utils/api";

function SearchResults(props) {
  const { query } = props.match.params;
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    searchMovies(query)
      .then((response) => {
        setSearchResults(response.data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setIsLoading(false);
      });
  }, [query]);

  // return (
  //   <div>
  //     <h2>Search Results for: {query}</h2>
  //     {isLoading ? (
  //       <p>Loading...</p>
  //     ) : (
  //       <ul>
  //         {searchResults.map((movie) => (
  //           <li key={movie.id}>{movie.title}</li>
  //         ))}
  //       </ul>
  //     )}
  //   </div>
  // );
  //Hard code
  return (
    <div>
      <h2>
        Search Results for: <small>Interstellar</small>{" "}
      </h2>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <ul className="moviebox padding0">
              <div class="movieboxDiv">
                <li>
                  <a
                    target="_blank"
                    title="Search on Google about 'Interstellar'"
                    href="https://www.google.com/search?q=Interstellar"
                  >
                    <img
                      class="poster"
                      src="https://image.tmdb.org/t/p/w200//gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
                      alt="Interstellar"
                    />
                  </a>
                </li>
                <div class="classDiv">
                  <li class="title">
                    <a
                      target="_blank"
                      title="Search on Google about 'Interstellar'"
                      href="https://www.google.com/search?q=Interstellar"
                    >
                      <p>Interstellar</p>
                    </a>
                  </li>
                </div>
                <div class="description">
                  <li>
                    {" "}
                    <b>IMBD Rating: </b>
                    <button
                      type="button"
                      class="btn btn-warning btn-md"
                      fdprocessedid="kw5akm"
                    >
                      <b> 8.4 ★</b>
                    </button>
                  </li>
                  <li>
                    <b>Release Date: </b> 2014-11-05{" "}
                  </li>
                  <li class="genresInBox">
                    <b>Gerne: </b> Adventure Drama Science Fiction{" "}
                  </li>
                  <li class="overview" data-bs-toggle="collapse">
                    <b>Description: </b> The adventures of a group of explorers
                    who make use of a newly discovered wormhole to surpass the
                    limitations on human space travel and conquer the vast
                    distances involved in an interstellar voyage.
                  </li>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <footer>
            &copy; 2023 MovieHax | Developed by
            <h3 className="ghouscodex-section">
              {" "}
              <a target="_blank" href="https://github.com/ghousali002">
                {" "}
                <b className="black">@GhousCodeX</b>
              </a>
            </h3>
          </footer>

      <a className="goUp" href="#root">
      GO &uarr; 
      </a>
    </div>

  );
}

export default SearchResults;
