const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const fs = require("fs");
const path = require("path");
// const axios = require("axios");
const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log(__dirname)
app.get("/auth", async (req, res) => {
  try {
    // const response = await axios.get("https://api.jsonserve.com/Uw5CrX");
    // const data = response.data;
    const filepath=path.join(__dirname,"ques.json");
    console.log(filepath);
    const response=fs.readFileSync("ques.json");
    const data =await JSON.parse(response);
    // fs.writeFileSync("ques.js", JSON.stringify(data, null, 2));
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
});
app.listen(PORT, () => {
  console.log(`connected:- ${PORT}`);
});
