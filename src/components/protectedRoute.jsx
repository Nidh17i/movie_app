import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRoute=()=>{
    const IsLoggedIn=localStorage.getItem('isLoggedIn');
   const navigate=useNavigate();
    if(!IsLoggedIn){
      return  navigate('/login')

    }
    return <Outlet/>
}