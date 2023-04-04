import express,{Router} from "express"
import { addCamera, deleteCamera, getAllCameras, getSingleCamera, updateCamera } from "../controller/cameraController"

const router :Router= express.Router()

router.route("/").get(getAllCameras).post(addCamera)
router.route("/:id").get(getSingleCamera).put(updateCamera).delete(deleteCamera)
export default router