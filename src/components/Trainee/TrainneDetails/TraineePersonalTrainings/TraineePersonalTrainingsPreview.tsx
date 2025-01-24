import { TPersonalTraining } from "../../../../types/personal-training.type";

interface Props {
  personalTraining: TPersonalTraining;
}
export default function TraineePersonalTrainingsPreview({
  personalTraining,
}: Props) {
  return <li>{personalTraining.id}</li>;
}
