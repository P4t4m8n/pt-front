import { TTrainee, TTraineeDto, TTraineeFilter } from "../types/trainee.type";
import { TTraining } from "../types/training.type";
import { apiService } from "./api.service";

const BASE_URL = "trainee/";

const get = async (filter: TTraineeFilter) => {
  const url = BASE_URL + apiService.buildQuery(filter);
  const trainees = await apiService.get<TTrainee[]>(url);
  return trainees;
};

const getById = async (id?: string): Promise<TTrainee> => {
  if (!id) {
    throw new Error("Id is required");
  }
  const trainee = await apiService.get<TTrainee>(BASE_URL + id);
  return trainee;
};

const save = async (formData: FormData): Promise<TTraining> => {
  const dto = formDataToDto(formData);
  return await apiService.post<TTraineeDto, TTraining>(BASE_URL, dto);
};

const formDataToDto = (formData: FormData): TTraineeDto => {
  return {
    userId: formData.get("userId") as string,
    trainerId: formData.get("trainerId") as string,
    metrics: {
      heartRate: +(formData.get("heartRate") || 0),
      weight: parseFloat((formData.get("weight") as string) || "0"),
      height: +(formData.get("height") || 0),
      age: +(formData.get("age") || 0),
      bloodPressureSystole: +(formData.get("bloodPressureSystole") || 0),
      bloodPressureDiastole: +(formData.get("bloodPressureDiastole") || 0),
    },
  };
};

export const traineeService = {
  get,
  getById,
  save,
};
