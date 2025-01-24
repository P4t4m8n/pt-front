import { useParams } from "react-router";
import { TTrainee } from "../../../types/trainee.type";
import { useEffect, useState } from "react";
import { traineeService } from "../../../service/trainee.service";
import TraineeDetailsIndex from "../../Trainee/TrainneDetails/TraineeDetailsIndex";

export default function TrainerTraineeDetails() {
  const { id } = useParams<{ id: string }>();
  const [trainee, setTrainee] = useState<TTrainee | null>(null);

  useEffect(() => {
    const loadTrainee = async (id?: string) => {
      if (!id) return;
      try {
        const _trainee = await traineeService.getById(id);
        setTrainee(_trainee);
      } catch (error) {
        console.error(error);
      }
    };
    loadTrainee(id);
  }, [id]);

  if (!trainee) return <div>Loading...</div>;
  return <TraineeDetailsIndex trainee={trainee} />;
}
