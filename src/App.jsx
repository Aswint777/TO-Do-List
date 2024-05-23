import { useEffect, useState } from "react";

function Home() {
  const [toDoList, setToDoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const [error, setError] = useState(false);
  const [errormsg, setErrormsg] = useState();

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  // task adding
  const addTask = () => {
    console.log(newTask, "New Task");
    if (newTask.trim() == "") {
      setError(true);
      setErrormsg("give proper Task Name");
      return;
    }
    const addNewOne = {
      id: new Date().toString(),
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
    // confirm();
    setToDoList(toDoList.filter((task) => task.id !== id));
  };

  const finishTask = (id) => {
    setToDoList(
      toDoList.map((addNewOne) => {
        if (addNewOne.id === id) {
          console.log('finish');
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
    // Check if the updated task is an empty string after trimming
    if (updatedTask.trim() === "") {
        setToDoList(toDoList.filter((task) => task.id !== id));
        return;
    }

    // Update the to-do list with the edited task
    setToDoList(
        toDoList.map((task) => {
            if (task.id === id) {
                return { ...task, existingTask: updatedTask };
            } else {
                return task;
            }
        })
    );

    // Reset the edit state
    setEditId(null);
    setEditedTask("");
};

  useEffect(() => {
    errormsg &&
      setTimeout(() => {
        setErrormsg("");
      }, 3000);
  }, [errormsg]);

  useEffect(() => {
    console.log("hai");
  }),
    [addTask];

  return (
    <>

      <div className="  h-screen flex flex-col justify-center items-center ">
        <div className="w-[700px] h-48 bg-blue-100 border-4 border-blue-700 flex items-center justify-center text-2xl text-blue-700 m-8 rounded-md">
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
        </div>
        {error && <p className="text-red-600">{errormsg} </p>}
        <div className=" flex flex-col items-center justify-center">
          {toDoList.map((value) => {
            return (
              <div key={value.id}  className="w-[700px] h-auto border-2 m-1 p-4 border-blue-500">
                {editId === value.id ? (
                  <>
                    <input
                      className="border-2 w-72 h-10 rounded-md border-green-500 m-1"
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
                    <button
                      className="border border-green-500 rounded-md py-2 px-3 m-3"
                      onClick={() => finishTask(value.id)}
                    >
                      Finished
                    </button>
                    <button
                      className="border border-red-500 rounded-md py-2 px-3 m-3"
                      onClick={() => deleteData(value.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="border border-blue-500 rounded-md py-2 px-3"
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

export default Home;
