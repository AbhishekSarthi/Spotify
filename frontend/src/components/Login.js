import React, { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";

function Login() {
  let client_id = "64b2891d55f24004aaf09173a7816598";
  let client_secret = "052814d35e3b4e8c87c579ff6b706e8a";
  let redirect_uri = "http://localhost:3000";
  let state = "asdfghjklpoiuytrewq";
  let scope = "user-read-private%20user-read-email%20user-top-read";
  const [code, setCode] = useState();
  // const [accessToken, setAccessToken] = useState();
  // const [refreshToken, setRefreshToken] = useState();
  let accessToken = "";
  let refreshToken = "";
  const SubmitBtn = async () => {
    console.log(window.location);
    await getAccessToken();
    await getUserData();
  };

  const getUserData = async () => {
    let authorization_token = "Bearer " + accessToken;
    console.log(authorization_token);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://api.spotify.com/v1/me",
      headers: {
        Authorization: authorization_token,
      },
    };

    try {
      let response = await axios.request(config);
      console.log(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const getAccessToken = async () => {
    if (window.location.search) {
      setCode(window.location.search.slice(6));

      let data = qs.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirect_uri,
        client_id: client_id,
        client_secret: client_secret,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://accounts.spotify.com/api/token",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };
      try {
        const response = await axios.request(config);
        console.log(response.data.access_token);

        // setAccessToken(response.data.access_token);
        // setRefreshToken(response.data.refresh_token);
        accessToken = response.data.access_token;
        refreshToken = response.data.refresh_token;
        window.localStorage.setItem("access_token", response.data.access_token);
        window.localStorage.setItem(
          "refresh_token",
          response.data.refresh_token
        );
        console.log(accessToken, refreshToken);
      } catch (e) {
        console.log(e.message, ",", e.response.data.error_description);
      }
    }
  };
  useEffect(() => {
    const url = window.location.href;
    const urlParams = new URLSearchParams(url.substring(url.indexOf("?") + 1));
    const authCode = urlParams.get("code");

    let localCode = window.localStorage.getItem("code");
    // console.log(localCode);
    if (!localCode && window.location.search) {
      console.log(authCode);
      setCode(authCode);
      window.localStorage.setItem("code", authCode);
    } else {
      setCode(localCode);
    }
  }, []);

  return (
    <div className="Login">
      {code ? (
        <button
          onClick={() => {
            SubmitBtn();
          }}
        >
          Get access token
        </button>
      ) : (
        <a
          href={`https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}&state=${state}`}
        >
          Login to Spotify
        </a>
      )}
      <p>{code}</p>
      <p>{accessToken}</p>
    </div>
  );
}

export default Login;
