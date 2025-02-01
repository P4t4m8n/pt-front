import { useParams } from "react-router";
import TraineeDetailsIndex from "../../Trainee/TraineeDetails/TraineeDetailsIndex";
import { useTraineeQuery } from "../../../hooks/queryHooks/useTraineeQuery";

export default function TrainerTraineeDetails() {
  const { id } = useParams<{ id: string }>();

  const { isPending, isError, trainee, error } = useTraineeQuery(id);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  if (!trainee) {
    return <span>No user found</span>;
  }
  return <TraineeDetailsIndex trainee={trainee} traineeId={id} />;
}
