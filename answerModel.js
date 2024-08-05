import mongoose, { Schema } from "mongoose";

const answerSchema = new Schema({
    dataArray: [{ 
        name: {
            type: String,
            required: true
        },
        answer: {
            type: Schema.Types.Mixed, // Allows you to store different data types for the 'data' field
            required: true
        }
    }]
}, { timestamps: true });

const AnswerModel = mongoose.model("Answer", answerSchema);

export default AnswerModel;
