import React, { useEffect, useState } from "react";
import axios from "axios";
let accessToken = "";
let refreshToken = "";

function Artists() {
  let [artistData, setArtistData] = useState([]);
  let [timeFilter, setTimeFilter] = useState("long_term");
  let [numberFilter, setNumberFilter] = useState("50");
  useEffect(() => {
    const getUserTopArtist = async () => {
      let authorization_token = "Bearer " + accessToken;
      console.log(authorization_token);

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://api.spotify.com/v1/me/top/artists?limit=${numberFilter}&time_range=${timeFilter}`,
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
  }, [timeFilter, numberFilter]);
  return (
    <>
      <h4 className="h4-styling">Your top artists</h4>
      <h5>Filters : </h5>
      <div
        onChange={(e) => {
          setTimeFilter(e.target.value);
        }}
      >
        <input
          className="span-filters"
          type="radio"
          value="short_term"
          name="timeFilter"
          checked={timeFilter === "short_term"}
        />
        <span className="span-filters">Short</span>
        <input
          className="span-filters"
          type="radio"
          value="medium_term"
          name="timeFilter"
          checked={timeFilter === "medium_term"}
        />
        <span className="span-filters">Medium</span>
        <input
          className="span-filters"
          type="radio"
          value="long_term"
          name="timeFilter"
          checked={timeFilter === "long_term"}
          defaultChecked
        />
        <span className="span-filters">Long</span>
      </div>
      <div
        onChange={(e) => {
          setNumberFilter(e.target.value);
        }}
      >
        <input
          className="span-filters"
          type="radio"
          value="10"
          name="numberFilter"
          checked={numberFilter === "10"}
        />
        <span className="span-filters">10</span>
        <input
          className="span-filters"
          type="radio"
          value="25"
          name="numberFilter"
          checked={numberFilter === "25"}
        />
        <span className="span-filters">25</span>
        <input
          className="span-filters"
          type="radio"
          value="50"
          name="numberFilter"
          checked={numberFilter === "50"}
          defaultChecked
        />
        <span className="span-filters">50</span>
      </div>

      <div className="artists-grid">
        {accessToken.length > 0 ? (
          artistData.map((data) => {
            return (
              <div className="container" key={data.id}>
                <div className="artist-image">
                  <img
                    src={data.images[0].url}
                    width="300px"
                    height="300px"
                    alt="Artist Photo"
                  />
                </div>
                <div className="artist-data">
                  {/* <h4>id : {data.id}</h4> */}
                  <h4>{data.name}</h4>
                  <h5>Popularity : {data.popularity}</h5>
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

export default Artists;
