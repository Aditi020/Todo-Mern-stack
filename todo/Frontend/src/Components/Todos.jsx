
export function Todos({ todos }) {

    return <div>
        {todos.map(function (todo) {
            return <div>
                <h1>{todo.title}</h1>
                <h2>{todo.description}</h2>
                <button>
                    {todo.completed == true ? "Completed" : "Mark as Complete"}
                    </button>
            </div>
        })}
    </div>
}
//map function above is same just instead of calling two functions for map and then render , a short way is bring used
// return todos.map(renderTodo);
// }

// function renderTodo(todo) {
//  return(<div>
//       <h1>{todo.title}</h1>
// </div>
// )


// todos = {
//     [{
//         title: "Go to gym",
//         description: "Go to gym from 7-9",
//         completed: false
//     }, {
//         title: "Study DSA",
//         description: "Study DSA form 9-100",
//         completed: true
//     }, {
//         title: "Study DSA",
//         description: "Study DSA form 9-100",
//         completed: true
//     }]} />