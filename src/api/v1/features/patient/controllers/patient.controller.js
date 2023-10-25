import asyncHandler from "express-async-handler";
import patientService from "../services/patient.service.js";
import STATUS_CODE from "../../../../../constants/statusCode.js";
import { CustomError } from "../../../../common/index.js";

class PatientController {
  postRegisterPatient = asyncHandler(async (req, res) => {
    const { mobileNumber } = req.body;
    const { userId } = req.user;

    if (!mobileNumber) {
      throw new CustomError(
        "mobileNumber is required",
        STATUS_CODE.BAD_REQUEST
      );
    }

    const patient = await patientService.createPatient(mobileNumber, userId);

    return res.status(STATUS_CODE.CREATED).json(patient);
  });

  postCreateReport = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { userId } = req.user;
    const { status, date } = req.body;
    if (!(status && date)) {
      throw new CustomError(
        "status and date is required",
        STATUS_CODE.BAD_REQUEST
      );
    }

    const report = await patientService.createReport(id, userId, status, date);

    return res.status(STATUS_CODE.CREATED).json(report);
  });

  getAllReports = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const reports = await patientService.allReports(id);

    return res.status(STATUS_CODE.OK).json(reports);
  });
}

const patientController = new PatientController();

export default patientController;
