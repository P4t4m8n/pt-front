import { MouseEvent } from "react";

import { TTraining, TTrainingDto } from "../../../types/training.type";

import { trainingService } from "../../../service/training.service";
import { setService } from "../../../service/set.service";

import Input from "../../UI/Form/Input";
import TextArea from "../../UI/Form/TextArea";

import TrainingEditSets from "./TrainingEditSets";
import { useSingleItemQuery } from "../../../hooks/queryHooks/useSingleItemQuery";
import { useQueryClient } from "@tanstack/react-query";
import { TSet } from "../../../types/set.type";
import ImageUpload from "../../ImageUpload/ImageUpload";
import VideoRecorderIndex from "../../VideoRecorder/VideoRecorderIndex";
import { TVideo } from "../../../types/video.type";

interface Props {
  trainingId?: string;
  serverErrors?: Record<keyof TTrainingDto, string> | null;
}

export default function TrainingEditInputs({
  trainingId,
  serverErrors,
}: Props) {
  console.log("serverErrors:", serverErrors);

  const {
    isPending,
    isError,
    data: trainingToEdit,
    error,
  } = useSingleItemQuery<TTraining, TTrainingDto>({
    id: trainingId,
    queryKey: "training-edit",
    getById: trainingService.getById,
    getEmpty: trainingService.getEmpty,
  });
  const queryClient = useQueryClient();

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  const onAddSet = (e: MouseEvent) => {
    e.preventDefault();

    const emptySet = setService.getEmpty();
    queryClient.setQueryData(
      ["training-edit", trainingId],
      (prev: TTrainingDto) => {
        return {
          ...prev!,
          defaultSets: [...(prev?.defaultSets || []), emptySet],
        };
      }
    );
  };

  const onRemoveSet = (e: MouseEvent, id?: string) => {
    e.preventDefault();
    if (!trainingToEdit?.defaultSets?.length) {
      console.error("No sets to remove");
      return;
    }

    queryClient.setQueryData(
      ["training-edit", trainingId],
      (prev: TTrainingDto) => {
        let sets: TSet[] = [];
        if (!id) {
          sets =
            trainingToEdit?.defaultSets?.toSpliced(
              trainingToEdit?.defaultSets?.length - 1
            ) || [];
        } else {
          sets =
            trainingToEdit?.defaultSets?.filter((set) => set.id !== id) || [];
        }
        return { ...prev!, defaultSets: sets };
      }
    );
  };

  const onAddVideo = (video: TVideo) => {
    queryClient.setQueryData(
      ["training-edit", trainingId],
      (prev: TTraining) => {
        return {
          ...prev!,
          defaultVideo: video,
        };
      }
    );
  };

  const onRemoveVideo = () => {
    queryClient.setQueryData(
      ["training-edit", trainingId],
      (prev: TTraining) => {
        return {
          ...prev!,
          defaultVideo: null,
        };
      }
    );
  };

  return (
    <>
      <Input
        type="text"
        placeholder="Training Name"
        name="name"
        defaultValue={trainingToEdit?.name}
      />
      <ImageUpload imgUrl={trainingToEdit?.imgUrl} />
      <VideoRecorderIndex addVideosURL={onAddVideo} />
      <Input type="text" name="id" defaultValue={trainingToEdit?.id} hidden />
      <TextArea
        name="description"
        placeholder="Description"
        defaultValue={trainingToEdit?.description}
      />
      <TrainingEditSets
        sets={trainingToEdit?.defaultSets || []}
        onAddSet={onAddSet}
        onRemoveSet={onRemoveSet}
      />
    </>
  );
}
