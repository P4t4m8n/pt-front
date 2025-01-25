import { TTraining } from "../../types/training.type";

interface Props {
  training: TTraining;
}
export default function TrainingPreview({ training }: Props) {
  const { name, description,id } = training;
  return (
    <li>
      <h3>{name}</h3>
      <p>{description}</p>
    </li>
  );
}
