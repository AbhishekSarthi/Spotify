import React, { useEffect, useState } from "react";
import axios from "axios";
let accessToken = "";
let refreshToken = "";

function User() {
  let [artistData, setArtistData] = useState([]);
  useEffect(() => {
    const getUserTopArtist = async () => {
      let authorization_token = "Bearer " + accessToken;
      console.log(authorization_token);

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term",
        headers: {
          Authorization: authorization_token,
        },
      };
      try {
        const response = await axios.request(config);
        setArtistData(response.data.items);
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
      <h4 className="h4-styling">Your top artists</h4>
      <div className="artists-grid">
        {accessToken.length > 0 ? (
          artistData.map((data) => {
            return (
              <div className="container" key={data.id}>
                <div className="artist-image">
                  <img
                    src={data.images[0].url}
                    width="300px"
                    alt="Artist Photo"
                  />
                </div>
                <div className="artist-data">
                  <h4>Id : {data.id}</h4>
                  <h4>Name : {data.name}</h4>
                  <h4>Popularity : {data.popularity}</h4>
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

      {/* {artistData.forEach((artist) => {
        <p>adsf</p>;
      })} */}
    </>
  );
}

export default User;
