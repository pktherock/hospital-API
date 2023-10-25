import mongoose from "mongoose";
import { patientStatus } from "../../../../../constants/patientStatus.js";

const reportSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: patientStatus,
        message: `{VALUE} is not supported, you should use ${patientStatus.toString()}`,
      },
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);

export default Report;
