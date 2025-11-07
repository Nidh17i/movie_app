import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
    const handleLogin=(e)=>{
      e.preventDefault();

      const localuser=JSON.parse(localStorage.getItem('cinehavenUser'))

      if(!localuser){
        alert('no user found ! please sign up first');
        return;
    }

    if(name === localuser.name && password === localuser.password){
      alert(`welcome back, ${localuser.name}`)
      localStorage.setItem('isLoggedIn','true');
      navigate('/')
    }
    else{
      alert('invalid userName or password');
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://i.pinimg.com/1200x/1c/33/05/1c3305662f8ff82f1f099213dffc678d.jpg"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form  method="POST" className="space-y-6"
            onSubmit={handleLogin}>
           <div>
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-white-900"
              >
                UserName
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="mobile"
                  required
                  placeholder="Enter userName"
               className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div></div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-white-900"
                >
                  Password
                </label>
                
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          {/* <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Start a 14 day free trial
            </a>
          </p> */}
        </div>
      </div>
    </>
  );
};
