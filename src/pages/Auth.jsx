import React, { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(true); // Toggle between Sign In and Sign Up

  return (
    <div className="bg-background flex items-center justify-center">
      <div className="w-full max-w-md p-6">
        {isSignUp ? <SignUp /> : <SignIn />}
        <div className="mt-2 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-primary hover:underline"
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "Need an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
