import RouteConfig from './Route'; // Importing RouteConfig
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import "./App.css"
function App() {
  return (
    <div className='App'>
      <Navbar />  
      <RouteConfig className="main"/>
      <Footer />  
    </div>
  );
}

export default App;
