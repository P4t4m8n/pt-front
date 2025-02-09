//Core
import { useState } from "react";
//UI
import Button from "../Button";

interface Props {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  handleItem: (formData: FormData) => Promise<void>;
  children?: React.ReactNode;
  disabled?: boolean;
}
export default function EditForm({
  children,
  setIsOpen,
  handleItem,
  disabled,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setIsLoading(true);
      const formData = new FormData(e?.currentTarget);
      await handleItem(formData);
      if (setIsOpen) setIsOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      className="pt-4 flex flex-col gap-4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black p-4 rounded h-main-with-gap w-96"
      onSubmit={onSubmit}
    >
      {children}
      <Button
        styleMode="secondary"
        styleSize="large"
        type="submit"
        className=""
        disabled={isLoading || disabled}
      >
        Save
      </Button>
    </form>
  );
}
