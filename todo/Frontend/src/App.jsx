import { useState } from 'react'
import { useEffect } from 'react'
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

const handleTodoCompletion = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/completed/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      // Update the todo as completed in the state
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo._id === id ? { ...todo, completed: true } : todo
        )
      );
    }
  } catch (error) {
    console.error('Error marking todo as completed:', error);
  }
};
export default App
