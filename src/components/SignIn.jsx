import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/books");
      toast.success("Logged In Successfully");
    } catch (error) {
      console.error("Error signing in:", error.message);
      toast.error(error.code.split("/")[1].split("-").join(" "));
    }
  };

  return (
    <div className="flex items-center justify-center bg-background py-4">
      <div className="w-full max-w-sm bg-background rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="text-copy">
          <fieldset className="border-4 border-dotted border-primary p-6">
            <legend className="px-2 italic text-primary text-lg mb-4">
              Welcome back!
            </legend>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-1 after:content-['*'] after:text-error-content"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-[#000] w-full p-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary-light"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-1 after:content-['*'] after:text-error-content"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-[#000] w-full p-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary-light"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-content p-3 rounded font-semibold hover:bg-primary-dark transition duration-300"
            >
              Sign In
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
