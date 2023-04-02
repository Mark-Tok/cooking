const express = require("express");
const app = express();
const cors = require("cors");
const decodeTokens = require("./tokens");
const recipes = require("./recipes");
const list = require("./list");

app.use("/images", express.static("images"));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.listen(5000, () => console.log("Server up"));

app.get("/list", (req, res) => {
  const authorization = req.get("Authorization");
  const { search } = req.query;
  if (!search) {
    const response = list.map((item) => {
      return { ...item, ratingVisible: !!authorization ? true : false };
    });
    return res.status(200).json(response);
  }
  const filtredArray = list.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.compositionBase.join("").toLowerCase().includes(search.toLowerCase())
  );
  return res.status(200).json(filtredArray);
});

app.put("/udateRecipeLiked", (req, res) => {
  const { userId, recipeId, status } = req.body;
  if (!!userId && !!recipeId) {
    list.forEach((item) => {
      if (item.id === recipeId) {
        if (status === "like") {
          item.likes += 1;
          item.userIdLiked.push(userId);
        }
        if (status === "dislike") {
          item.likes -= 1;
          item.userIdLiked = item.userIdLiked.filter((item) => item !== userId);
        }
      }
    });
    return res.status(201).json({ recipeId });
  }
});

app.post("/auth", (req, res) => {
  const { userName, password } = req.body;
  if (!userName) {
    return res.status(401).send({ error: "Введите имя пользователя" });
  }
  if (!password) {
    return res.status(401).send({ error: "Введите пароль" });
  }
  if (!!password && !!userName) {
    const user = decodeTokens.find(({ userName: name }) => name === userName);
    const pass = user?.password === password;
    if (!!user?.userName && !!pass) {
      //Имитация задержки для наглядности
      setTimeout(() => {
        return res.json({ token: user.token });
      }, 100);
    } else {
      return res.status(401).send({
        error: "Имя пользователя или парль не верные, проверьте данные",
      });
    }
  }
});

// app.get("*", (require, resolve) => {
//   resolve.status(200)
// });

// app.get("*", (require,resolve) => {
//     console.log(resolve, 'resolve')
//     resolve.sendFile(path.resolve(__dirname, '../', 'pub.html'))
// })
