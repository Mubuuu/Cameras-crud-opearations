"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connection_1 = require("./config/connection");
const cameraRouter_1 = __importDefault(require("./routes/cameraRouter"));
const cameraNetworkRouter_1 = __importDefault(require("./routes/cameraNetworkRouter"));
const app = (0, express_1.default)();
//connect DB
connection_1.db.connect(function (err) {
    if (err) {
        throw err;
    }
    console.log("Connected to the MySQL server.");
});
app.use(express_1.default.json());
// Routes
app.use("/api/camera", cameraRouter_1.default);
app.use("/api/cameranetworks", cameraNetworkRouter_1.default);
const port = 5000;
app.listen(5000, () => {
    console.log(`server started on port ${port}`);
});
