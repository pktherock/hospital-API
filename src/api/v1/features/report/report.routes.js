import { Router } from "express";
import { getAllReportsByStatus } from "./report.controller.js";
import jwtAuth from "../../middlewares/jwtAuth.middleware.js";

const reportRouter = Router();

reportRouter.use(jwtAuth);

reportRouter.get("/:status", getAllReportsByStatus);

export default reportRouter;
