import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [toDoList, setToDoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const [error,setError] = useState(false)
  const [errormsg,setErrormsg] = useState("")

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  // task adding
  const addTask = () => {
    console.log(newTask,'New Task')
    if(newTask.trim() == ""){
      setError(true)
      setErrormsg("give proper Task Name")
      return 
    }
    const addNewOne = {
      id:new Date().toString(),
      existingTask: newTask,
      finish: false,
    };
    const newList = [addNewOne, ...toDoList];

    setToDoList(newList);
    setNewTask(" ");
  };

  // useEffect(()=>{
  //   console.log("hai")
  // },[handleChange])

  // delete task
  const deleteData = (id) => {
    setToDoList(toDoList.filter((task) => task.id !== id));
  };

  const finishTask = (id) => {
    setToDoList(
      toDoList.map((addNewOne) => {
        if (addNewOne.id === id) {
          return { ...addNewOne, finish: true };
        } else {
          return addNewOne;
        }
      })
    );
  };

  // const editData = ()=>{
  //   setToDoList(toDoList.map((task)=>{

  //   }))
  // }

  const editTask = (id, task) => {
    setEditId(id);
    setEditedTask(task);
  };

  const saveEditedTask = (id, updatedTask) => {
    setToDoList(
      toDoList.map((task) => {
        if (task.id === id) {
          return { ...task, existingTask: updatedTask };
        } else {
          return task;
        }
      })
    );
    setEditId(null);
    setEditedTask("");
  };
  useEffect(() => {
    errormsg.length>0 && setTimeout(() => {
      setErrormsg('');
    },3000)
  },[errormsg])

  return (
    <>
      <div className="  h-screen flex flex-col justify-center items-center ">
        <div className="app flex justify-center gap-x-4 items-center w-full">
          <input
            onChange={handleChange}
            type="text"
            value={newTask}
            className="border border-gray-300 rounded-md p-2 mb-4"
          />
          <button
            className="bg-blue-500 text-white mb-4 py-2 px-4 rounded"
            onClick={addTask}
          >
            Add Task
          </button>
          
        </div>
          { error && 
            <h1 className="text-red-600">{errormsg} </h1>
           }
        <div className=" flex flex-col items-center justify-center">
          {toDoList
            .map((value) => {
              return (
                <div key={value.id}>
                  {editId === value.id ? (
                    <>
                      <input
                        className="border-2"
                        type="text"
                        value={editedTask}
                        onChange={(e) => setEditedTask(e.target.value)}
                      />
                      <button
                        onClick={() => saveEditedTask(value.id, editedTask)}
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <h1
                        className={
                          value.finish ? "completed-text" : "incomplete-text"
                        }
                      >
                        {value.existingTask}
                      </h1>
                      <button className="border border-green-500 rounded-md py-2 px-3 m-3" onClick={() => finishTask(value.id)}>
                        Finished
                      </button>
                      <button className="border border-red-500 rounded-md py-2 px-3 m-3" onClick={() => deleteData(value.id)}>
                        Delete
                      </button>
                      <button className="border border-blue-500 rounded-md py-2 px-3"
                        onClick={() => editTask(value.id, value.existingTask)}
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
export default App;
