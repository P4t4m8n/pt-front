//Types
import { TTraineeMetrics } from "../../../../../types/trainee.type";
//UI
import Input from "../../../../UI/Form/Input";

interface Props {
  metric?: TTraineeMetrics;
  formattedDate: string;
  traineeId: string;
}
export default function TraineeMetricEditInputs({
  metric,
  formattedDate,
  traineeId,
}: Props) {
  const {
    heartRate = "",
    weight = "",
    height = "",
    age = "",
    bloodPressureSystole = "",
    bloodPressureDiastole = "",
    id = "",
  } = metric || {};
  return (
    <>
      <Input
        type="number"
        placeholder="Heart rate"
        defaultValue={heartRate || ""}
        name="heartRate"
      />
      <Input
        type="number"
        placeholder="weight"
        defaultValue={weight || ""}
        name="weight"
      />
      <Input
        type="number"
        placeholder="height"
        defaultValue={height || ""}
        name="height"
      />
      <Input
        type="number"
        placeholder="age"
        defaultValue={age || ""}
        name="age"
      />
      <div className="flex gap-1 items-center w-full justify-around">
        <Input
          type="number"
          placeholder="bloodPressureSystole"
          defaultValue={bloodPressureSystole || ""}
          name="bloodPressureSystole"
        />
        <p className="text-4xl">/</p>
        <Input
          type="number"
          placeholder="bloodPressureDiastole"
          defaultValue={bloodPressureDiastole || ""}
          name="bloodPressureDiastole"
        />
      </div>
      <Input
        type="date"
        placeholder="date"
        defaultValue={formattedDate}
        name="date"
      />
      <Input
        type="string"
        defaultValue={id || ""}
        name="id"
        divStyle="hidden"
      />
      <Input
        type="string"
        defaultValue={traineeId || ""}
        name="traineeId"
        divStyle="hidden"
      />
    </>
  );
}
