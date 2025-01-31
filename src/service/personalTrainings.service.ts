import {
  TPersonalTraining,
  TPersonalTrainingDto,
} from "../types/personal-training.type";
import { TVideo } from "../types/video.type";
import { apiService } from "./api.service";

const BASE_URL = "personal-training/";

const save = async (
  formData: FormData,
  instructionVideos: TVideo[]
): Promise<TPersonalTraining> => {
  const dto = formDataToDto(formData, instructionVideos);

  return await apiService.post<TPersonalTrainingDto, TPersonalTraining>(
    BASE_URL + "edit",
    dto
  );
};

const formDataToDto = (
  formData: FormData,
  instructionVideos: TVideo[]
): TPersonalTrainingDto => {
  const trainingId = formData.get("trainingId") as string;
  const traineeId = formData.get("traineeId") as string;
  const id = formData.get("id") as string;
  const instructions = formData.get("instructions") as string;

  return { trainingId, traineeId, id, instructions, instructionVideos };
};

const getEmpty = (traineeId: string): TPersonalTraining => {
  return {
    id: "",
    instructions: "",
    instructionVideos: [],
    trainee: { id: traineeId },
  };
};

export const personalTrainingsService = { save, getEmpty };
