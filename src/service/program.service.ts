import { TDaysOfWeek, TProgramDto } from "../types/program.type";

const save = async (formData: FormData) => {
  const dto = formDataToProgramDto(formData);
  console.log("dto:", dto);
};

const formDataToProgramDto = (formData: FormData): TProgramDto => {
  const data = Object.fromEntries(formData.entries());
  const days = Object.keys(data)
    .filter((key) => key.startsWith("days-"))
    .map((key) => data[key]) as TDaysOfWeek[];

  const dto: TProgramDto = {
    name: (data?.name as string) || "",
    startDate: data?.startDate
      ? new Date(data?.startDate as string)
      : undefined,
    endDate: data?.endDate ? new Date(data?.endDate as string) : undefined,
    isActive: data?.isActive === "on",
    days,
  };

  if (data?.traineeId) dto.traineeId = data?.traineeId as string;
  if (data?.trainerId) dto.trainerId = data?.trainerId as string;
  if (data?.id) dto.id = data?.id as string;

  return dto;
};

export const programService = {
  save,
};
