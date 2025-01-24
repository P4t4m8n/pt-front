import { useState } from "react";
import Button from "../components/UI/Button";
import { useUser } from "../hooks/useUser";

import EmailForm from "../components/Auth/EmailForm";

export default function AuthIndex() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const { signIn, signUp } = useUser();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      await (isLogin ? signIn(formData) : signUp(formData));
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };
  let headerText = "";
  let signupText = "";
  if (isLogin) {
    headerText = "Login";
    signupText = "Don't have an account?";
  } else {
    headerText = "Sign-Up";
    signupText = "Already have an account?";
  }

  return (
    <section className="w-full h-full flex justify-center items-center">
      <div className="p-4 rounded-lg shadow-border w-full max-w-sm min-w-xs self-center flex flex-col gap-4">
        <header>
          <h1 className="text-2xl font-bold pb-2">{headerText}</h1>
          <p className="text-gray-400 text-sm">
            Enter your email below to login
          </p>
        </header>
        <EmailForm
          onSubmit={onSubmit}
          isLogin={isLogin}
          isLoading={isLoading}
        />
        <a
          className="w-full text-center shadow-border p-2 rounded font-semibold text-sm "
          href="http://localhost:3030/api/auth/google"
          aria-disabled={isLoading}
        >
          Login with Google
        </a>

        <div className="flex justify-center items-center gap-1 text-sm">
          <p>{signupText}</p>
          <Button
            styleMode="none"
            styleSize="none"
            className="underline font-semibold hover:cursor-pointer"
            type="button"
            disabled={isLoading}
            onClick={() => setIsLogin((prev) => !prev)}
          >
            {isLogin ? "Sign-Up" : "Sign-In"}
          </Button>
        </div>
      </div>
    </section>
  );
}
