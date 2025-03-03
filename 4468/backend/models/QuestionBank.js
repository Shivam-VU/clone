const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionBankSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question', // Reference to the Question model
        required: true
    }]
});

module.exports = mongoose.model('QuestionBank', QuestionBankSchema);
