//Core
import { useState } from "react";
//UI
import Button from "../Button";

interface EditFormProps extends React.HTMLAttributes<HTMLFormElement> {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  handleItem: (formData: FormData) => Promise<boolean>;
  children?: React.ReactNode;
  disabled?: boolean;
}
export default function EditForm({
  children,
  setIsOpen,
  handleItem,
  disabled,
  ...props
}: EditFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsLoading(true);
    const formData = new FormData(e?.currentTarget);
    const isSuccess = await handleItem(formData);
    if (isSuccess && setIsOpen) setIsOpen(false);
    setIsLoading(false);
  };
  return (
    <form
      className="pt-4 flex flex-col gap-4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background-dark p-4 rounded max-h-main-with-gap w-[28rem] max-w-[calc(100%-.5rem)] shadow-border-orange"
      onSubmit={onSubmit}
      {...props}
    >
      {children}
      <Button
        styleMode="secondary"
        styleSize="large"
        type="submit"
        className="w-full h-10 text-center bg-accent-light text-text-light dark:text-text-dark p-2 rounded font-semibold text-sm leading-7.5 "
        disabled={isLoading || disabled}
      >
        Save
      </Button>
    </form>
  );
}
