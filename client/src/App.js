import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import VerificationEmail from "./pages/VerificationEmail";
import Profile from "./pages/Profile";
import Page404 from "./pages/Page404";
import Contact from "./pages/Contact";
function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="signup" element={<Signup/>}/>
          <Route path="signin" element={<Signin/>}/>
          <Route path="verification/:email" element={<VerificationEmail/>}/>
          <Route path="profile" element={<Profile/>}/>
          <Route path="*" element={<Page404/>}/>
          <Route path="contact" element={<Contact/>}/>
        </Routes>
    </div>
  );
}

export default App;
