import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import { TTraining } from "../../types/training.type";

import { useUser } from "../../hooks/useUser";

import { trainingService } from "../../service/training.service";

import SearchForm from "../UI/Search";
import Model from "../UI/Model";

import TrainingTable from "./List/TrainingTable";
import TrainingEdit from "./Edit/TrainingEdit";

export default function TrainingIndex() {
  const [trainings, setTrainings] = useState<TTraining[] | null>(null);
  const { search } = useLocation();
  const { user } = useUser();

  useEffect(() => {
    const loadTrainings = async (location: string) => {
      try {
        const params = new URLSearchParams(location);
        const _trainings = await trainingService.get(params);
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
      <div className="flex items-center justify-between">
        <SearchForm items={SEARCH_ITEMS} />
        <Model
          button={{
            content: "Create Training",
            props: {
              className:
                "btn btn-primary p-2 shadow-border rounded bg-secondary-light dark:bg-primary-dark",
            },
          }}
          model={<TrainingEdit setTrainings={setTrainings} />}
        />
      </div>
      <TrainingTable trainings={trainings || []} setTrainings={setTrainings} />
    </div>
  );
}
