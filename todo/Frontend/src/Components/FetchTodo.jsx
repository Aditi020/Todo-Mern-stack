import { useState } from 'react'
import { useEffect } from 'react'
import { Todos } from './Todos'
import { handleTodoCompletion } from './CompleteTodoUtils'
// import axios from 'axios';


export function FetchTodo() {
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

    return(
        <Todos todos={todos} onComplete={handleTodoCompletion} />
    )
}