"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose = require("mongoose");
dotenv_1.default.config();
const app = (0, express_1.default)();
var cors = require("cors");
const port = process.env.PORT;
const DB = process.env.DB;
app.use(express_1.default.json({ limit: "25mb" }));
app.use(express_1.default.urlencoded({ limit: "25mb" }));
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
mongoose.connection.on("error", (err) => {
    console.log("connected to error", err);
});
app.get("/", (req, res) => {
    res.send("Expre + TypeScript Server");
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
