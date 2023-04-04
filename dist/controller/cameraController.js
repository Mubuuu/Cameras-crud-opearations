"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCamera = exports.updateCamera = exports.getSingleCamera = exports.addCamera = exports.getAllCameras = void 0;
const connection_1 = require("../config/connection");
//@desc Get all cameras
//@route GET /api/camera
const getAllCameras = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let sql = "SELECT * FROM CAMERAS";
    connection_1.db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).json(result);
    });
});
exports.getAllCameras = getAllCameras;
//@desc create cameras
//@route POST /api/camera
const addCamera = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let camera = req.body;
    let sql = "INSERT INTO cameras SET ?";
    connection_1.db.query(sql, camera, (err, result) => {
        if (err) {
            throw err;
        }
        res.status(201).json(camera);
    });
});
exports.addCamera = addCamera;
//@desc Get single camera
//@route GET /api/camera/:id
const getSingleCamera = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    let sql = "SELECT * FROM cameras WHERE id = ?";
    connection_1.db.query(sql, id, (err, result) => {
        if (err) {
            throw err;
        }
        res.status(201).json(result[0]);
    });
});
exports.getSingleCamera = getSingleCamera;
//@desc Update cameras
//@route PUT /api/camera/:id
const updateCamera = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    let camera = req.body;
    let sql = "UPDATE cameras SET ? WHERE id = ?";
    connection_1.db.query(sql, [camera, id], (err, result) => {
        if (err)
            throw err;
        let { changedRows } = result;
        if (changedRows !== 0) {
            res.status(201).json({ message: "camera updated", camera });
        }
        else {
            res.status(200).json({ message: "camera not updated", camera });
        }
    });
});
exports.updateCamera = updateCamera;
//@desc Delete cameras
//@route delete /api/camera/:id
const deleteCamera = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    let sql = `DELETE FROM cameras WHERE id = ?`;
    connection_1.db.query(sql, id, (err, result) => {
        if (err) {
            console.log("Error deleting camera:", err);
            res.status(500).send("Error deleting camera");
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send("Camera not found");
            return;
        }
        const updateQuery = `UPDATE CameraNetworks SET cameras = JSON_REMOVE(cameras, JSON_UNQUOTE(JSON_SEARCH(cameras, 'one', ?))) WHERE JSON_SEARCH(cameras, 'one', ?) IS NOT NULL`;
        connection_1.db.query(updateQuery, [id, id], (err, result) => {
            if (err) {
                res.status(500).send("Error deleting camera");
                return;
            }
            res.send("Camera deleted successfully");
        });
    });
});
exports.deleteCamera = deleteCamera;
