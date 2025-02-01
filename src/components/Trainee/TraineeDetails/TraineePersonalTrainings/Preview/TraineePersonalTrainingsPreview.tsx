//Types
import { TPersonalTraining } from "../../../../../types/personal-training.type";
import TraineePersonalTrainingsEditIndex from "../Edit/TraineePersonalTrainingsEditIndex";

interface Props {
  personalTraining: TPersonalTraining;
  setPersonalTrainings: React.Dispatch<
    React.SetStateAction<TPersonalTraining[]>
  >;
}
export default function TraineePersonalTrainingsPreview({
  personalTraining,
  setPersonalTrainings,
}: Props) {
  return (
    <li className="border rounded p-2 flex items-center justify-between">
      <p>{personalTraining.training?.name}</p>
      <TraineePersonalTrainingsEditIndex
        personalTrainingProps={personalTraining}
        setPersonalTrainings={setPersonalTrainings}
      />
    </li>
  );
}
