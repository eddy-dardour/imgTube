require("dotenv").config();
const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const User = require("./Schemas/UserSchema");
const Video = require("./Schemas/VideoSchema");
const cors = require("cors");
const fs = require("fs");
const up = require("express-fileupload");
const path = require("path");

app.listen(process.env.SERVER_PORT, () => {
  console.log(`App listening on port : ${process.env.SERVER_PORT}`);
});
app.use(express.json({ extended: false }));
app.use(express.static(__dirname + "Static"));
app.use(express.urlencoded({ extended: false }));
app.use(up());
app.use(
  cors({
    methods: "*",
    origin: `http://localhost:${process.env.PORT}`,
  })
);
mongoose.connect(
  "mongodb://localhost:27017/Test",
  { useNewUrlParser: true },
  () => {
    console.log("Connected");
  }
);

app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username: username,
      email: email,
      password: password,
    });
    await user.save();
    console.log("User saved");
    res.status(200).send("Successfully registered");
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/api/login", async (req, res) => {
  const { email, password } = req.query;
  try {
    const loggedUser = await User.findOne({ email: email, password: password });
    if (loggedUser === null) {
      res.send("Your password or email are incorrect. Try again.");
    } else {
      res.send("Successfully logged in");
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/api/videos/get-by-title/:title", async (req, res) => {
  const { title } = req.params;
  console.log(title);
  try {
    const video = await Video.findOne({ title : title })
    if (video) {
      res.status(200).json(video);
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/api/videos/get-one/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.find({ id: id }).limit(1);
    let array = [];
    for (let i of video) {
      array.push({
        data: i.data.toString("base64"),
        id: i.id,
        views: i.views,
        likes: i.likes,
      });
    }
    if (video) {
      res.status(200).json(array);
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.patch("/api/videos/get-one/:id", async (req, res) => {
  const { id } = req.params;
  const { viewed, liked } = req.body;
  if (viewed === true) {
    try {
      const views = await Video.findOne({ id: id });
      views.views++;
      views.save();
      res.status(200);
    } catch (error) {
      console.log(error.message);
    }
  }
  if (liked === true) {
    try {
      const likes = await Video.findOne({ id: id });
      likes.likes++;
      likes.save();
    } catch (error) {
      console.log(error.message);
    }
  }
});

app.get("/api/videos/get", async (req, res) => {
  const array = [];
  try {
    const videos = await Video.find({}).limit(9);
    for (let i of videos) {
      array.push({
        data: i.data.toString("base64"),
        title: i.title,
        id: i.id,
        views : i.views,
        likes : i.likes
      });
    }
  } catch (error) {
    console.log(error.message);
  }
  res.status(200).json(array);
});

app.post("/api/videos/post", async (req, res) => {
  try {
    if (req.body.title) {
      console.log("Creating Data");
      const video = await new Video({
        title: req.body.title,
        data: req.files.file.data,
        views: 0,
        likes: 0,
        id: uuidv4(),
      });
      await video.save();
    }
  } catch (error) {
    console.log(error.message);
  }
});
