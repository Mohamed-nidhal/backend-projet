import mongoose, { Schema, Document } from "mongoose";

const answerSchema = new Schema(
  {
    question: { 
      type: Schema.Types.ObjectId, 
      ref: "Question", 
      required: true 
    },
    answer: {
      type: Schema.Types.Mixed, 
      required: true
    },
    
  },
  { timestamps: true }
);

const Answer = mongoose.model("Answer", answerSchema);

export default Answer;
