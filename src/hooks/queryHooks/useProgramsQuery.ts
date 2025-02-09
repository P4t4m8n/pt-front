import { useQuery } from "@tanstack/react-query";
import { programService } from "../../service/program.service";

export const useProgramsQuery = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["user-programs"],
    queryFn: () => programService.getByUser(),

    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  return { isPending, isError, programs: data, error };
};
