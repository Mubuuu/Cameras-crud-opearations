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
// get all camera
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
//create camera
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
//get single camera
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
//update camera
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
const deleteCamera = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    let sql = `DELETE FROM cameras WHERE id = ?`;
    connection_1.db.query(sql, id, (err, result) => {
        if (err) {
            console.log('Error deleting camera:', err);
            res.status(500).send('Error deleting camera');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Camera not found');
            return;
        }
        res.status(200).json('Camera deleted successfully');
    });
});
exports.deleteCamera = deleteCamera;
