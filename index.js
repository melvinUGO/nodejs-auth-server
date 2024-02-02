const express = require("express");
const app = express();
const authRouter = require("./routes/auth");
const connectDB = require("./db/connect");
require("dotenv").config();
require("express-async-errors");
const notFound = require("./middleware/not-found");
const cors = require("cors");
const authenticateUser = require("./middleware/authentication");

// middleware

app.use(express.json());
app.use(cors());

// routes

app.use("/api/v1/auth", authRouter);

app.use(notFound);
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
