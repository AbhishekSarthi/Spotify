const express = require("express");
const app = express();
const axios = require("axios");
var request = require("request");

var client_id = "64b2891d55f24004aaf09173a7816598";
let client_secret = "052814d35e3b4e8c87c579ff6b706e8a";
var redirect_uri = "http://localhost:5000/callback";

app.get("/login", function (req, res) {
  var state = "asdfghjklpoiuytrewq";
  var scope = "user-read-private%20user-read-email";
  //   console.log(res);
  res.redirect(
    `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}&state=${state}`
  );
});

app.get("/callback", function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null) {
    // res.redirect(
    //   "/#" +
    //     querystring.stringify({
    //       error: "state_mismatch",
    //     })
    // );
    res.send("ERROR");
  } else {
    // res.clearCookie(stateKey);
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(body);
        var access_token = body.access_token,
          refresh_token = body.refresh_token;

        var options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        // use the access token to access the Spotify Web API
        request.get(options, function (error, response, body) {
          console.log(body);
        });

        //     querystring.stringify({
        //       access_token: access_token,
        //       refresh_token: refresh_token,
        //     })
        // );
        res.send("success");
      } else {
        // res.redirect(
        //   "/#" +
        //     querystring.stringify({
        //       error: "invalid_token",
        //     })
        // );
        res.send("ERR");
      }
    });
  }
});

// app.get("/callback", async function (req, res) {
//   var code = req.query.code || null;
//   var state = req.query.state || null;
//   //   console.log(code, state);

//   let data = await getAccessToken(client_id, code);
//   console.log(data);
//   res.send("Hell");
//   //   if (state === null) {
//   //     res.redirect(
//   //       "/#" +
//   //         querystring.stringify({
//   //           error: "state_mismatch",
//   //         })
//   //     );
//   //   } else {
//   //     var authOptions = {
//   //       url: "https://accounts.spotify.com/api/token",
//   //       form: {
//   //         code: code,
//   //         redirect_uri: "http://localhost:3000/",
//   //         grant_type: "authorization_code",
//   //       },
//   //       headers: {
//   //         "content-type": "application/x-www-form-urlencoded",
//   //         Authorization:
//   //           "Basic " +
//   //           new Buffer.from(client_id + ":" + client_secret).toString("base64"),
//   //       },
//   //       json: true,
//   //     };
//   //     axios
//   //       .request(authOptions)
//   //       .then((response) => {
//   //         console.log(JSON.stringify(response.data));
//   //         res.status();
//   //       })
//   //       .catch((error) => {
//   //         console.log(error);
//   //       });
//   //   }
//   //   console.log(req);
// });

// async function getAccessToken(clientId, code) {
//   //   const verifier = localStorage.getItem("verifier");

//   const params = new URLSearchParams();
//   //   params.append("client_id", clientId);
//   params.append("grant_type", "authorization_code");
//   params.append("code", code);
//   params.append("redirect_uri", "http://localhost:5000");
//   //   params.append("code_verifier", verifier);

//   const result = await fetch("https://accounts.spotify.com/api/token", {
//     method: "POST",
//     headers: {
//       "content-type": "application/x-www-form-urlencoded",
//       Authorization:
//         "Basic " +
//         new Buffer.from(client_id + ":" + client_secret).toString("base64"),
//     },
//     body: params,
//   });
//   const { access_token } = await result.json();
//   console.log(result);
//   console.log(access_token);
//   return access_token;
// }

app.listen(5000, () => {
  console.log("Server Started on Port : 5000");
});
