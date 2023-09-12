import { useState } from 'react';
import './App.css';
import TaskList from './Component/TaskList';
import axios from 'axios'

function App() {
  //storing values 
  const [Task, setTasks] = useState();
  const [Description, setDescription] = useState();
  const [refreshTaskList, setRefreshTaskList] = useState("TOdo");

  // Function to handle task updates
  const handleTaskUpdated = () => {
    setRefreshTaskList(!refreshTaskList);
  }
  const addTask = (e) => {
    if (!Task && !Description)
      alert("please Enter Task and Description first ")
    else {
      e.preventDefault();
      axios.post("http://localhost:3001/addTask", { Task: Task, Desc: Description, Status: "TOdo" })
        .then(result => {
          console.log(result);
          setRefreshTaskList(!refreshTaskList)
        })
        .catch(err => console.log(err));

      setTasks("");
      setDescription("");
      console.log("task added");
    }

    //

  }
  return (
    <div className="App">
      <div className="App-header">
        <h4>Add your Tasks here</h4>
        <input type="text" placeholder='Enter your Title here' onChange={(e) => setTasks(e.target.value)} required />
        <input type="text" placeholder='Enter your Description here' onChange={(e) => setDescription(e.target.value)} required />
        <button onClick={addTask}>Add task </button>
      </div>
      <TaskList refreshTaskList={refreshTaskList} onTaskUpdated={handleTaskUpdated} />
    </div>
  );
}

export default App;
