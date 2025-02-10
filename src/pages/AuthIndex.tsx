//Core
import { useState } from "react";
import { useNavigate } from "react-router";
//UI
import Button from "../components/UI/Button";
//Hooks
import { useUser } from "../hooks/useUser";
//Utils
import { ValidationError } from "../utils/ValidationError";
//Components
import EmailForm from "../components/Auth/EmailForm";
import { TAuthSignInDto, TAuthSignUpDto } from "../types/auth.type";
import { showUserMsg } from "../utils/toastEmitter.util";

/**
 * AuthIndex component handles the authentication process for the application.
 * It allows users to either sign in or sign up, and provides a form for email-based authentication.
 * Additionally, it offers a Google login option.
 * @component
 * @returns {JSX.Element} The rendered component.
 * @example <AuthIndex />
 * @remarks This component uses the `useUser` hook for authentication actions and the `useToast` hook for displaying success or error messages.
It also uses the `useNavigate` hook from `react-router-dom` for navigation after successful authentication.
 * @function
 * @name AuthIndex
 * @property {boolean} isLoading - State to indicate if the form submission is in progress.
 * @property {boolean} isLogin - State to toggle between login and sign-up forms.
 * @property {Record<keyof TAuthSignInDto | keyof TAuthSignUpDto, string> | null | undefined} errors - State to hold validation errors.
 * @property {Function} signIn - Function to handle sign-in action.
 * @property {Function} signUp - Function to handle sign-up action.
 * @property {Function} successToast - Function to display success toast messages.
 * @property {Function} errorToast - Function to display error toast messages.
 * @property {Function} navigate - Function to navigate to different routes.
 * @returns {Promise<void>} A promise that resolves when the form submission is complete.
 * @function
 * @name handleFormSubmission
 * @async
 * @returns {Promise<void>} A promise that resolves when the form submission is complete.
 * @function
 * @name onSubmit
 * @async
 * @constant {string} headerText - The text to be displayed in the header of the form.
 * @constant {string} signupText - The text to be displayed for toggling between login and sign-up.
 * @constant {string | undefined} googleLoginUrl - The URL for Google login, fetched from environment variables.
 */
export default function AuthIndex(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [serverErrors, setServerErrors] = useState<
    | Record<keyof TAuthSignInDto | keyof TAuthSignUpDto, string>
    | null
    | undefined
  >(null);
  const { signIn, signUp } = useUser();
  const navigate = useNavigate();

  const handleFormSubmission = async (formData: FormData) => {
    try {
      setIsLoading(true);
      await (isLogin ? signIn(formData) : signUp(formData));

      const toastMessage = isLogin
        ? "Welcome back!"
        : "Account created successfully!";

      showUserMsg(toastMessage, "success");

      navigate("/");
    } catch (error) {
      if (error instanceof ValidationError) {
        setServerErrors(error?.validationErrors?.errors);
        showUserMsg(ERROR_MESSAGES.validation, "warning");
      } else {
        showUserMsg(ERROR_MESSAGES.server, "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerErrors(null);
    const formData = new FormData(e.currentTarget);
    handleFormSubmission(formData);
  };

  const headerText = isLogin ? "Login" : "Sign-Up";
  const signupText = isLogin
    ? "Don't have an account?"
    : "Already have an account?";

  const googleLoginUrl = import.meta.env.VITE_GOOGLE_LOGIN_URL;

  return (
    <section className="w-full h-full flex justify-center items-center">
      <div className="p-4 rounded-lg shadow-border w-full max-w-sm min-w-xs self-center flex flex-col gap-4">
        <header>
          <h1 className="text-2xl font-bold pb-2">{headerText}</h1>
          <p className="text-gray-400 text-sm">
            Enter your email below to {isLogin ? "login" : "sign up"}
          </p>
        </header>

        <EmailForm
          onSubmit={onSubmit}
          isLogin={isLogin}
          isLoading={isLoading}
          serverErrors={serverErrors}
        />

        <a
          className="w-full text-center shadow-border p-2 rounded font-semibold text-sm"
          href={googleLoginUrl || "#"}
          aria-disabled={isLoading || !googleLoginUrl}
        >
          Login with Google
        </a>

        <div className="flex justify-center items-center gap-1 text-sm">
          <p>{signupText}</p>
          <Button
            styleMode="none"
            styleSize="none"
            className={`underline font-semibold hover:cursor-pointer ${
              isLoading ? "opacity-50" : ""
            }`}
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

const ERROR_MESSAGES = {
  network: "Unable to connect. Please check your internet connection.",
  server: "Something went wrong on our end. Please try again later.",
  validation: "Please check your input and try again.",
};
