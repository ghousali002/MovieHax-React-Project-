import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";

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
                    <li>
                      {" "}
                      <b>IMBD Rating: </b>
                      <button type="button" className="btn btn-warning btn-md">
                        <b> {movie.vote_average} ★</b>
                      </button>
                    </li>
                    <li>
                      <b>Release Date: </b> {movie.release_date}{" "}
                    </li>
                    <li className="genresInBox">
                      <b>Gerne: </b> {props.getGenre(movie.genre_ids)}
                    </li>
                    <li className="overview" data-bs-toggle="collapse">
                      <b>Description: </b> {movie.overview}{" "}
                    </li>
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

function Filtering(props) {
  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Science Fiction",
    "TV Movie",
    "Thriller",
    "War",
    "Western",
  ];

  return (
    <div className="genresDiv">
      <ul className="genresNav">
        {genres.map(function (genre) {
          return (
            <Link
              className="genreslink"
              to={"/genre/" + genre}
              style={
                genre === props.selectedGenre ? { color: "#d0021b" } : null
              }
              onClick={() => props.changeGenre(genre)}
              key={genre}
            >
              {genre}
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

function Home(props) {
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState(null);
  const [genreName, setGenreName] = useState(null);
  const [pageinput, setPageInput] = useState(1);

  const genres = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
  ];

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

  const getPopularMovies = () => {
    api.getPopularMovies(page, genre).then((result) => {
      setMovies(result);
    });
    window.scrollTo(0, 0);
  };

  const changePage = (number) => {
    setPage(page + number);
  };

  const changePageFromInput = (number) => {
    setPage(number);
  };

  const pageChangeHandler = (event) => {
    const page = event.target.value;
    setPageInput(Number(page));
  };

  const genreChanger = (selectedGenre) => {
    genres.forEach((genres) => {
      if (genres.name === selectedGenre) {
        setGenre(genres.id);
        setGenreName(selectedGenre);
        setTitle(genres.name);
        setPage(1);
        getPopularMovies();
      }
    });
  };

  useEffect(() => {
    if (props.match.params.genre) {
      genreChanger(props.match.params.genre);
      console.log(props.match.params.genre);
    }
    getPopularMovies();
    document.title = `Movies Everywhere`;
  }, [page, genre, props.match.params.genre]);

  let [tit, setTitle] = useState("Trending");
  return (
    <div>
      <Filtering selectedGenre={genreName} changeGenre={genreChanger} />
      <h2 className="tit">
        {tit} Movies <br></br>
      </h2>
      <ul className="padding0">
        {movies !== null && (
          <Result getGenre={getGenre} data={movies.data.results} />
        )}
      </ul>
      <div className="pagination">
        <ul>
          <li className="pagedisplay">
            <p>
              <b>Page {page}</b>
            </p>
          </li>
          <li>
            <div className="pageinput">
              <input
                className="form-control"
                onChange={pageChangeHandler}
                Value={page}
                type="number"
              />
              <button
                className="btn"
                onClick={() => changePageFromInput(pageinput)}
              >
                Go
              </button>
            </div>
          </li>
          <li className="pagebuttons">
            {page > 1 ? (
              <button className="btn" onClick={() => changePage(-1)}>
                Previus Page
              </button>
            ) : (
              <button className="btn" disabled onClick={() => changePage(-1)}>
                Previus Page
              </button>
            )}
            <button
              className="btn btn-primary nextButton"
              onClick={() => {
                setPageInput(page);
                changePage(1);
              }}
            >
              Next Page
            </button>
          </li>
         
        </ul>
      </div>
      <br />
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

export default Home;
