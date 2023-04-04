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
exports.deleteCameraNetwork = exports.updateCameraNetwork = exports.createNetwork = exports.getSingleCameraNetworks = exports.getAllCameraNetworks = void 0;
const connection_1 = require("../config/connection");
//@desc Get all cameranetworks
//@route GET /api/cameranetworks
const getAllCameraNetworks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let sql = "SELECT * FROM CameraNetworks";
    connection_1.db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        result.forEach((result) => {
            result.cameras = JSON.parse(result.cameras);
        });
        res.send(result);
    });
});
exports.getAllCameraNetworks = getAllCameraNetworks;
//@desc Get single cameranetworks
//@route GET /api/cameranetworks/:id
const getSingleCameraNetworks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let sql = "SELECT * FROM CameraNetworks WHERE id = ?";
    connection_1.db.query(sql, id, (err, result) => {
        if (err) {
            res.status(500).send("Error creating CameraNetwork");
            return;
        }
        if (result.length === 0) {
            res.status(404).send("CameraNetwork not found");
            return;
        }
        const results = result[0];
        results.cameras = JSON.parse(results.cameras);
        res.send(result);
    });
});
exports.getSingleCameraNetworks = getSingleCameraNetworks;
//@desc Create cameranetworks
//@route POST /api/cameranetworks
const createNetwork = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, cameras } = req.body;
    let sql = "INSERT INTO CameraNetworks (name, description, cameras) VALUES (?, ?, ?)";
    connection_1.db.query(sql, [name, description, JSON.stringify(cameras)], (err, result) => {
        if (err) {
            console.log("Error creating CameraNetwork:", err);
            res.status(500).send("Error creating CameraNetwork");
            return;
        }
        res.status(201).json("cameraNetworks created successfully");
    });
});
exports.createNetwork = createNetwork;
//@desc Update cameranetworks
//@route PUT /api/cameranetworks/:id
const updateCameraNetwork = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description, cameras } = req.body;
    let sql = `UPDATE cameranetworks SET name = ?, description = ?, cameras = ? WHERE id = ?`;
    connection_1.db.query(sql, [name, description, cameras, id], (err, result) => {
        if (err) {
            res.status(500).send("Error updating camera network");
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send("Camera network not found");
            return;
        }
        res.send("Updated camera network successfully");
    });
});
exports.updateCameraNetwork = updateCameraNetwork;
//@desc Delete cameranetworks
//@route DELETE /api/cameranetworks/:id
const deleteCameraNetwork = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let sql = `DELETE FROM CameraNetworks WHERE id = ?`;
    connection_1.db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).send('Error deleting camera network');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Camera network not found');
            return;
        }
        res.send('Deleted camera network successfully');
    });
});
exports.deleteCameraNetwork = deleteCameraNetwork;
