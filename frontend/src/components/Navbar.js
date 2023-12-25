import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    if (window.localStorage.getItem("access_token")) {
      console.log(window.localStorage.getItem("access_token"));
      setAccessToken(accessToken);
    }
  }, []);
  return (
    <div className="Navbar">
      <ul>
        <li>
          <h3>Spotify App </h3>
        </li>
        {window.localStorage.getItem("access_token") ? (
          <></>
        ) : (
          <li>
            <Link to="/">
              <h3>Login</h3>
            </Link>
          </li>
        )}

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
        <li>
          <Link to="/recommendations">
            <h3>Recommendations</h3>
          </Link>
        </li>
        <li>
          <Link to="/">
            <h3
              onClick={() => {
                window.localStorage.removeItem("access_token");
                window.localStorage.removeItem("refresh_token");
                window.location.reload();
              }}
            >
              Logout
            </h3>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
