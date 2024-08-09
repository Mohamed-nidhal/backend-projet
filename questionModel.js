import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: [true, "Question required"],
      minlength: [3, "Too short question name"],
      maxlength: [50, "Too long question name"],
    },
    type: {
      type: String,
      enum: ["text", "number", "email", "long-text", "multiple-choice", "likert"],
      required: true,
    },
    options: [
      { type: String }
    ],
    mandatory: {
      type: Boolean,
      default: false,
    },
    // Remove dependentOn field
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;
