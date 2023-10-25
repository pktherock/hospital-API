import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
      minLength: 10,
      maxLength: 10,
      validate: {
        validator: function (v) {
          // Custom validation function for Indian phone numbers
          return /^[789]\d{9}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid Indian phone number!`,
      },
    },
    registeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
