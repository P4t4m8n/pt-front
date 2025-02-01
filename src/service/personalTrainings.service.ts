import {
  TPersonalTraining,
  TPersonalTrainingDto,
} from "../types/personal-training.type";
import { TVideo } from "../types/video.type";
import { apiService } from "./api.service";
import { videoService } from "./video.service";

const BASE_URL = "personal-training/";

const save = async (
  formData: FormData,
  state: TPersonalTraining
): Promise<TPersonalTraining> => {
  const instructionVideos = await uploadTrainingVideos(
    state.instructionVideos || []
  );

  const dto = formDataToDto(formData, { ...state, instructionVideos });

  return !dto?.id
    ? await apiService.post<TPersonalTrainingDto, TPersonalTraining>(
        BASE_URL + "create",
        dto
      )
    : await apiService.put<TPersonalTrainingDto, TPersonalTraining>(
        BASE_URL + "update",
        dto
      );
};

const formDataToDto = (
  formData: FormData,
  personalTrainingState: TPersonalTraining
): TPersonalTrainingDto => {
  console.log("personalTrainingState:", personalTrainingState)
  const { instructionVideos, trainingId, traineeId, id } =
    personalTrainingState;

  const instructions = formData.get("instructions") as string;
  const setsHistory = personalTrainingState.setsHistory?.map((s) => {
    const sets = s?.sets.map((_s) => ({
      ..._s,
      id: (_s?.id?.length || 0) < 10 ? undefined : _s.id,
    }));
    return {
      ...s,
      sets,
      id: (s?.id?.length || 0) < 10 ? undefined : s.id, //If id is less than 10 characters, it is a new set. Otherwise, it is an existing set.
    };
  });

  return {
    trainingId: trainingId!,
    traineeId: traineeId!,
    id,
    instructions,
    instructionVideos,
    setsHistory,
  };
};

const getEmpty = (traineeId: string): TPersonalTraining => {
  return {
    instructions: "",
    instructionVideos: [],
    trainee: { id: traineeId },
  };
};

const uploadTrainingVideos = async (videos: TVideo[]): Promise<TVideo[]> => {
  const videosBlobs = videos.filter((v) => (v?.id?.length || 0) < 10) || [];

  const videosBlobsPromises = videosBlobs.map((v) => {
    const formData = new FormData();
    formData.append("video", v.blob!);
    return videoService.save(formData);
  });

  return await Promise.all(videosBlobsPromises);
};
export const personalTrainingsService = { save, getEmpty };
