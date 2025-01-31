import { useState } from "react";
import { setService } from "../../../../../service/set.service";
import { setHistoryService } from "../../../../../service/setHistory.service";
import { TSetHistory } from "../../../../../types/set.type";
import { TTraining } from "../../../../../types/training.type";
import Button from "../../../../UI/Button";
import { icons } from "../../../../UI/Icons/App.icons";
import ItemList from "../../../../UI/ItemList";
import TrainingEditSetsItem from "../../../../Training/Edit/TrainingEditSetsItem";
import SetHistoryPreview from "../../../../SetHistory/Preview/SetHistoryPreview";
import { TPersonalTraining } from "../../../../../types/personal-training.type";

interface Props {
  setsHistory: TSetHistory[];
  training?: TTraining;
  setPersonalTrainingToEdit: React.Dispatch<
    React.SetStateAction<TPersonalTraining>
  >;
}
export default function TraineePersonalTrainingsEditSets({
  setsHistory,
  training,
  setPersonalTrainingToEdit,
}: Props) {
  const [setsToEdit, setSetsToEdit] = useState<TSetHistory | null>(null);
  console.log("setsToEdit:", setsToEdit);

  const onAddSet = (e: React.MouseEvent) => {
    e.preventDefault();

    const emptySet = setService.getEmpty();
    setSetsToEdit((prev) => {
      if (!prev) return prev;

      return { ...prev, sets: [...(prev?.sets || []), emptySet] };
    });
  };

  const onRemoveSet = (e: React.MouseEvent, id?: string) => {
    e.preventDefault();
    if (!setsToEdit?.sets.length) {
      console.error("No sets to remove");
      return;
    }

    setSetsToEdit((prev) => {
      if (!prev) return prev;

      let sets = [];

      if (!id) {
        sets = prev?.sets.toSpliced(setsToEdit?.sets?.length - 1) || [];
      } else {
        sets = prev?.sets.filter((set) => set.id !== id) || [];
      }

      return { ...prev, sets };
    });
  };

  const onChangeSetInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [key, id] = e.target.name.split("_").slice(1);
    const value = e.target.value;

    setSetsToEdit((prev) => {
      if (!prev) return prev;

      const sets = prev.sets.map((set) => {
        if (set.id !== id) return set;

        return { ...set, [key]: value };
      });

      return { ...prev, sets };
    });
  };

  const onSaveSet = () => {
    setPersonalTrainingToEdit((prev) => {
      if (!prev) return prev;
      if (!setsToEdit) return prev;
      if (!prev?.sets) {
        return { ...prev, sets: [setsToEdit] };
      }
      const idx = prev.sets.findIndex((s) => {
        console.log("s:", s.id);
        console.log("setsToEdit:", setsToEdit.id);
        return s.id === setsToEdit.id;
      });

      if (idx < 0) {
        return { ...prev, sets: [...(prev.sets || []), setsToEdit] };
      }

      prev.sets![idx] = setsToEdit;
      return { ...prev };
    });
    setSetsToEdit(null);
  };

  const addSetHistory = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const setHistory = setHistoryService.getEmpty("TRAINER", training!);
    setSetsToEdit(setHistory);
  };
  return (
    <div>
      <Button className="border rounded-full" onClick={(e) => addSetHistory(e)}>
        {icons.PlusSvg({})}
      </Button>

      {setsToEdit && (
        <div className="border p-2 rounded">
          <div className=" flex  items-center justify-between gap-4 p-2 shadow-border rounded scroll">
            <span className="flex gap-1 items-center">
              <h3>Sets:</h3>
              <p>{setsToEdit?.sets.length}</p>
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
            listStyle=" p-2 flex flex-col gap-2 overflow-auto custom-scrollbar"
            items={setsToEdit?.sets || []}
            renderItem={(set) => (
              <TrainingEditSetsItem
                set={set}
                onRemoveSet={onRemoveSet}
                onChangeSetInput={onChangeSetInput}
              />
            )}
          />
          <Button className="" type="button" onClick={onSaveSet}>
            {icons.SaveSvg({ className: "w-6 h-6 stroke-none fill-white" })}
          </Button>
        </div>
      )}
      <ItemList
        items={setsHistory}
        renderItem={(setHistory) => (
          <SetHistoryPreview
            setHistory={setHistory}
            setSetsToEdit={setSetsToEdit}
          />
        )}
      />
    </div>
  );
}
