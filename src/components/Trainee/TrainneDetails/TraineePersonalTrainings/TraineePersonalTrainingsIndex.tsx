//Core
import { useState } from "react";
//Types
import { TPersonalTraining } from "../../../../types/personal-training.type";
//Services
import { personalTrainingsService } from "../../../../service/personalTrainings.service";
//Components
import TraineePersonalTrainingsList from "./List/TraineePersonalTrainingsList";
import TraineePersonalTrainingsEditIndex from "./Edit/TraineePersonalTrainingsEditIndex";

interface Props {
  personalTrainingsProps: TPersonalTraining[];
  traineeId: string;
}
export default function TraineePersonalTrainingsIndex({
  personalTrainingsProps,
  traineeId,
}: Props) {
  const [personalTrainings, setPersonalTrainings] = useState<
    TPersonalTraining[]
  >(personalTrainingsProps);

  const emptyPersonalTraining: TPersonalTraining =
    personalTrainingsService.getEmpty(traineeId);
  return (
    <div className="w-full h-full border p-2 rounded borer-white">
      <TraineePersonalTrainingsEditIndex
        personalTrainingProps={emptyPersonalTraining}
        setPersonalTrainings={setPersonalTrainings}
      />
      <TraineePersonalTrainingsList personalTrainings={personalTrainings} />
    </div>
  );
}
