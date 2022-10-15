const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
    issueName: {
        type: String,
    },
    project_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    sprint_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    description: {
        type: String,
    },
    points: {
        type: Number,
    },
    assignee: {
        type: Schema.Types.ObjectId,
        ref: "Employee"
    },
    progress: {
        type: String
    },
    estimatedTime: {
        type: String
    }
});

module.exports = Issue = mongoose.model("Issue", IssueSchema);
