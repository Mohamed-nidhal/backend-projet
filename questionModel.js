import mongoose, { Schema, Document } from "mongoose";

const questionSchema = new Schema(
  {
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
      type: Schema.Types.ObjectId, // Reference to another question's ID
      ref: 'Question', // Refer to the Question model
      default: null, // Default is null, meaning no dependency
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;
