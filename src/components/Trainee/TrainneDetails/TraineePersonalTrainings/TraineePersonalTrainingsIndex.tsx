import { TPersonalTraining } from "../../../../types/personal-training.type";
import TraineePersonalTrainingsList from "./TraineePersonalTrainingsList";

interface Props {
  personalTrainings: TPersonalTraining[];
}
export default function TraineePersonalTrainingsIndex({
  personalTrainings,
}: Props) {
  return (
    <div>
      <TraineePersonalTrainingsList personalTrainings={personalTrainings} />
    </div>
  );
}
