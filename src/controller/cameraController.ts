import { Request, Response } from "express";
import { db } from "../config/connection";

// get all camera
export const getAllCameras = async (req: Request, res: Response) => {
  let sql = "SELECT * FROM CAMERAS";
  db.query(sql, (err: any, result: any) => {
    if (err) {
      throw err;
    }
    res.status(200).json(result);
  });
};
//create camera
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
//get single camera
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
//update camera
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
export const deleteCamera = async (req: Request, res: Response) => {
  let { id } = req.params;
  let sql = `DELETE FROM cameras WHERE id = ?`;
  db.query(sql, id, (err, result) => {
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
};
