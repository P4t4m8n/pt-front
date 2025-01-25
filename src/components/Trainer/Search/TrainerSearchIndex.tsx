import { useEffect, useState } from "react";

import { TUser, TUserFilter } from "../../../types/user.type";
import SearchForm from "../../UI/Search";
import { useLocation } from "react-router";
import { userService } from "../../../service/user.service";
import UsersList from "./Users/UsersList";

//TODO add dynamic component based on the search params (users, trainees, trainers, etc) for different actions
export default function TrainerSearchIndex() {
  const [users, setUsers] = useState<TUser[] | null>(null);
  const { search } = useLocation();

  useEffect(() => {
    const loadUsers = async (location: string) => {
      try {
        const params = new URLSearchParams(location);
        const filter: TUserFilter = {
          firstName: params.get("firstName"),
          lastName: params.get("lastName"),
          email: params.get("email"),
          phone: params.get("phone"),
          includeTrainers:
            params.get("includeTrainers") === "on" ? true : false,
          includeTrainees:
            params.get("includeTrainees") === "on" ? true : false,
        };
        const _users = await userService.get(filter);
        setUsers(_users);
      } catch (error) {
        console.error(error);
      }
    };
    loadUsers(search);
  }, [search]);

  if (!users) return <div>Loading...</div>;
  return (
    <div className="flex flex-col gap-4">
      <SearchForm items={SEARCH_ITEMS} />
      <UsersList users={users} />
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
  {
    name: "includeTrainers",
    type: "checkbox",
    divStyle: "border border-white p-2 rounded flex",
  },
  {
    name: "includeTrainees",
    type: "checkbox",
    divStyle: "border border-white p-2 rounded flex",
  },
];
