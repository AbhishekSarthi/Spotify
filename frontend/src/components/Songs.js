import React, { useEffect, useState } from "react";
import axios from "axios";
let accessToken = "";
let refreshToken = "";

function Songs() {
  let [userData, setUserData] = useState([]);
  useEffect(() => {
    const getUserTopArtist = async () => {
      let authorization_token = "Bearer " + accessToken;
      console.log(authorization_token);

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term",
        headers: {
          Authorization: authorization_token,
        },
      };
      try {
        const response = await axios.request(config);
        setUserData(response.data.items);
        console.log(response.data);
      } catch (e) {
        console.log("Error - ", e.message, e.response.data.error.message);
      }
    };

    if (window.localStorage.getItem("access_token")) {
      accessToken = window.localStorage.getItem("access_token");
      refreshToken = window.localStorage.getItem("refresh_token");
      getUserTopArtist();
    }
  }, []);
  return (
    <>
      <h4 className="h4-styling">Your top Songs</h4>
      <div className="artists-grid">
        {accessToken.length > 0 ? (
          userData.map((data) => {
            return (
              <div className="container" key={data.id}>
                <div className="artist-image">
                  <img
                    src={data.album.images[0].url}
                    width="300px"
                    alt="Song"
                  />
                </div>
                <div className="artist-data">
                  {/* <h4>id : {data.id}</h4> */}
                  <h4>{data.name}</h4>
                  <h5>{data.artists[0].name}</h5>
                  <h6>
                    {(data.duration_ms / 60000).toFixed(2)} mins / Popularity :{" "}
                    {data.popularity}
                  </h6>
                </div>
              </div>
            );
          })
        ) : (
          <>
            <p>Something went wrong try again</p>
          </>
        )}
      </div>
    </>
  );
}

export default Songs;
