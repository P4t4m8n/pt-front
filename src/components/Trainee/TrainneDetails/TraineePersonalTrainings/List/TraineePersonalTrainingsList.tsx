import { TPersonalTraining } from "../../../../../types/personal-training.type";
import ItemList from "../../../../UI/ItemList";
import TraineePersonalTrainingsPreview from "../Preview/TraineePersonalTrainingsPreview";

interface Props {
  personalTrainings: TPersonalTraining[];
}
export default function TraineePersonalTrainingsList({
  personalTrainings,
}: Props) {
  return (
    <ItemList
      items={personalTrainings}
      renderItem={(personalTrainings) => (
        <TraineePersonalTrainingsPreview personalTraining={personalTrainings} />
      )}
    />
  );
}
