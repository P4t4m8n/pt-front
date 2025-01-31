import {
  TPersonalTraining,
  TPersonalTrainingDto,
} from "../types/personal-training.type";
import { apiService } from "./api.service";

const BASE_URL = "personal-training/";

const create = async (
  formData: FormData,
  state: TPersonalTraining
): Promise<TPersonalTraining> => {
  console.log("state:", state);
  const dto = formDataToDto(formData, state);

  return await apiService.post<TPersonalTrainingDto, TPersonalTraining>(
    BASE_URL + "create",
    dto
  );
};

const formDataToDto = (
  formData: FormData,
  personalTrainingState: TPersonalTraining
): TPersonalTrainingDto => {
  const trainingId = personalTrainingState.training?.id || "";
  const traineeId = personalTrainingState?.trainee?.id || "";
  const id = formData.get("id") as string;
  const instructions = formData.get("instructions") as string;
  const instructionVideos = personalTrainingState.instructionVideos?.map(
    (v) => {
      if ((v?.id?.length || 0) < 10) {
        return v.blob!;
      }
      return v;
    }
  );
  const sets = personalTrainingState.sets?.map((s) => ({
    ...s,
    id: (s?.id?.length || 0) < 10 ? undefined : s.id, //If id is less than 10 characters, it is a new set. Otherwise, it is an existing set.
  }));

  return { trainingId, traineeId, id, instructions, instructionVideos, sets };
};

const getEmpty = (traineeId: string): TPersonalTraining => {
  return {
    id: "",
    instructions: "",
    instructionVideos: [],
    trainee: { id: traineeId },
  };
};

export const personalTrainingsService = { create, getEmpty };
