import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "user name is required"],
      unique: [true, "user name is already taken"],
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email is already taken"],
      lowercase: true,
      validate: {
        validator: function (v) {
          // This regular expression checks for a valid email format
          return /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    role: {
      type: String,
      enum: {
        values: ["DOCTOR"],
        message: "{VALUE} is not supported",
      },
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [
        6,
        "The value of path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).",
      ],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
