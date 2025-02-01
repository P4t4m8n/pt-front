import { useQuery } from "@tanstack/react-query";
import { trainingService } from "../../service/training.service";

export default function useTrainingsQuery() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["trainings"],
    queryFn: () => trainingService.get(),

    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  return { isPending, isError, trainings: data, error };
}
