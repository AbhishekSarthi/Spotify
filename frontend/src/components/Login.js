import React from "react";
import axios from "axios";

function Login() {
  const SubmitBtn = async () => {
    let { data } = await axios.get("http://localhost:5000/artist");
    console.log(data);
  };

  return (
    <div>
      <button
        className="spotify-btn"
        onClick={() => {
          SubmitBtn();
        }}
      >
        Login to Spotify
      </button>
    </div>
  );
}

export default Login;
