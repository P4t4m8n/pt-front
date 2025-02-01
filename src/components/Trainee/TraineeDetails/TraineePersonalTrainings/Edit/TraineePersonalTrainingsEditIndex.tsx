//Core
import { useState } from "react";
//Types
import { TPersonalTraining } from "../../../../../types/personal-training.type";
import { TVideo } from "../../../../../types/video.type";
//Services
import { personalTrainingsService } from "../../../../../service/personalTrainings.service";
//Hooks
import useTrainingsQuery from "../../../../../hooks/queryHooks/useTrainingsQuery";
//UI
import Model from "../../../../UI/Model";
//Components
import VideoRecorderIndex from "../../../../VideoRecorder/VideoRecorderIndex";
import TraineePersonalTrainingsEditInputs from "./TraineePersonalTrainingsEditInputs";
import TraineePersonalTrainingsEditVideos from "./TraineePersonalTrainingsEditVideos";
import TraineePersonalTrainingsEditSets from "./TraineePersonalTrainingsEditSets";
import TraineeTableEdit from "../../../TraineeTableEdit";

interface Props {
  personalTrainingProps: TPersonalTraining;
  setPersonalTrainings: React.Dispatch<
    React.SetStateAction<TPersonalTraining[]>
  >;
}
export default function TraineePersonalTrainingsEditIndex({
  personalTrainingProps,
  setPersonalTrainings,
}: Props) {
  const [personalTrainingToEdit, setPersonalTrainingToEdit] =
    useState<TPersonalTraining>(personalTrainingProps);
  console.log("personalTrainingToEdit:", personalTrainingToEdit);

  const { isPending, isError, trainings = [], error } = useTrainingsQuery();

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  const handleItem = async (formData: FormData) => {
    try {
      const data = await personalTrainingsService.save(
        formData,
        personalTrainingToEdit
      );
      setPersonalTrainings((prev) => {
        const idx = prev.findIndex((item) => item?.id === data?.id);
        console.log("idx:", idx);
        if (idx < 0) return [...prev, data];
        prev[idx] = data;
        return [...prev];
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeTraining = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const trainingId = e.target.value;
    const idx = trainings.findIndex((item) => item.id === trainingId);
    //TODO handle error
    if (idx < 0) {
      console.error("Training not found");
      return;
    }

    setPersonalTrainingToEdit((prev) => ({
      ...prev,
      training: trainings[idx],
      traineeId: personalTrainingToEdit.trainee?.id,
      trainingId,
    }));
  };

  const onAddVideo = (video: TVideo) => {
    setPersonalTrainingToEdit((prev) => ({
      ...prev,
      instructionVideos: [...(prev?.instructionVideos || []), video],
    }));
  };

  const onRemoveVideo = (video: TVideo) => {
    setPersonalTrainingToEdit((prev) => ({
      ...prev,
      instructionVideos: prev?.instructionVideos?.filter(
        (item) => item.id !== video.id
      ),
    }));
  };

  const isNew = personalTrainingToEdit?.id === undefined;

  return (
    <>
      <Model
        button={{
          content: isNew ? "Add" : "Edit",
          props: {
            className:
              "btn btn-primary p-2 shadow-border rounded bg-secondary-light dark:bg-primary-dark h-fit",
          },
        }}
        model={
          <TraineeTableEdit
            handleItem={handleItem}
            disabled={!personalTrainingToEdit?.setsHistory}
          >
            <TraineePersonalTrainingsEditInputs
              personalTraining={personalTrainingToEdit}
              trainings={trainings}
              onChangeTraining={onChangeTraining}
            />
            <TraineePersonalTrainingsEditVideos
              instructionVideos={personalTrainingToEdit.instructionVideos || []}
              onRemoveVideo={onRemoveVideo}
            />
            <VideoRecorderIndex addVideosURL={onAddVideo} />
            {personalTrainingToEdit.training && (
              <TraineePersonalTrainingsEditSets
                setsHistory={personalTrainingToEdit?.setsHistory || []}
                training={personalTrainingToEdit?.training}
                setPersonalTrainingToEdit={setPersonalTrainingToEdit}
              />
            )}
          </TraineeTableEdit>
        }
      />
    </>
  );
}
