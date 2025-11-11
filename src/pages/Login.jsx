import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../authSlice";
import { setUser } from "../features/favMovie/favSlice"; 

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.MovieUser);

  const [formData, setFormData] = useState({ name: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
    dispatch(setUser()); // refresh favorites & watchlist for this user
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-yellow-500 mb-6">Login</h2>

        {error && (
          <div className="bg-red-500/20 text-red-400 text-sm text-center py-2 mb-4 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter username"
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-yellow-500"
          />
          <button
            type="submit"
            className="w-full bg-yellow-500 text-black font-semibold py-2 rounded-lg hover:bg-yellow-400"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-yellow-500 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
