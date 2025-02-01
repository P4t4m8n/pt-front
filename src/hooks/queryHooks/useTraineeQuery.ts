import { useQuery } from "@tanstack/react-query";
import { traineeService } from "../../service/trainee.service";

export const useTraineeQuery = (traineeId?: string) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["trainee-info", traineeId],
    queryFn: () => traineeService.getById(traineeId),

    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  return { isPending, isError, trainee: data, error };
};
