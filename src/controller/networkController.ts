import { Request, Response } from "express";
import { db } from "../config/connection";

//@desc Get all cameranetworks
  //@route GET /api/cameranetworks
export const getAllCameraNetworks = async (req: Request, res: Response) => {
  let sql = "SELECT * FROM CameraNetworks";
  db.query(sql, (err: any, result: any) => {
    if (err) {
      throw err;
    }
    result.forEach((result: any) => {
      result.cameras = JSON.parse(result.cameras);
    });
    res.send(result);
  });
};

//@desc Get single cameranetworks
  //@route GET /api/cameranetworks/:id
export const getSingleCameraNetworks = async (req: Request, res: Response) => {
  const { id } = req.params;
  let sql = "SELECT * FROM CameraNetworks WHERE id = ?";
  db.query(sql, id, (err: any, result: any) => {
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
};

//@desc Create cameranetworks
  //@route POST /api/cameranetworks
export const createNetwork = async (req: Request, res: Response) => {
  const { name, description, cameras } = req.body;
  let sql =
    "INSERT INTO CameraNetworks (name, description, cameras) VALUES (?, ?, ?)";
  db.query(
    sql,
    [name, description, JSON.stringify(cameras)],
    (err: any, result: any) => {
      if (err) {
        console.log("Error creating CameraNetwork:", err);
        res.status(500).send("Error creating CameraNetwork");
        return;
      }
      res.status(201).json("cameraNetworks created successfully");
    }
  );
};

//@desc Update cameranetworks
  //@route PUT /api/cameranetworks/:id
export const updateCameraNetwork = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, cameras } = req.body;
  let sql =
    `UPDATE cameranetworks SET name = ?, description = ?, cameras = ? WHERE id = ?`;
  db.query(sql, [name, description, cameras, id], (err: any, result: any) => {
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
};

//@desc Delete cameranetworks
  //@route DELETE /api/cameranetworks/:id
export const deleteCameraNetwork = async (req: Request, res: Response) => {
  const { id } = req.params;
  let sql =
  `DELETE FROM CameraNetworks WHERE id = ?`;
  db.query(sql, [id], (err: any, result: any) => {
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
};
