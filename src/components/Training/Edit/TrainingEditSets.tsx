
import { TSet } from "../../../types/set.type";
import Button from "../../UI/Button";
import { icons } from "../../UI/Icons/App.icons";
import ItemList from "../../UI/ItemList";
import TrainingEditSetsItem from "./TrainingEditSetsItem";

interface Props {
  sets: TSet[];
  onAddSet: (e: React.MouseEvent) => void;
  onRemoveSet: (e: React.MouseEvent, id?: string) => void;
}
export default function TrainingEditSets({
  sets,
  onAddSet,
  onRemoveSet,
}: Props) {
  return (
    <>
      <div className=" flex  items-center justify-between gap-4 p-2 shadow-border rounded scroll">
        <span className="flex gap-1 items-center">
          <h3>Sets:</h3>
          <p>{sets.length}</p>
        </span>
        <span className="flex gap-2">
          <Button className="border rounded-full" onClick={onRemoveSet}>
            {icons.MinusSvg({})}
          </Button>
          <Button className="border rounded-full" onClick={onAddSet}>
            {icons.PlusSvg({})}
          </Button>
        </span>
      </div>

      <ItemList
        listStyle="h-[calc(100%-15.5rem)] p-2 flex flex-col gap-2 overflow-auto custom-scrollbar"
        items={sets}
        renderItem={(set) => (
          <TrainingEditSetsItem set={set} onRemoveSet={onRemoveSet} />
        )}
      />
    </>
  );
}
