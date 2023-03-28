const express = require("express");
const app = express();
const cors = require("cors");
const decodeTokens = require("./usersTokens");

const DATA = [{ id: 1, title: "title", description: "Lolka123" }];

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.listen(5000, () => console.log("Server up"));

app.get("/api/recepts", (req, res) => {
  return res.status(200).json(DATA);
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
      return res.json({ token: user.token });
    } else {
      return res
        .status(401)
        .send({
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
