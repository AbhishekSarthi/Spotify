import React, { useEffect, useState } from "react";
import axios from "axios";
let accessToken = "";
let refreshToken = "";

function Recommendations() {
  let [recommendationsData, setRecommendationsData] = useState([]);
  useEffect(() => {
    const getRecommendations = async () => {
      let authorization_token = "Bearer " + accessToken;
      console.log(authorization_token);

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://api.spotify.com/v1/recommendations?limit=20&seed_artists=6M2wZ9GZgrQXHCFfjv46we%2C26VFTg2z8YR0cCuwLzESi2",
        headers: {
          Authorization: authorization_token,
        },
      };
      try {
        const response = await axios.request(config);
        setRecommendationsData(response.data.tracks);
        console.log(response.data);
      } catch (e) {
        console.log("Error - ", e.message, e.response.data.error.message);
      }
    };

    if (window.localStorage.getItem("access_token")) {
      accessToken = window.localStorage.getItem("access_token");
      refreshToken = window.localStorage.getItem("refresh_token");
      getRecommendations();
    }
  }, []);
  return (
    <>
      <h4 className="h4-styling">Recommendations for you</h4>
      <div className="artists-grid">
        {accessToken.length > 0 ? (
          recommendationsData.map((data) => {
            return (
              <div className="container" key={data.id}>
                <div className="artist-image">
                  <img src={data.album.images[0].url} width="100%" alt="Song" />
                </div>
                <div className="artist-data">
                  <h4>Id : {data.id}</h4>
                  <h4>Name : {data.name}</h4>
                  <h4>
                    Duration : {(data.duration_ms / 60000).toFixed(2)} mins
                  </h4>
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
    </>
  );
}

export default Recommendations;
