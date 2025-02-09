import { useQuery } from "@tanstack/react-query";
import { programService } from "../../service/program.service";

export const useProgramQuery = (programId?: string) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["program-details", programId],
    queryFn: () => programService.getById(programId),

    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  return { isPending, isError, program: data, error };
};
