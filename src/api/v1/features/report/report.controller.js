import asyncHandler from "express-async-handler";
import { CustomError } from "../../../common/index.js";
import STATUS_CODE from "../../../../constants/statusCode.js";
import { allReportsByStatus } from "./report.service.js";
import { patientStatus } from "../../../../constants/patientStatus.js";

const getAllReportsByStatus = asyncHandler(async (req, res) => {
  const { status } = req.params;

  if (!status) {
    throw new CustomError(
      "status is required to get reports",
      STATUS_CODE.BAD_REQUEST
    );
  }

  if (!patientStatus.includes(status)) {
    return res
      .status(STATUS_CODE.BAD_REQUEST)
      .json({
        success: false,
        message: `make sure that, status you are passing in path params should be one of the ${patientStatus.toString()}`,
      });
  }

  const reports = await allReportsByStatus(status);
  return res.status(STATUS_CODE.OK).json(reports);
});

export { getAllReportsByStatus };
