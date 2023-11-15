import React from 'react';
import './App.css';
import Todo from './Todo';


function TodoList() {

    const [tasks, setTasks] = React.useState(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'))
        return storedTasks || []
      })

    const [taskInput, setTaskInput] = React.useState('')

  // Save tasks to local storage whenever tasks change
  React.useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks]);


    function handleSubmit(event) {
        event.preventDefault()

        // Check if the taskInput is not empty
        if (taskInput.trim() !== '') {
            // Update the tasks state with the new task
            setTasks([...tasks,  { id: Date.now(), text: taskInput, checked: false }])

            // Clear the taskInput
            setTaskInput('')
        }
    }

    function handleChange(id){
        const updatedTasks = tasks.map(task => 
            task.id === id ? {...task, checked: !task.checked} : task
            )
        setTasks(updatedTasks)  
    }

    function handleDelete(id){
        const updatedTasks = tasks.filter(task => task.id !== id)
        setTasks(updatedTasks)
    }

    return (
        <div className="main-div">
            <div className="tasks">
                <h3>Tasks:</h3>
                <ul className="list">
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <Todo task={task.text} checked={task.checked} onDelete={() => handleDelete(task.id)} onChange={() => handleChange(task.id)}/>                            
                        </li>                        
                    ))}
                </ul>
            </div>
            <div className="new-task">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="taskinput">New Task:</label>
                    <input type="text" id="taskinput" value={taskInput} onChange={(e) => setTaskInput(e.target.value)} />
                    <button type="submit">submit</button>
                </form>
            </div>
        </div>
    )
}

export default TodoList;