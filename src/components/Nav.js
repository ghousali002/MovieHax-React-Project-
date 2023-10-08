import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom'; 
import { searchMovies } from '../utils/api'; 

function Nav({ history }) { 
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      alert('Please enter a movie title.');
      return;
    }

    searchMovies(searchQuery)
      .then((response) => {
        history.push(`/search?q=${searchQuery}`);
      })
      .catch((error) => console.error('Error fetching movies:', error));
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-blue bg-primary'>
      <ul className='navButtons padding0'>
        <li>
            <img src= "https://moviehax.me/wp-content/uploads/2022/10/footer-logo.png" alt='MovieHax' height={60} />
          
        </li>
        <li>
          <NavLink exact className="btn btn-info" activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink exact className="btn btn-info" activeClassName="active" to="/about">
            About
          </NavLink>
        </li>
        <li>
          <NavLink exact className="btn btn-info" activeClassName="active" to="/contact">
            contact
          </NavLink>
        </li>
        <li>
          <NavLink exact className="btn btn-info" activeClassName="active" to="/bestmoviesofyear">
            Movies by Year
          </NavLink>
        </li>

        <li>
          <div className="search-bar-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search for a movie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className='search-button' onClick={handleSearch}>Search</button>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default withRouter(Nav);
