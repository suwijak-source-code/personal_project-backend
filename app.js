require("dotenv").config();
const express = require("express");
const { sequelize } = require("./models");
const cors = require("cors");
const userRoute = require("./routers/userRoute");
const exhibitionRoute = require("./routers/exhibitionRoute");
const contentRoute = require("./routers/contentRoute");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use("/user", userRoute);
app.use("/exhibitions", exhibitionRoute);
app.use("/content", contentRoute);

app.use((req, res, next) => {
  res
    .status(404)
    .json({ message: "path or method is not found on the server." });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

// sequelize.sync({ force: true }).then(() => console.log("Database was sync."));

const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(`The server is still running on port ${port}`)
);
