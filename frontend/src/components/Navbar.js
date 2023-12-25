import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="Navbar">
      <ul>
        <li>
          <h3>Spotify App</h3>
        </li>
        <li>
          <Link to="/">
            <h3>Login</h3>
          </Link>
        </li>
        <li>
          <Link to="/artists">
            <h3>Top Artists</h3>
          </Link>
        </li>
        <li>
          <Link to="/songs">
            <h3>Top Songs</h3>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
