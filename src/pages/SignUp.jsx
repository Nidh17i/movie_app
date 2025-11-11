import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../authSlice";
import { setUser } from "../features/favMovie/favSlice"; 

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isLoggedIn } = useSelector((state) => state.MovieUser);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signupUser(formData));
    dispatch(setUser()); // refresh favorites & watchlist for new user
  };

  if (isLoggedIn) navigate("/");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-yellow-500 mb-6">Join cineHaven</h2>

        {error && (
          <div className="bg-red-500/20 text-red-400 text-sm text-center py-2 mb-4 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg bg-gray-700 text-white px-4 py-2 focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter a unique username"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg bg-gray-700 text-white px-4 py-2 focus:ring-2 focus:ring-yellow-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-lg bg-gray-700 text-white px-4 py-2 focus:ring-2 focus:ring-yellow-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 rounded-lg transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
