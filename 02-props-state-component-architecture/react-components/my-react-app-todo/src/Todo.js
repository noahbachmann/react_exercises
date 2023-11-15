import './App.css';
import React from 'react';

function Todo({ task, checked, onDelete, onChange }){
    return(
        <div className="todo">
            <form className='todo-form'>
                <input type="checkbox" checked={checked} id="todoItem" name="todoItem" onChange={onChange}/>
                <p id="todoText" className='todo-info'>{task}</p>
                <button onClick={onDelete} value="Delete"/>
            </form>
        </div>
    )
}

export default Todo;