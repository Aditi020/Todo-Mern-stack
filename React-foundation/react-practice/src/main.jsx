import React from 'react' //React is to check diff in states
import ReactDOM from 'react-dom/client' //react dom is to add delete the dom objects to the application or (use react native from react-native) native react application
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
