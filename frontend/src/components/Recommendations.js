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
        url: "https://api.spotify.com/v1/recommendations?limit=30&seed_artists=6M2wZ9GZgrQXHCFfjv46we%2C06HL4z0CvFAxyc27GXpf02%2C6eUKZXaKkcviH0Ku9w2n3V%2C45dkTj5sMRSjrmBSBeiHym%2C7dGJo4pcD2V6oG8kP0tJRR&min_popularity=70",
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
      <h4 className="h4-styling">Random Recommendations</h4>
      <div className="artists-grid">
        {accessToken.length > 0 ? (
          recommendationsData.map((data) => {
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
                  {/* <h5>id : {data.id}</h5> */}
                  <h4>{data.name}</h4>
                  <h5>
                    {data.artists.map((artist) => {
                      return <span>{artist.name} </span>;
                    })}
                  </h5>
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

export default Recommendations;
