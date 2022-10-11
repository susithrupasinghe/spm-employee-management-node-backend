const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DocumentationSchema = new Schema({
    projectId:{
        type: String,
    },
    documentationTitle: {
        type: String,
    },
    documentationDescription: {
        type: String,
    },
    status:{
        type:String
    },
});

module.exports = Documentation = mongoose.model("Documentation", DocumentationSchema);