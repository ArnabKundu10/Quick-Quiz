const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require("fs");
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

app.get("/auth", async (req, res) => {
  try {
    const response = await fetch("https://api.jsonserve.com/Uw5CrX");
    const data = await response.json();
    console.log(data);
    fs.writeFileSync("ques.json", JSON.stringify(data, null, 2));
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
});
app.listen(PORT, () => {
  console.log(`connected:- ${PORT}`);
});
