import { signIn } from "next-auth/react";
import React from "react";

const SignIn = () => {
  const options = { callbackUrl: "http://localhost:3000/" };
  return (
    <div className="flex flex-col items-center">
      <h1>Sign In</h1>
      <button onClick={() => signIn("google", options)}>
        Sign in with google
      </button>
    </div>
  );
};

export default SignIn;
