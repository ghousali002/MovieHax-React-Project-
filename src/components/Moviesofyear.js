import React, { useState, useEffect } from "react";
import api from "../utils/api";
import footer from "./footer";

function Result(props) {
  return (
    <div className="container ">
      <div className="row">
        {props.data.map(function (movie) {
          return (
            <div className="col-3">
              <ul className="moviebox padding0" key={movie.id}>
                <div className="movieboxDiv">
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      title={"Search on Google about '" + movie.title + "'"}
                      href={"https://www.google.com/search?q=" + movie.title}
                    >
                      <img
                        className="poster"
                        src={
                          "https://image.tmdb.org/t/p/w200/" + movie.poster_path
                        }
                        alt={movie.title}
                      />
                    </a>
                  </li>
                  <div className="classDiv">
                    <li className="title">
                      <a
                        target="_blank"
                        title={"Search on Google about '" + movie.title + "'"}
                        href={"https://www.google.com/search?q=" + movie.title}
                      >
                        <p >{movie.title}</p>
                      </a>
                    </li>
                  </div>
                  <div className="description">
                    <li>{" "}<b>IMBD Rating: </b><button type="button" className="btn btn-warning btn-md"><b> {movie.vote_average} ★</b></button></li>
                    <li><b>Release Date: </b> {movie.release_date} </li>
                    <li className="genresInBox"><b>Gerne: </b> {props.getGenre(movie.genre_ids)}</li>
                    <li className="overview" data-bs-toggle="collapse"><b>Description: </b> {movie.overview} </li>
                  </div>
                </div>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Moviesofyear() {
  const [page, setPage] = useState(1);
  const [year, setYear] = useState(2018);
  const [result, setResult] = useState(null);
  const genres = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    // ... Add the rest of the genres here ...
  ];

  useEffect(() => {
    getResults();
  }, [year]);

  const getResults = () => {
    api.getMoviesOfYear(year, 1).then((response) => {
      setResult(response);
      setPage(1);
    });
    document.title = `Movies of ${year}`;
  };

  const changeYear = (event) => {
    const selectedYear = event.target.value;
    setYear(selectedYear);
  };

  const getGenre = (array) => {
    let result = "";
    array.forEach((id) => {
      genres.forEach((genre) => {
        if (genre.id === id) {
          result += genre.name + " ";
        }
      });
    });
    return result;
  };

  var years = [];
  for (let i = 2023; i > 1950; i--) {
    years.push(i);
  }

  return (
    <div>
      <div className="input-group">
        <select
          onChange={changeYear}
          className="custom-select"
          id="inputGroupSelect04"
        >
          {years.map(function (year) {
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
        <div className="input-group-append">
          <button
            className="btn "
            onClick={getResults}
            type="button"
          >
            Show
          </button>
        </div>
      </div>
      {result !== null && <Result getGenre={getGenre} data={result.data.results} />}
      <footer>
        &copy; 2023 MovieHax | Developed by 
        <h3 className="ghouscodex-section">  
        {" "}
              <a
                target="_blank"
                href="https://github.com/ghousali002"
              >
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

export default Moviesofyear;
