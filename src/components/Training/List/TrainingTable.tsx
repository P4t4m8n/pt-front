import { TTraining } from "../../../types/training.type";
import Model from "../../UI/Model";
import TrainingDetails from "../Details/TrainingDetails";
import TrainingEdit from "../Edit/TrainingEdit";


interface Props {
  trainings: TTraining[];
  setTrainings: React.Dispatch<React.SetStateAction<TTraining[] | null>>;
}
export default function TrainingTable({ trainings, setTrainings }: Props) {
  return (
    <ul className="flex flex-col gap-4">
      <li className="grid grid-cols-3 pb-2  border-b">
        <p>Training Name</p>
        <p>Description</p>
        <p>Actions</p>
      </li>
      {trainings.map((training, index) => (
        <li key={index} className="grid grid-cols-3">
          <p>{training.name}</p>
          <p>{training.description}</p>
          <div className=" flex gap-4">
            <Model
              button={{
                content: "Edit",
                props: {
                  className:
                    "btn btn-primary bg-accent-light dark:bg-accent-dark p-2 px-4 rounded border",
                },
              }}
              model={
                <TrainingEdit
                  idProps={training.id}
                  setTrainings={setTrainings}
                />
              }
            />
            <Model
              button={{
                content: "Details",
                props: {
                  className:
                    "btn btn-primary bg-accent-light dark:bg-accent-dark p-2 px-4 rounded border",
                },
              }}
              model={<TrainingDetails idProps={training.id} />}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
