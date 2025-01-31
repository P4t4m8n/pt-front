import {
  TTraining,
  TTrainingDto,
  TTrainingFilter,
} from "../types/training.type";
import { apiService } from "./api.service";
import { setService } from "./set.service";

const BASE_URL = "training/";

const get = async (params?: URLSearchParams): Promise<TTraining[]> => {
  const filter = buildFilter(params);
  const url = BASE_URL + apiService.buildQuery(filter);
  const trainings = await apiService.get<TTraining[]>(url);
  return trainings;
};

const getById = async (id: string): Promise<TTraining> => {
  const url = BASE_URL + id;
  const training = await apiService.get<TTraining>(url);
  return training;
};
const save = async (FormData: FormData): Promise<TTraining> => {
  const dto = formDataToDto(FormData);
  return dto?.id
    ? await apiService.put<TTrainingDto, TTraining>(
        BASE_URL + "edit/" + dto.id,
        dto
      )
    : await apiService.post<TTrainingDto, TTraining>(BASE_URL + "edit", dto);
};

const buildFilter = (params?: URLSearchParams): TTrainingFilter => {
  const filter: TTrainingFilter = {
    trainerId: params?.get("trainerId"),
    name: params?.get("name"),
  };
  return filter;
};

const getEmpty = (): TTrainingDto => {
  return {
    name: "",
    defaultSets: [
      setService.getEmpty(),
      setService.getEmpty(),
      setService.getEmpty(),
    ],
    trainerId: "",
    description: "",
  };
};

const formDataToDto = (formData: FormData): TTrainingDto => {
  const name = formData.get("name") as string;
  const trainerId = formData.get("trainerId") as string;
  const description = formData.get("description") as string;
  const id = formData.get("id") as string;

  formData.delete("id");
  formData.delete("name");
  formData.delete("trainerId");
  formData.delete("description");

  return {
    id,
    name,
    trainerId,
    description,
    defaultSets: setService.fromDataToDto(formData),
  };
};

export const trainingService = {
  get,
  save,
  getById,
  getEmpty,
};
