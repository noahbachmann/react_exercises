import React from 'react';

function Todolist(){

    const [inputValue, setInputValue] = React.useState('')
    const [todos, setTodos] = React.useState([])

    function handleCheck(id){
        setTodos(oldValue =>{
            var newTodos = oldValue.map(todo =>
                todo.id === id? {...todo, checked: !todo.checked} : todo
            )
            return newTodos
        })
    }

    function handleDelete(id){
        setTodos(oldValue => oldValue.filter(todo => todo.id !== id))
    }

    function handleSubmit(event){
        event.preventDefault()
        if (inputValue.trim() !== ''){
            setTodos(oldValue => [...oldValue, {id: Date.now(), info: inputValue, checked: false}])
        }
        setInputValue('');
    }

    const todoarray = todos.map(todo =>
        <div className="todo">
            <p>{todo.info}</p>
            <button onClick={() =>handleDelete(todo.id)}>Delete</button>
            <button onClick={() =>handleCheck(todo.id)}>{todo.checked? "💚":"🖤"}</button>
        </div>
    )

    return(
        <div>
            <div>
                {todoarray}
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="todoinput">New Task: </label>
                <input id="todoinput" type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
export default Todolist;