import { useEffect, useState } from "react";
import { TPersonalTraining } from "../../../../../types/personal-training.type";
import { personalTrainingsService } from "../../../../../service/personalTrainings.service";
import Model from "../../../../UI/Model";
import TraineeTableEdit from "../../../TraineeTableEdit";
import { TTraining } from "../../../../../types/training.type";
import { trainingService } from "../../../../../service/training.service";
import TraineePersonalTrainingsEditInputs from "./TraineePersonalTrainingsEditInputs";
import VideoRecorderIndex from "../../../../VideoRecorder/VideoRecorderIndex";
import { TVideo } from "../../../../../types/video.type";

import TraineePersonalTrainingsEditVideos from "./TraineePersonalTrainingsEditVideos";
// import { TSetHistory } from "../../../../../types/set.type";
import TraineePersonalTrainingsEditSets from "./TraineePersonalTrainingsEditSets";

interface Props {
  personalTrainingProps: TPersonalTraining;
  setPersonalTrainings: React.Dispatch<
    React.SetStateAction<TPersonalTraining[]>
  >;
}
export default function TraineePersonalTrainingsEdit({
  personalTrainingProps,
  setPersonalTrainings,
}: Props) {
  const [personalTrainingToEdit, setPersonalTrainingToEdit] =
  useState<TPersonalTraining>(personalTrainingProps);
  const [trainings, setTrainings] = useState<TTraining[]>([]);
  console.log("personalTrainingToEdit:", personalTrainingToEdit)

  useEffect(() => {
    const loadTrainings = async () => {
      try {
        const trainings = await trainingService.get();
        setTrainings(trainings);
      } catch (error) {
        console.error(error);
      }
    };
    loadTrainings();
  }, []);

  const handleItem = async (formData: FormData) => {
    try {
      const data = await personalTrainingsService.save(
        formData,
        personalTrainingToEdit?.instructionVideos || []
      );
      setPersonalTrainings((prev) => {
        const idx = prev.findIndex((item) => item.id === data.id);
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

 

  return (
    <>
      <Model
        button={{
          content: "TTT",
          props: {
            className:
              "btn btn-primary p-2 shadow-border rounded bg-secondary-light dark:bg-primary-dark h-fit",
          },
        }}
        model={
          <TraineeTableEdit handleItem={handleItem}>
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
                setsHistory={personalTrainingToEdit?.sets || []}
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
