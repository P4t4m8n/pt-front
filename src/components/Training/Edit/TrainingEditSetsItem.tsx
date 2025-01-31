import { TSet } from "../../../types/set.type";
import { appUtil } from "../../../utils/app.util";
import Button from "../../UI/Button";
import Input from "../../UI/Form/Input";
import Label from "../../UI/Form/Label";
import { icons } from "../../UI/Icons/App.icons";

interface Props {
  set: TSet;
  onRemoveSet: (e: React.MouseEvent, id?: string) => void;
  onChangeSetInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TrainingEditSetsItem({
  set,
  onRemoveSet,
  onChangeSetInput,
}: Props) {
  return (
    <li className="flex gap-4 items-end ">
      {Object.entries(set).map(([key, value]) => (
        <Input
          key={key}
          type="number"
          onChange={onChangeSetInput}
          placeholder={key}
          defaultValue={value}
          name={`set_${key}_${set.id}`}
          id={`set_${key}_${set.id}`}
          divStyle={
            "grid items-center " +
            (key === "id" ||
            key === "trainerId" ||
            key === "trainingId" ||
            key === "setHistoryId"
              ? "hidden"
              : "")
          }
          hidden={
            key === "id" ||
            key === "trainerId" ||
            key === "trainingId" ||
            key === "setHistoryId"
          }
        >
          <Label
            className={
              key === "id" ||
              key === "trainerId" ||
              key === "trainingId" ||
              key === "setHistoryId"
                ? "hidden"
                : ""
            }
            htmlFor={`set_${key}_${set.id}`}
          >
            {appUtil.capitalFirstLetter(key)}:
          </Label>
        </Input>
      ))}
      <Button onClick={(e) => onRemoveSet(e, set.id)}>
        {icons.DeleteSvg({})}
      </Button>
    </li>
  );
}
