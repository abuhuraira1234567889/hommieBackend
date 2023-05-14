import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const mongoose = require("mongoose");

dotenv.config();
const app: Express = express();
var cors = require("cors");

const port = process.env.PORT;
const DB = process.env.DB;
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use(cors());
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

require("./src/modals/login");

require("./src/modals/complain");
require("./src/modals/request");
require("./src/modals/client");

require("./routes/client")(app);

require("./routes/complain")(app);

require("./routes/profile")(app);
require("./routes/request")(app);


mongoose.connect(DB);
mongoose.connection.on("connected", () => {
  console.log("connected to mongodb");
});
mongoose.connection.on("error", (err: any) => {
  console.log("connected to error", err);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Expre + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
