const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const app = express();
const Taskmodel = require("./Models/Task")
const dotenv = require("dotenv");

//middlewares to parsedata and to communicate backend and frontend . 
app.use(cors({
    origin: ["https://alhansat-kanban-board-frontend.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://alhansat-kanban-board-frontend.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
//mongoose connection
mongoose.connect('mongodb+srv://srmate1516:smkanban@cluster0.mah2nda.mongodb.net/first?retryWrites=true&w=majority');

dotenv.config({
    path: './data/config.env'
})

app.get("/", (req, resp) => {
    resp.json("Hello bakend here !!!")
})

//route to get information of To do Task.
app.get("/getTasksToDo", (req, res) => {
    Taskmodel.find({ Status: "TOdo" })
        .then(result => res.json(result))
        .catch(err => res.json(err));
})

//route to get information of Doing Tasks 
app.get("/getTasksDoing", (req, res) => {
    Taskmodel.find({ Status: "Doing" })
        .then(result => res.json(result))
        .catch(err => res.json(err));
})


//to get information of done task . 
app.get("/getTasksDone", (req, res) => {
    Taskmodel.find({ Status: "Done" })
        .then(result => res.json(result))
        .catch(err => res.json(err));
})

//route to add task . 
app.post("/addTask", (req, res) => {
    const Task = req.body.Task;
    const Desc = req.body.Desc;
    const Status = req.body.Status;
    Taskmodel.create({
        Task: Task,
        Desc: Desc,
        Status: Status
    }).then(result => res.json(result))
        .catch(err => res.json(err));
})

//update task 
app.post("/updateTaskStatus/:id", (req, res) => {
    const taskId = req.params.id;
    const newStatus = req.body.status;

    Taskmodel.findByIdAndUpdate(taskId, { Status: newStatus }, { new: true })
        .then((updatedTask) => {
            res.json(updatedTask);
        })
        .catch((error) => {
            res.status(500).json({ error: "Error updating task status" });
        });
});

//update entire task 
app.put('/update/:id', async (req, res) => {
    const taskId = req.params.id;
    const Task = req.body.Task;
    const Desc = req.body.Desc;
    Taskmodel.findByIdAndUpdate(taskId, { Task: Task, Desc: Desc }, { new: true })
        .then((updatedTask) => {
            res.json(updatedTask);
        })
        .catch((error) => {
            res.status(500).json({ error: "Error updating task status" });
        });
});

//delete task 
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    Taskmodel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err));

})



//creating server on 3001 port . 
app.listen(3001, () => {
    console.log("server is running ");
})
