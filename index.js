import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World !");
});

app.listen(8082, () => {
  console.log("Server is listenning at port 8082");
});

setTimeout(() => {
  process.exit(0);
}, 3000);