import { useState } from "react";

import Button from "../UI/Button";

interface Props<T extends { id?: string }> {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setItem: React.Dispatch<React.SetStateAction<T[]>>;
  save: (formData: FormData) => Promise<T>;
  children?: React.ReactNode;
}
//TODO rename for a better name
export default function TraineeTableEdit<T extends { id?: string }>({
  children,
  setIsOpen,
  setItem,
  save,
}: Props<T>) {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setIsLoading(true);
      const formData = new FormData(e?.currentTarget);
      const _item = await save(formData);
      if (!_item?.id) {
        //TODO: handle error
        console.error(_item);
        return;
      }
      setItem((prev) => {
        const idx = prev.findIndex((p) => p?.id === _item?.id);
        if (idx > -1) {
          prev[idx] = _item;
          return [...prev];
        }
        return [...prev, _item];
      });
      if (setIsOpen) setIsOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      className="pt-4 flex flex-col gap-4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black p-4 rounded"
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
