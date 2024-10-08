import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import VerificationEmail from "./pages/VerificationEmail";
import Profile from "./pages/Profile";
import Page404 from "./pages/Page404";
import Contact from "./pages/Contact";
import Classroom from "./pages/Classroom";
import Room from "./pages/room";
import AdminLogin from "./pages/AdminLogin";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import RegistrationInfo from "./pages/RegistrationInfo";
import SoonPage from "./pages/SoonPage";
function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="signup" element={<Signup/>}/>
          <Route path="signin" element={<Signin/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="register/info" element={<RegistrationInfo/>}/>
          <Route path="verification/:email" element={<VerificationEmail/>}/>
          <Route path="profile" element={<Profile/>}/>
          <Route path="contact" element={<Contact/>}/>
          <Route path="room" element={<Classroom/>}/>
          <Route path="classroom/:code" element={<Room/>}/>
          <Route path="admin">
          <Route path="login" element={ <AdminLogin/>} />
          <Route path="dashboard" element={ <AdminDashboard/>} />
          </Route>
          <Route path="soon" element={ <SoonPage/>} />
          <Route path="*" element={<Page404 />} />
        </Routes>
    </div>
  );
}

export default App;
