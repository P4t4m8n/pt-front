import Button from "../UI/Button";
import Input from "../UI/Form/Input";
import Label from "../UI/Form/Label";

interface Props {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLogin: boolean;
  isLoading: boolean;
}
export default function EmailForm({ onSubmit, isLogin, isLoading }: Props) {
  const inputs = isLogin ? LOGIN_INPUTS : SIGN_UP_INPUTS;
  return (
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
