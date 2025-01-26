import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { TTraining } from "../../types/training.type";
import { trainingService } from "../../service/training.service";

interface Props {
  idProps?: string;
}
export default function TrainingDetails({ idProps }: Props) {
  const [training, setTraining] = useState<TTraining | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const loadTraining = async (id: string) => {
      try {
        const _trainings = await trainingService.getById(id);

        setTraining(_trainings);
      } catch (error) {
        console.error(error);
      }
    };

    const _id = idProps || id;

    //TODO handle no id
    if (!_id) {
      console.error("No id provided");
      return;
    }
    loadTraining(_id);
  }, [id, idProps]);

  if (!training) return <div>Loading...</div>;
  return (
    <div>
      <h1>{training.name}</h1>
      <p>{training.description}</p>
    </div>
  );
}
