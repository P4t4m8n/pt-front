import { TSet } from "../../types/set.type";
import { appUtil } from "../../utils/app.util";
import Button from "../UI/Button";
import Input from "../UI/Form/Input";
import Label from "../UI/Form/Label";
import { icons } from "../UI/Icons/App.icons";

interface Props {
  set: TSet;
  onRemoveSet: (e: React.MouseEvent, id?: string) => void;
}

export default function TrainingEditSetsItem({ set, onRemoveSet }: Props) {
  return (
    <li className="flex gap-4 items-end ">
      {Object.entries(set).map(
        ([key, value]) =>
          key !== "trainerId" && (
            <Input
              key={key}
              type="number"
              placeholder={key}
              defaultValue={value}
              name={`set_${key}_${set.id}`}
              id={`set_${key}_${set.id}`}
              divStyle="grid items-center "
              hidden={key === "id"}
            >
              <Label
                hidden={key === "id"}
                className=""
                htmlFor={`set_${key}_${set.id}`}
              >
                {appUtil.capitalFirstLetter(key)}:
              </Label>
            </Input>
          )
      )}
      <Button onClick={(e) => onRemoveSet(e, set.id)}>
        {icons.DeleteSvg({})}
      </Button>
    </li>
  );
}
