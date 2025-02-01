//Types
import { TPersonalTraining } from "../../../../../types/personal-training.type";
import { TTraining } from "../../../../../types/training.type";
//Utils
import { appUtil } from "../../../../../utils/app.util";
//UI
import Input from "../../../../UI/Form/Input";
import Label from "../../../../UI/Form/Label";
import Select from "../../../../UI/Form/Select";
import TextArea from "../../../../UI/Form/TextArea";

interface Props {
  personalTraining: TPersonalTraining;
  trainings: TTraining[];
  onChangeTraining: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
export default function TraineePersonalTrainingsEditInputs({
  personalTraining,
  trainings,
  onChangeTraining,
}: Props) {
  const { training, id, instructions, trainee } = personalTraining;

  //TODO: Handle optional values and add icons to the select options
  const options = trainings.map((training) => {
    return {
      value: training?.id || "",
      option: appUtil.capitalFirstLetter(training?.name),
    };
  });
  return (
    <>
      <Select onChange={onChangeTraining} options={options}>
        <Label>Training</Label>
      </Select>
      <TextArea
        defaultValue={instructions}
        name="instructions"
        placeholder="Instructions"
      />

      <Input
        type="text"
        defaultValue={trainee?.id}
        name="traineeId"
        divStyle="hidden"
        hidden
      />
      <Input type="text" defaultValue={id} name="id" divStyle="hidden" hidden />
      <Input
        type="text"
        defaultValue={training?.id}
        name="trainingId"
        divStyle="hidden"
        hidden
      />
    </>
  );
}
