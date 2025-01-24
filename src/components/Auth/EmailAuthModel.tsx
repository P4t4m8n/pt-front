import { useRef } from "react";
import { useModel } from "../../hooks/useModel";
import Button from "../UI/Button";

export default function EmailAuthModel() {
  const modelRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useModel(modelRef);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="p-2 w-20 border rounded-sm flex items-center justify-center"
      >
        Email
      </Button>
      {isOpen && <div ref={modelRef}></div>}
    </>
  );
}
