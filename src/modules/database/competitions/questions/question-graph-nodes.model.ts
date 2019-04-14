import * as mongoose from "mongoose";
import { Questions } from "../../questions/questions.model";

export interface QuestionGraphNodes extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    question: (Questions | mongoose.Types.ObjectId | string);
    dependsOn: (Questions | mongoose.Types.ObjectId | string);
}

export const QuestionGraphNodesSchema = new mongoose.Schema({
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "questions",
        required: true
    },
    dependsOn: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    }
});
