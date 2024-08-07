import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";

function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="signup" element={<Signup/>}/>
        </Routes>
    </div>
  );
}

export default App;
