import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <CustomButton count={count} setCount={setCount}>    </CustomButton>
      {/*defining a function such as CustomButton => we can create multiple components with different state variables.   */}
      <CustomButton count={count + 1} setCount={setCount}>  </CustomButton>
      <CustomButton count={count - 1} setCount={setCount}>  </CustomButton>
      <CustomButton count={count * 100} setCount={setCount}></CustomButton>
    </div>
  )
}
// taking props as an input . props take two input count and SetCount when mentioned above. 
function CustomButton(props) {
  function onClickHandler() {
    props.setCount(props.count + 1);
  }
  return (
    <button onClick={onClickHandler} >
      Counter {props.count}
    </button>
  )
}

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//       <div>

// --------------------!
// This is the simplest way to write the counter function component. or to make 
// it more simple can write as below 


// function onClickHandler() {
//   props.setCount(props.count + 1);
// }
// --------------------!

//         <button onClick={() => setCount((count) => count + 1)}>  
//           count is {count}
//         </button>

//     </div>
//   )
// }

export default App
