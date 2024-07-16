import './App.css'
import { CreateTodo } from './Components/CreateTodo'
import { FetchTodo } from './Components/FetchTodo'

function App() {
 
  return (
    <div>
      <CreateTodo />
      <FetchTodo/>
    </div>
  )
}

// made use of CompleteTodoUtilss for this below functionality
// handleTodoCompletion is a function that let you mark a specific todo as completed on the basis that it fetch the id of the todo which is onClicked by the button "Mark as completed" with the help of that id of individual Todo.

// const handleTodoCompletion = async (id, setTodos) => {
//   try {
//     const response = await axios.put(`http://localhost:3000/completed/`, { id });

//     if (response.status === 200) {
//       // Update the todo as completed in the state
//       setTodos(marktodo => marktodo.map(todo =>
//         todo._id === id ? { ...todo, completed: true } : todo
//       ));
//     }
//   } catch (error) {
//     console.error('Error marking todo as completed:', error);
//   }
// };
export default App
