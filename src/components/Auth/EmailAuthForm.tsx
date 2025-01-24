import { useState } from "react";
import Input from "../UI/Form/Input";
import Button from "../UI/Button";
import { useUser } from "../../hooks/useUser";

export default function EmailAuthForm() {
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

  let header = "";
  let inputs = [];

  if (isLogin) {
    header = "Login";
    inputs = LOGIN_INPUTS;
  } else {
    header = "Sign-Up";
    inputs = SIGN_UP_INPUTS;
  }

  return (
    <div>
      <header><h1>{header}</h1></header>
      <form onSubmit={onSubmit}>
        {inputs.map((input) => (
          <Input key={input.name} {...input} />
        ))}
        <div className="grid gap-2">
          <div className="grid grid-cols-2 gap-2">
            <Button
              styleMode="tertiary"
              styleSize="medium"
              type="reset"
              disabled={isLoading}
            >
              Clear
            </Button>
            <Button
              styleMode="primary"
              styleSize="medium"
              type="submit"
              disabled={isLoading}
            >
              {isLogin ? "Login" : "Sign-Up"}
            </Button>
          </div>
          <Button
            styleMode="secondary"
            styleSize="medium"
            type="button"
            disabled={isLoading}
            onClick={() => setIsLogin((prev) => !prev)}
          >
            <span className="underline">
              {isLogin ? "Change to Sign-Up" : "Change to Sign-In"}
            </span>
          </Button>
        </div>
      </form>
    </div>
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
