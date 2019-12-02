import React, { useState } from 'react'
import './App.css'


export default function App() {

    const [ userInput, getUserInput ] = useState('')
    const [ todos, setToDos ] = useState([])


    const handleChange=e=> getUserInput(e.target.value)

    const handleSubmit=e=> {
        e.preventDefault()
        if (userInput === ''){
            alert('Please type a task!')
        } else {
            const key = Date.now()
            const completed = false
            const newTodo = {
                key: key,
                text: userInput,
                completed: completed
            }
            setToDos([...todos, newTodo])
            getUserInput('')
        }
    }

    const DisplayToDos=(props)=>props.todos.map(todo=>    
        <div 
            key={todo.key} 
            id={todo.key} 
            className={'completed-'+todo.completed}
            onClick={toggleCompletion}>
                {todo.text}
        </div>
    )

    const DeleteButton=(props)=>props.ids.map(id=> 
        <button key={id} id={id} className="btn-delete" onClick={handleDelete}></button>)


    const toggleCompletion=e=>{
        const clicked = e.target
        const values = ['true', 'false']
        const oldValue = (clicked.className.split('-'))[1]
        const newValue = values.filter(item => item !== oldValue)[0]
        document.getElementById(clicked.id).className = 'completed-'+newValue
    }

    const handleDelete=(e)=>{
        const id = e.target.id
        switch (id){
            case 'del-all':
                setToDos([])
                break
            case 'del-one':
                const popOne = todos.slice(0,-1)
                setToDos(popOne)
                break
            default:
                break
        }
    }

    const btnIds = ['del-one', 'del-all']

    return(
        <div id='container'>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='TO DO:' value={userInput} onChange={handleChange} />
                <input type='submit' value='ADD' />
            </form>
            <div id='items-wrapper'>
                <DisplayToDos todos={todos}/>
            </div>
            {todos.length > 0 ? <div><DeleteButton ids={btnIds} /></div> : null}
        </div>
    )
}