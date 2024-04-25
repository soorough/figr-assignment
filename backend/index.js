require('dotenv').config();
const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index");

const app = express();
PORT = process.env. PORT || 3000;

app.use(
  cors({
    origin: ['http://localhost:3000','https://figr-assignment.vercel.app'],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/api/v1", rootRouter);

app.listen(PORT || 3000, function (err) {
  if (err) console.log(err);
  console.log(`Server listening to ${PORT}`);
});













