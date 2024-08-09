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
    mandatory: { // Ajout du champ pour les questions obligatoires
      type: Boolean,
      default: false, // Par défaut, une question n'est pas obligatoire
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;