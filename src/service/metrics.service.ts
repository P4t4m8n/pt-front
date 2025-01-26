import { TTraineeMetrics, TTraineeMetricsDto } from "../types/trainee.type";
import { apiService } from "./api.service";

const save = async (formData: FormData): Promise<TTraineeMetrics> => {
  const dto = fromDataToDto(formData);

  return await apiService.post<TTraineeMetricsDto, TTraineeMetrics>(
    "metrics/edit",
    dto
  );
};

const fromDataToDto = (formData: FormData): TTraineeMetricsDto => {
  return {
    id: formData.get("id") as string,
    traineeId: formData.get("traineeId") as string,
    heartRate: +(formData.get("heartRate") || 0),
    weight: parseFloat((formData.get("weight") as string) || "0"),
    height: +(formData.get("height") || 0),
    age: +(formData.get("age") || 0),
    bloodPressureSystole: +(formData.get("bloodPressureSystole") || 0),
    bloodPressureDiastole: +(formData.get("bloodPressureDiastole") || 0),
    date: new Date(formData.get("date") as string),
  };
};

export const metricsService = {
  save,
};
