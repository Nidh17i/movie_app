import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "./pages/Login"
import { SignUp } from "./pages/SignUp"
import { Home } from "./pages/Home"
import { Details } from "./pages/Details"
import Example from "./components/Navbar"
import './App.css'
import { ProtectedRoute } from "./components/protectedRoute"


function App() {


  return (
     <div>
     
     <BrowserRouter>
     <Example/>
 
   {/* <Navbar/>  */}
   <Routes>

    <Route element={<ProtectedRoute/>}>
    <Route path='/' element={<Home/>}/>
    <Route path='/details' element={< Details/>}/>


    </Route>
    
    <Route path='/login' element={<Login/>}/>
    <Route path="/signup" element={<SignUp/>}/>
    
   </Routes>
   </BrowserRouter>  
    
      </div>
      )
      }
export default App
