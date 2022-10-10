const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DocumentationSchema = new Schema({
    documentationTitle: {
        type: String,
    },
    documentationDescription: {
        type: String,
    }
});

module.exports = documentation = mongoose.model("Documentation", DocumentationSchema);