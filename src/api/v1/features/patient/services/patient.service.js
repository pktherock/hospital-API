import STATUS_CODE from "../../../../../constants/statusCode.js";
import { CustomError } from "../../../../common/index.js";
import Patient from "../models/patient.model.js";
import Report from "../models/report.model.js";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

class PatientService {
  createPatient = async (mobileNumber, doctorId) => {
    // search patient by mobile number
    const prevPatient = await Patient.findOne({ mobileNumber });
    if (prevPatient) {
      return prevPatient;
    }
    // create Patient
    const patient = new Patient({
      mobileNumber,
      registeredBy: new ObjectId(doctorId),
    });

    await patient.save();

    return patient;
  };

  createReport = async (patientId, userId, status, date) => {
    // search patient with patientId
    const patient = await Patient.findOne({ _id: new ObjectId(patientId) });

    if (!patient) {
      throw new CustomError("patient not found", STATUS_CODE.NOT_FOUND);
    }

    // create report
    const report = new Report({
      createdBy: new ObjectId(userId),
      patientId: new ObjectId(patientId),
      status,
      date,
    });

    await report.save();

    return report;
  };

  allReports = async (patientId) => {
    // return report in old to new (ascending order)
    return await Report.find({ patientId: new ObjectId(patientId) }).sort({
      createdAt: 1,
    });
  };
}

const patientService = new PatientService();

export default patientService;
