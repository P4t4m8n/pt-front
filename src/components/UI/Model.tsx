import { useRef } from "react";
import { useModel } from "../../hooks/useModel";
import Button from "../UI/Button";
import ModelOverlay from "../UI/ModelOverlay";

interface Props {
  button: {
    props: React.ButtonHTMLAttributes<HTMLButtonElement>;
    content: React.ReactNode;
  };
  model: React.ReactNode;
}

export default function Model({ button, model }: Props) {
  const modelRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useModel(modelRef);
  console.log("isOpen:", isOpen);
  return (
    <>
      <Button
        {...button.props}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        {button.content}
      </Button>
      {isOpen && (
        <ModelOverlay>
          <div className="h-fit w-fit" ref={modelRef}>
            {model}
          </div>
        </ModelOverlay>
      )}
    </>
  );
}
