import { useEffect, useState } from "react";
import SearchForm from "../../UI/Search";
import { TTrainee } from "../../../types/trainee.type";
import { Location, useLocation } from "react-router";
import { traineeService } from "../../../service/trainee.service";
import { useUser } from "../../../hooks/useUser";
import TraineesList from "./TraineesList";

export default function TraineesIndex() {
  const [trainees, setTrainees] = useState<TTrainee[] | null>(null);

  const { user } = useUser();

  const location = useLocation();

  useEffect(() => {
    const loadTrainees = async (location: Location) => {
      try {
        const params = new URLSearchParams(location.search);
        const filter = {
          firstName: params.get("firstName"),
          lastName: params.get("lastName"),
          email: params.get("email"),
          phone: params.get("phone"),
          trainerId: user?.trainer?.id,
        };

        const trainees = await traineeService.get(filter);
        setTrainees(trainees);
      } catch (error) {
        console.error(error);
      }
    };
    loadTrainees(location);
  }, [location, user]);

  if (!trainees) return <div>Loading...</div>;

  return (
    <div className="grid gap-8">
      <SearchForm items={SEARCH_ITEMS} />
      <TraineesList trainees={trainees} />
    </div>
  );
}

const SEARCH_ITEMS: {
  name: string;
  placeHolder?: string;
  type?: string;
  divStyle?: string;
  id?: string;
  label?: string;
}[] = [
  {
    name: "firstName",
    placeHolder: "Search by first name",
    type: "text",
  },
  {
    name: "lastName",
    placeHolder: "Search by last name",
    type: "text",
  },
  {
    name: "email",
    placeHolder: "Search by email",
    type: "text",
  },
  {
    name: "phone",
    placeHolder: "Search by phone",
    type: "tel",
  },
];
