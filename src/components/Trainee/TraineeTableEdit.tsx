//Core
import { useState } from "react";
//UI
import Button from "../UI/Button";

interface Props {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  handleItem: (formData: FormData) => Promise<void>;
  children?: React.ReactNode;
}
//TODO rename for a better name
export default function TraineeTableEdit({
  children,
  setIsOpen,
  handleItem,
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
        disabled={isLoading}
      >
        Save
      </Button>
    </form>
  );
}
