import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages & components
import Home from './pages/home';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <div className="pages"></div>
      <Routes>
        <Route 
          path="/home" 
          element={<Home />}
        />
          
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
