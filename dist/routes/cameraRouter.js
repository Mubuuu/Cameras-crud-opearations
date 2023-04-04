"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cameraController_1 = require("../controller/cameraController");
const router = express_1.default.Router();
router.route("/").get(cameraController_1.getAllCameras).post(cameraController_1.addCamera);
router.route("/:id").get(cameraController_1.getSingleCamera).put(cameraController_1.updateCamera).delete(cameraController_1.deleteCamera);
exports.default = router;
