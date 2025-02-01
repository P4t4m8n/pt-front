import { useQuery } from "@tanstack/react-query";
import { TUser } from "../../types/user.type";
import { userService } from "../../service/user.service";

interface Props {
  user?: TUser | null;
  traineeId: string;
}
export const useTraineeInfo = ({ user, traineeId }: Props) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["trainee-info", traineeId],
    queryFn: () => userService.getByTraineeId(traineeId),
    enabled: !!user,
    initialData: user,
    staleTime: 60 * 30, // 30 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { isPending, isError, traineeInfo: data, error };
};
