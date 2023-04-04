import { Request, Response } from "express";
import { db } from "../config/connection";

//@desc Get all cameras
//@route GET /api/camera
export const getAllCameras = async (req: Request, res: Response) => {
  let sql = "SELECT * FROM CAMERAS";
  db.query(sql, (err: any, result: any) => {
    if (err) {
      throw err;
    }
    res.status(200).json(result);
  });
};

//@desc create cameras
//@route POST /api/camera
export const addCamera = async (req: Request, res: Response) => {
  let camera = req.body;
  let sql = "INSERT INTO cameras SET ?";
  db.query(sql, camera, (err, result) => {
    if (err) {
      throw err;
    }
    res.status(201).json(camera);
  });
};

//@desc Get single camera
//@route GET /api/camera/:id
export const getSingleCamera = async (req: Request, res: Response) => {
  let { id } = req.params;
  let sql = "SELECT * FROM cameras WHERE id = ?";
  db.query(sql, id, (err, result) => {
    if (err) {
      throw err;
    }
    res.status(201).json(result[0]);
  });
};

//@desc Update cameras
//@route PUT /api/camera/:id
export const updateCamera = async (req: Request, res: Response) => {
  let { id } = req.params;
  let camera = req.body;
  let sql = "UPDATE cameras SET ? WHERE id = ?";
  db.query(sql, [camera, id], (err, result) => {
    if (err) throw err;
    let { changedRows } = result;
    if (changedRows !== 0) {
      res.status(201).json({ message: "camera updated", camera });
    } else {
      res.status(200).json({ message: "camera not updated", camera });
    }
  });
};

//@desc Delete cameras
//@route delete /api/camera/:id
export const deleteCamera = async (req: Request, res: Response) => {
  let { id } = req.params;
  let sql = `DELETE FROM cameras WHERE id = ?`;
  db.query(sql, id, (err, result) => {
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
    db.query(updateQuery, [id, id], (err, result) => {
      if (err) {
        res.status(500).send("Error deleting camera");
        return;
      }
      res.send("Camera deleted successfully");
    });
  });
};
