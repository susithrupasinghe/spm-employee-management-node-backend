const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    username: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required:true,
    },
    password: {
        type: String,
    },
    mobileNumber: {
        type: String,
    },
    salary: {
        type: Number,
    },
    projectsList: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Project"
        }
    ],
    attendanceList: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Attendence"
        }
    ],
    department: {
        type: String,
    },
    rate: {
        type: Number,
    },
    commentList: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment"
        }
    ],
    address: {
        type: String,
    },
    role:{
        type:String
    }
});

module.exports = Employee = mongoose.model("Employee", EmployeeSchema);
