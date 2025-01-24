import { TTrainee } from "../../../types/trainee.type";
import TraineePreview from "./TraineePreview";

interface Props {
  trainees: TTrainee[];
}
export default function TraineesList({ trainees }: Props) {
  return (
    <ul className="flex flex-col gap-4 w-full">
      <li className="trainee-list-item pb-2 mb-2 border-b">
        <h3></h3>
        <h3>First Name</h3>
        <h3>Last Name</h3>
        <h3>Email</h3>
        <h3>Phone</h3>
        <h3>Actions</h3>
      </li>
      {trainees.map((trainee) => (
        <TraineePreview key={trainee.id} trainee={trainee} />
      ))}
    </ul>
  );
}
