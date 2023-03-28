const express = require("express");
const path = require("path");
let cookie_parser = require("cookie-parser");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");

const DATA = [{ id: 1, title: "title", description: "Lolka123" }];

// app.options("/api/recepts",  (require, resolve) => {
//   resolve.set({
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "*",
//     "Access-Control-Allow-Headers": "*",
//   });
//   return resolve.end();
// });

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/api/recepts", (require, resolve) => {
  return resolve.status(200).json(DATA);
});

app.get("/auth", (req, res) => {
  //logic auth
  return res.json({ token });
});

// app.get("*", (require, resolve) => {
//   resolve.status(200)
// });

// app.get("*", (require,resolve) => {
//     console.log(resolve, 'resolve')
//     resolve.sendFile(path.resolve(__dirname, '../', 'pub.html'))
// })

app.listen(5000, () => console.log("Server up"));
