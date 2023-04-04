"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const networkController_1 = require("../controller/networkController");
const router = express_1.default.Router();
router.route("/").get(networkController_1.getAllCameraNetworks).post(networkController_1.createNetwork);
router
    .route("/:id")
    .get(networkController_1.getSingleCameraNetworks)
    .post(networkController_1.createNetwork)
    .put(networkController_1.updateCameraNetwork)
    .delete(networkController_1.deleteCameraNetwork);
exports.default = router;
