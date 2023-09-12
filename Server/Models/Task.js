const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
    Task: String,
    Desc: String,
    Status: String
})

const Taskmodel = mongoose.model('Task', TaskSchema);
module.exports = Taskmodel;