// import { createServer } from 'http';
import express from "express";
let app = express();

app.get("/api/users", function(req, res) {
  console.log("Hello");
  res.send("working");
});

app.listen(process.env.PORT, "127.0.0.1", () => {
  console.log("api server started");
});