import mongoose, { Schema, Document } from "mongoose";

const questionSchema = new Schema(
  {
    _id: {
      type: Number, // Use Number for custom IDs
      required: true
    },
    title: {
      type: String,
      required: [true, "Question required"],
      minlength: [3, "Too short question name"],
      maxlength: [50, "Too long question name"],
    },
    type: {
      type: String,
      enum: ["text", "number", "email", "textArea", "checkbox", "radio"],
    },
    options: [
      { type: String }
    ],
    mandatory: {
      type: Boolean,
      default: false,
    },
    dependentOn: {
      type: Number, // Reference to another question's ID
      default: null, // Default is null, meaning no dependency
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;
