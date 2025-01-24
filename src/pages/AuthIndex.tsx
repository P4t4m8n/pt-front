import { useState } from "react";
import Button from "../components/UI/Button";
import { useUser } from "../hooks/useUser";
import Input from "../components/UI/Form/Input";
import Label from "../components/UI/Form/Label";

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
  let inputs = [];
  let signupText = "";
  if (isLogin) {
    headerText = "Login";
    inputs = LOGIN_INPUTS;
    signupText = "Don't have an account?";
  } else {
    headerText = "Sign-Up";
    inputs = SIGN_UP_INPUTS;
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
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {inputs.map((input) => (
            <Input key={input.name} {...input} id={input.name}>
              <Label
                className="pb-2 block font-semibold text-sm"
                htmlFor={input.name}
              >
                {input.name.charAt(0).toLocaleUpperCase() + input.name.slice(1)}
              </Label>
            </Input>
          ))}

          <Button
            styleMode="none"
            styleSize="none"
            className="w-full text-center bg-accent-light text-text-dark dark:text-text-light p-2 rounded font-semibold text-sm "
            type="submit"
            disabled={isLoading}
          >
            {isLogin ? "Login" : "Sign-Up"}
          </Button>
        </form>
        <a
          className="w-full text-center shadow-border p-2 rounded font-semibold text-sm "
          href="http://localhost:3030/api/auth/google"
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

const LOGIN_INPUTS = [
  {
    type: "email",
    placeholder: "Email",
    name: "email",
    required: true,
    pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", // Normal email format
    title: "Please enter a valid email address.",
  },
  {
    type: "password",
    placeholder: "Password",
    name: "password",

    autoComplete: "current-password",
    pattern: "^(?=.*[A-Z])(?=.*\\d).{6,}$", // At least 6 chars, 1 uppercase, 1 number
    required: true,
    title:
      "Password must be at least 6 characters long, contain an uppercase letter and a number.",
  },
];

const SIGN_UP_INPUTS = [
  ...LOGIN_INPUTS,
  {
    type: "text",
    placeholder: "First name",
    name: "firstName",
    required: true,
    title: "First name must contain at least 2 letters.",
    pattern: "^[a-zA-Z]{2,}$", // Only letters, at least 2 characters
  },
  {
    type: "text",
    placeholder: "Last name",
    name: "lastName",
    autoComplete: "family-name",
    required: true,
    title: "Last name must contain at least 2 letters.",
    pattern: "^[a-zA-Z]{2,}$", // Only letters, at least 2 characters
  },
];
