import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import './App.css'
import { CreateTodo } from './Components/CreateTodo'
import { Todos } from './Components/Todos'
// import {db} from '../../Backend/data'

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then(async function (res) {
        if (!res.ok) {
          throw new Error("Failed to fetch todos");
        }
        const json = await res.json();
        setTodos(json);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  },[todos]);

  // useEffect is divided into two parts
  // 1st is a function(),2nd [] this in the useEffect is a Dependency array

  return (
    <div>
      <CreateTodo />
      <Todos todos={todos} onComplete={handleTodoCompletion} />
      {/* {todos.map(todo => ( 
        <Todos key={todo._id} todo={todo} />))} */}
    </div>
  )
}


// handleTodoCompletion is a function that let you mark a specific todo as completed on the basis that it fetch the id of the todo which is onClicked by the button "Mark as completed" with the help of that id of individual Todo.

const handleTodoCompletion = async (id, setTodos) => {
  try {
    const response = await axios.put(`http://localhost:3000/completed/`, { id });

    if (response.status === 200) {
      // Update the todo as completed in the state
      setTodos(marktodo => marktodo.map(todo =>
        todo._id === id ? { ...todo, completed: true } : todo
      ));
    }
  } catch (error) {
    console.error('Error marking todo as completed:', error);
  }
};
export default App
