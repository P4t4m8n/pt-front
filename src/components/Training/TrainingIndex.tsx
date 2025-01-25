import { useEffect, useState } from "react";
import { TTraining } from "../../types/training.type";
import { useUser } from "../../hooks/useUser";
import { useLocation } from "react-router";
import { trainingService } from "../../service/training.service";
import SearchForm from "../UI/Search";
import ItemList from "../UI/ItemList";
import TrainingPreview from "./TrainingPreview";
import Model from "../UI/Model";
import TrainingEdit from "./TrainingEdit";

export default function TrainingIndex() {
  const [trainings, setTrainings] = useState<TTraining[] | null>(null);
  const { search } = useLocation();
  const { user } = useUser();

  useEffect(() => {
    const loadTrainings = async (location: string) => {
      try {
        const params = new URLSearchParams(location);
        const _trainings = await trainingService.get(params);
        console.log("_trainings:", _trainings);
        setTrainings(_trainings);
      } catch (error) {
        console.error(error);
      }
    };
    loadTrainings(search);
  }, [search]);

  const SEARCH_ITEMS = [
    {
      name: "name",
      placeHolder: "Training name",
      type: "text",
    },

    {
      name: "trainerId",
      type: "checkbox",
      divStyle: "border border-white p-2 rounded flex",
      value: user?.trainer?.id,
      label: "My Trainings",
    },
  ];

  return (
    <div>
      <SearchForm items={SEARCH_ITEMS} />
      <Model
        button={{
          content: "Create Training",
          props: { className: "btn btn-primary" },
        }}
        model={<TrainingEdit />}
      />
      <ItemList
        items={trainings || []}
        renderItem={(training) => <TrainingPreview training={training} />}
      />
    </div>
  );
}
