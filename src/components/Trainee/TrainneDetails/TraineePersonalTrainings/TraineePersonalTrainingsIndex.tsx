import { useState } from "react";
import { TPersonalTraining } from "../../../../types/personal-training.type";
import TraineePersonalTrainingsList from "./List/TraineePersonalTrainingsList";
import TraineePersonalTrainingsEdit from "./Edit/TraineePersonalTrainingsEdit";
import { personalTrainingsService } from "../../../../service/personalTrainings.service";

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
      <TraineePersonalTrainingsEdit
        personalTrainingProps={emptyPersonalTraining}
        setPersonalTrainings={setPersonalTrainings}
      />
      <TraineePersonalTrainingsList personalTrainings={personalTrainings} />
    </div>
  );
}
