import { TUser } from "../../../../types/user.type";
import AddTraineeButton from "./AddTraineeBtn";

interface Props {
  users: TUser[];
}
export default function UsersList({ users }: Props) {
  return (
    <ul className="flex flex-col gap-2 w-full">
      <li className="grid grid-cols-6 w-full items-center place-items-center border-b">
        <p>First Name</p>
        <p>Last Name</p>
        <p>Email</p>
        <p>Trainer</p>
        <p>Trainee</p>
        <p>Actions</p>
      </li>
      {users?.map((user, index) => (
        <li
          key={index}
          className="grid grid-cols-6 w-full items-center place-items-center"
        >
          <p>{user.firstName}</p>
          <p>{user.lastName}</p>
          <p>{user.email}</p>
          <p>{user.trainer ? "Yes" : "No"}</p>
          <p>{user.trainee ? "Yes" : "No"}</p>
          <div>
            <AddTraineeButton userId={user.id!} />
          </div>
        </li>
      ))}
    </ul>
  );
}
