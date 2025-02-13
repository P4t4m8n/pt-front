//Types
import { TProgramDto } from "../../../types/program.type";
//UI
import EditForm from "../../UI/Form/EditForm";
import Model from "../../UI/Model";
//Components
import ProgramEditInputs from "./ProgramEditInputs";

interface ProgramEditModelProps {
  handleItem: (formData: FormData) => Promise<boolean>;
  serverErrors?: Record<keyof TProgramDto, string> | null;
}
export default function ProgramEditModel({
  handleItem,
  serverErrors,
}: ProgramEditModelProps) {
  return (
    <Model
      button={{
        content: "New",
        props: {
          className:
            "btn btn-primary p-2 shadow-border rounded bg-secondary-light dark:bg-primary-dark h-fit w-12",
        },
      }}
      model={
        <EditForm handleItem={handleItem}>
          <ProgramEditInputs program={{}} serverErrors={serverErrors} />
        </EditForm>
      }
    />
  );
}
