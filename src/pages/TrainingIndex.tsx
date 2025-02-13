import { useLocation } from "react-router";

import { TTraining, TTrainingDto } from "../types/training.type";

import { useUser } from "../hooks/useUser";

import { trainingService } from "../service/training.service";

import SearchForm from "../components/UI/Search";

import { useItems } from "../hooks/useItems";
import TrainingEditModel from "../components/Training/Edit/TrainingEditModel";

export default function TrainingIndex() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const {
    isPending,
    isError,
    items: trainings,
    error,
    handleItem,
    serverErrors,
  } = useItems<TTraining, TTrainingDto>({
    save: trainingService.save,
    get: trainingService.get,
    queryKey: "trainees",
    params,
  });
  console.log("trainings:", trainings);

  const { user } = useUser();
  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

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
        <TrainingEditModel
          handleItem={handleItem}
          serverErrors={serverErrors}
        />
      </div>
      {/* <TrainingTable trainings={trainings || []} setTrainings={setTrainings} /> */}
    </div>
  );
}
