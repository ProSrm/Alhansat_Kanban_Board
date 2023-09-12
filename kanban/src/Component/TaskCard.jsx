import React from "react";
import { AiOutlineEdit } from 'react-icons/ai';
import { RiDeleteBin5Line } from 'react-icons/ri';
import axios from "axios";
import { useState, } from "react";
import "./css/TaskCard.css";

const TaskCard = (props) => {
    const { task } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({
        Task: task.Task,
        Desc: task.Desc,
    });

    const dragStarting = (e, _id) => {
        e.dataTransfer.setData('taskid', _id)
        console.log("drag starting ");
    }

    const handleDelete = (id) => {
        axios.delete('https://alhansat-kanban-board-api.vercel.app/delete/' + id)
            .then(result => {
                console.log('Task deleted');
            })
            .catch(err => console.log(err));
    }

    //update on update click icon 
    const handleSaveClick = () => {
        axios.put(`https://alhansat-kanban-board-api.vercel.app/update/${task._id}`, editedTask)
            .then(() => {
                console.log('Task updated');
                setIsEditing(false); // Exit edit mode
                props.onTaskUpdated(); // Trigger task list refresh
            })
            .catch(err => console.log(err));
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTask({
            ...editedTask,
            [name]: value,
        });
    }
    const handleEditClick = () => {
        setIsEditing(true);
    }


    return <>
        <div draggable onDragStart={(e) => dragStarting(e, task._id)} className="card">
            {isEditing ? (
                // Render edit form when isEditing is true
                <div className="form">
                    <input
                        type="text"
                        name="Task"
                        value={editedTask.Task}
                        onChange={handleInputChange}
                        placeholder="Edit Task Title"
                    />
                    <input
                        type="text"
                        name="Desc"
                        value={editedTask.Desc}
                        onChange={handleInputChange}
                        placeholder="Edit Task Description"
                    />
                    <button onClick={handleSaveClick}>Save Changes</button>
                </div>
            ) : (
                // Render task details when isEditing is false
                <>
                    <h6>{task.Task}</h6>
                    <h6>{task.Desc}</h6>
                </>
            )}

            <div className="icons">
                <AiOutlineEdit onClick={handleEditClick} />&nbsp;
                <RiDeleteBin5Line onClick={() => handleDelete(task._id)} />
            </div>
        </div>
    </>
};

export default TaskCard;
