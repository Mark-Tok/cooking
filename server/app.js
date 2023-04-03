const express = require("express");
const app = express();
const cors = require("cors");
const decodeTokens = require("./tokens");
const list = require("./list");
const recipes = require("./recipes");
app.use("/images", express.static("images"));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

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

app.get("/list/:id", (req, res) => {
  const { id } = req.params;
  const recipe = recipes.filter((item) => String(item.id) === String(id));

  //задержка для имитации
  setTimeout(() => {
    return res.status(200).json(recipe);
  }, 1000);
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

app.use("/fetchPutRecipe", (req, res) => {
  const data = req.body;
  let indexRecipe;
  recipes.forEach((item, index) => {
    if (item.id === data.id) {
      indexRecipe = index;
    }
  });
  recipes.splice(indexRecipe, 1, data);
  list.forEach((item, index) => {
    if (item.id === data.id) {
      indexRecipe = index;
    }
  });
  list.splice(indexRecipe, 1, data);
  setTimeout(() => {
    return res.status(200).json({ data });
  },1000);
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
      //задержка для имитации
      setTimeout(() => {
        return res.json({ token: user.token });
      }, 1000);
    } else {
      return res.status(401).send({
        error: "Имя пользователя или парль не верные, проверьте данные",
      });
    }
  }
});

app.post("/fetchPostRecipe", (req, res) => {
  const {
    id,
    createdUserId,
    name,
    description,
    likes,
    composition,
    image,
    compositionBase,
    steps,
    userIdLiked,
    level,
  } = req.body;
  const data = {
    id,
    createdUserId,
    name,
    description,
    likes,
    composition,
    image,
    compositionBase,
    steps,
    userIdLiked,
    level,
  };

  const listData = {
    id,
    createdUserId,
    name,
    description,
    likes,
    image,
    compositionBase,
    userIdLiked,
    level,
  };

  recipes.push(data);
  list.unshift(listData);
  setTimeout(() => {
    return res.status(200).json({
      ...data,
    });
  }, 1000);
});
