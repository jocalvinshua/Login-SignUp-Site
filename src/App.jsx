import { useState } from "react";
import './App.css';
import {
  User,
  Mail,
  Lock,
  LogIn,
  UserPlus
} from "lucide-react";

export default function App() {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (state === "register") {
      const emailExists = users.find(user => user.email === email);
      if (emailExists) {
        setMessage("Email already registered!");
        return;
      }
      const newUser = { name, email, password };
      localStorage.setItem("users", JSON.stringify([...users, newUser]));
      setMessage("Registration successful! You can now login.");
      setState("login");
      resetForm();
    } else {
      const user = users.find(user => user.email === email && user.password === password);
      if (user) {
        setMessage(`Welcome back, ${user.name}!`);
        resetForm();
      } else {
        setMessage("Invalid email or password!");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 p-8 py-10 w-[90%] max-w-md rounded-xl shadow-2xl border border-gray-200 bg-white"
      >
        <h2 className="text-3xl font-semibold text-center text-indigo-600 flex items-center justify-center gap-2">
          {state === "login" ? <LogIn size={28} /> : <UserPlus size={28} />}
          {state === "login" ? "Login" : "Sign Up"}
        </h2>

        {message && (
          <p className={`text-sm w-full p-3 rounded-md font-medium ${message.includes("success") || message.includes("Welcome") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {message}
          </p>
        )}

        {state === "register" && (
          <div className="w-full flex items-center gap-2 border border-gray-200 rounded p-2">
            <User size={18} />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Username"
              className="w-full outline-none"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full flex items-center gap-2 border border-gray-200 rounded p-2">
          <Mail size={18} />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email address"
            className="w-full outline-none"
            type="email"
            required
          />
        </div>

        <div className="w-full flex items-center gap-2 border border-gray-200 rounded p-2">
          <Lock size={18} />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            className="w-full outline-none"
            type="password"
            required
          />
        </div>

        <p className="text-sm text-center">
          {state === "register" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => {
                  setState("login");
                  setMessage("");
                }}
                className="text-indigo-600 hover:underline cursor-pointer"
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <span
                onClick={() => {
                  setState("register");
                  setMessage("");
                }}
                className="text-indigo-600 hover:underline cursor-pointer"
              >
                Register here
              </span>
            </>
          )}
        </p>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 transition-all text-white text-lg font-medium w-full py-2 rounded-md"
        >
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
}
