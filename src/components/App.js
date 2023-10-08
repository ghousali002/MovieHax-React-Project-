import React from "react";
import Nav from "./Nav";
import Home from "./Home";
import MoviesOfYear from "./Moviesofyear";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./style.css";
import searchresults from "./Search";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/genre/:genre" component={Home} />
          <Route exact path="/bestmoviesofyear" component={MoviesOfYear} />
          <Route path="/search" component={searchresults} />

          <Route
            component={() => {
              return (
                <div class="d-flex align-items-center justify-content-center vh-100">
                  <div class="text-center">
                    <h1 class="display-1 fw-bold">404</h1>
                    <p class="fs-3">
                      {" "}
                      <span class="text-danger">Opps!</span> Page not found.
                    </p>
                    <p class="lead">
                      The page you’re looking for doesn’t exist.
                    </p>
                   
                  </div>
                </div>
              );
            }}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
