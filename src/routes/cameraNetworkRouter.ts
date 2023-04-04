import express, { Router } from "express";
import {
  createNetwork,
  deleteCameraNetwork,
  getAllCameraNetworks,
  getSingleCameraNetworks,
  updateCameraNetwork,
} from "../controller/networkController";

const router: Router = express.Router();
router.route("/").get(getAllCameraNetworks).post(createNetwork);
router
  .route("/:id")
  .get(getSingleCameraNetworks)
  .post(createNetwork)
  .put(updateCameraNetwork)
  .delete(deleteCameraNetwork);
  
export default router;
