import { TTraineeMetrics, TTraineeMetricsDto } from "../types/trainee.type";
import { apiService } from "./api.service";

const save = async (formData: FormData): Promise<TTraineeMetrics> => {
  const isUpdate = formData.get("id");
  const dto = fromDataToDto(formData);

  const metric = isUpdate
    ? await apiService.post<TTraineeMetricsDto, TTraineeMetrics>(
        "metrics/save",
        dto
      )
    : await apiService.put<TTraineeMetricsDto, TTraineeMetrics>(
        "metrics/save",
        dto
      );
  return metric;
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
