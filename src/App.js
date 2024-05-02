import React,{useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import NavBar from './Components/Navbar';
import "./style.css"
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Home from './Components/Home'
import { Authentication } from './utils/Authentication';
import QuestionUser  from "./Components/QuestionUser";
import Alert from "./Components/Alert";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert =(message,type)=>{
    setAlert({
     msg:message,
     type:type
    })
    setTimeout(()=>{
     setAlert(null)
    },2000)
 }
  return (
    <div className="App">
     <NavBar showAlert={showAlert}/>
     <Alert alert={alert}/>
     <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route exact path="/Login" element={<Login showAlert={showAlert}/>}></Route>
            <Route exact path="/SignUp" element={<SignUp showAlert={showAlert}/>}></Route>
            <Route path="/questions" element={Authentication(<QuestionUser/>)} />
          </Routes>
    </div>
  );
}

export default App;
