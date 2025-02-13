//Types
import { TTrainingDto } from "../../../types/training.type";
//UI
import EditForm from "../../UI/Form/EditForm";
import Model from "../../UI/Model";
import TrainingEditInputs from "./TrainingEditInputs";
//Components

interface ITrainingEditModelProps {
  handleItem: (formData: FormData) => Promise<boolean>;
  serverErrors?: Record<keyof TTrainingDto, string> | null;
  
}
export default function TrainingEditModel({
  handleItem,
  serverErrors,
}: ITrainingEditModelProps) {
  return (
    <Model
      button={{
        content: "Create Training",
        props: {
          className:
            "btn btn-primary p-2 shadow-border rounded bg-secondary-light dark:bg-primary-dark",
        },
      }}
      model={
        <EditForm handleItem={handleItem}>
          <TrainingEditInputs serverErrors={serverErrors} />
        </EditForm>
      }
    />
  );
}
