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
      {
        name: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;
