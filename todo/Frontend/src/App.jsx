import { useState } from 'react'
import './App.css'
import { CreateTodo } from './Components/CreateTodo'
import { Todos } from './Components/Todos'
// import {db} from '../../Backend/data'

function App() {
  const [todos, setTodos]=useState([]);

  // fetch("http://localhost:3000/todos")
  //   .then(async function (res) {
  //     const json =await res.json();
  //     setTodos(json.todos);
  //   })


    return( 
      <div>
        <CreateTodo/>
        <Todos todos= {todos} />
      </div>
    )
   
  }
export default App
