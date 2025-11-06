import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "./pages/Login"
import { SignUp } from "./pages/SignUp"
import { Home } from "./pages/Home"
import { Details } from "./pages/Details"
import Example from "./components/Navbar"


function App() {


  return (
     <div>
     
     <BrowserRouter>
     <Example/>
 
   {/* <Navbar/>  */}
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path="/signup" element={<SignUp/>}/>
    <Route path='/details' element={< Details/>}/>

   </Routes>
   </BrowserRouter>  
    
      </div>
      )
      }
export default App
