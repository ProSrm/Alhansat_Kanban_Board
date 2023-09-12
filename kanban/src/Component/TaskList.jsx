import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import "./css/TaskList.css";
import axios from "axios"
// const TaskContext = createContext();
const TaskList = (props) => {

    const { refreshTaskList } = props;

    const [ToDO, setToDO] = useState([]);
    const [Doing, setDoing] = useState([]);
    const [Done, setDone] = useState([])

    //function to drag and drop functionality
    const dragStarted = (e) => {
        e.preventDefault();
        console.log("drag started");
    }

    //funciton to drag completion on (Doing section )

    const drageComplete = (e) => {
        let taskid = e.dataTransfer.getData('taskid');
        let updatedTasks = [...ToDO, ...Done];
        const taskToMove = updatedTasks.find((task) => task._id === taskid);
        // console.log("you dropped an item " + taskid);
        if (taskToMove) {
            const targetSection = e.target.className;
            taskToMove.status = targetSection;
            setToDO(updatedTasks);
            setDoing([...Doing, taskToMove])

            axios.post(`http://localhost:3001/updateTaskStatus/${taskid}`, { status: targetSection })
                .then((response) => {
                    console.log("Task status updated in the database:", response.data);
                })
                .catch((error) => {
                    console.error("Error updating task status:", error);
                });
            console.log("You have Dropped an item");
            // console.log(Doing);
        }
    }
    //will execute after drag completion on (Done section)
    const drageCompleteDone = (e) => {
        let taskid = e.dataTransfer.getData('taskid');
        let updatedTasks = [...ToDO, ...Doing];
        let taskToMoveDone = updatedTasks.find((task) => task._id === taskid);
        console.log("you dropped an item " + taskToMoveDone);
        if (taskToMoveDone) {
            console.log("Done");
            const targetSection = e.target.className;
            taskToMoveDone.status = targetSection;
            setToDO(updatedTasks);
            setDone([...Done, taskToMoveDone])

            axios.post(`http://localhost:3001/updateTaskStatus/${taskid}`, { status: targetSection })
                .then((response) => {
                    console.log("Task status updated in the database:", response.data);
                })
                .catch((error) => {
                    console.error("Error updating task status:", error);
                });

            console.log("You have Dropped an item");
            // console.log(Done);
        }
    }

    //will execute after drag completion on (TODO section )
    const drageCompleteTODO = (e) => {
        let taskid = e.dataTransfer.getData('taskid');
        let updatedTasks = [...Done, ...Doing];
        let taskToMoveDone = updatedTasks.find((task) => task._id === taskid);
        console.log("you dropped an item " + taskToMoveDone);
        if (taskToMoveDone) {
            console.log("todo");
            const targetSection = e.target.className;
            taskToMoveDone.status = targetSection;
            // setToDO(updatedTasks);
            setToDO([...ToDO, taskToMoveDone])

            axios.post(`http://localhost:3001/updateTaskStatus/${taskid}`, { status: targetSection })
                .then((response) => {
                    console.log("Task status updated in the database:", response.data);
                })
                .catch((error) => {
                    console.error("Error updating task status:", error);
                });

            console.log("You have Dropped an item");
            // console.log(Done);
        }
    }


    //UseEffect for getting ToDO data  
    useEffect(() => {
        axios.get("http://localhost:3001/getTasksToDo")
            .then(result => setToDO(result.data))
            .catch(err => console.log(err))
    }, [refreshTaskList, Doing])

    //useEffect for getting Doing data 
    useEffect(() => {
        axios.get("http://localhost:3001/getTasksDoing")
            .then(result => setDoing(result.data))
            .catch(err => console.log(err))
    }, [refreshTaskList, Done])

    //useEffect for getting Done data 
    useEffect(() => {
        axios.get("http://localhost:3001/getTasksDone")
            .then(result => setDone(result.data))
            .catch(err => console.log(err))
    }, [refreshTaskList, Doing])
    return <>
        {/* <TaskContext.Provider value={ToDO}> */}
        <div className="main">
            <div onDragOver={(e) => dragStarted(e)} onDrop={(e) => drageCompleteTODO(e)} className="TOdo">
                <h5>Todo</h5>
                {
                    ToDO.length === 0 ? <div>Add item here</div> :
                        ToDO.map(todo => (
                            <TaskCard key={todo.id} task={todo} onTaskUpdated={props.onTaskUpdated} />
                        ))
                }
            </div>
            <div onDragOver={(e) => dragStarted(e)} onDrop={(e) => drageComplete(e)} className="Doing">
                <h5>Doing</h5>
                {
                    Doing.map(todo => (
                        <TaskCard key={todo.id} task={todo} onTaskUpdated={props.onTaskUpdated} />
                    ))
                }
            </div>
            <div onDragOver={(e) => dragStarted(e)} onDrop={(e) => drageCompleteDone(e)} className="Done">
                <h5>Done</h5>
                {
                    Done.map(todo => (
                        <TaskCard key={todo.id} task={todo} onTaskUpdated={props.onTaskUpdated} />
                    ))
                }
            </div>
        </div >
        {/* </TaskContext.Provider > */}
    </>
};

export default TaskList;
// export { TaskContext };