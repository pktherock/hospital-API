import { Router } from "express";
import jwtAuth from "../../../middlewares/jwtAuth.middleware.js";
import patientController from "../controllers/patient.controller.js";

const patientRouter = Router();
patientRouter.use(jwtAuth);

patientRouter.post("/register", patientController.postRegisterPatient);
patientRouter.post("/:id/create-report", patientController.postCreateReport);
patientRouter.get("/:id/all-reports", patientController.getAllReports);

export default patientRouter;
