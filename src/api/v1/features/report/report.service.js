import { Report } from "../patient/index.js";

const allReportsByStatus = async (status) => {
  return await Report.find({ status }).sort({ createdAt: 1 });
};

export { allReportsByStatus };
