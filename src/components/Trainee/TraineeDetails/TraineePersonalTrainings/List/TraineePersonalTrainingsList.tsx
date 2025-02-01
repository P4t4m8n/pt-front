//Types
import { TPersonalTraining } from "../../../../../types/personal-training.type";
//UI
import ItemList from "../../../../UI/ItemList";
//Components
import TraineePersonalTrainingsPreview from "../Preview/TraineePersonalTrainingsPreview";

interface Props {
  personalTrainings: TPersonalTraining[];
  setPersonalTrainings: React.Dispatch<
    React.SetStateAction<TPersonalTraining[]>
  >;
}
export default function TraineePersonalTrainingsList({
  personalTrainings,
  setPersonalTrainings,
}: Props) {
  return (
    <ItemList
      items={personalTrainings}
      renderItem={(personalTrainings) => (
        <TraineePersonalTrainingsPreview
          personalTraining={personalTrainings}
          setPersonalTrainings={setPersonalTrainings}
        />
      )}
    />
  );
}
