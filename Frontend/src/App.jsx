import RouteConfig from './Route'; // Importing RouteConfig
import Navbar from './Components/Navbar/Navbar';
// import Footer from './Components/Footer/Footer'; // Importing Footer
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <RouteConfig />
      </main>
    </div>
  );
}

export default App;
