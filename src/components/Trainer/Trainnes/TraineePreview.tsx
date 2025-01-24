import { TTrainee } from "../../../types/trainee.type";
import { icons } from "../../UI/Icons/App.icons";
import Image from "../../UI/Image";
import NavLinkCmp from "../../UI/Link";

interface Props {
  trainee: TTrainee;
}
export default function TraineePreview({ trainee }: Props) {
  return (
    <li className="trainee-list-item">
      {trainee?.user?.imgUrl ? (
        <Image
          src={trainee?.user?.imgUrl}
          alt="User Image"
          width={32}
          height={32}
        />
      ) : (
        icons.ProfileSvg()
      )}
      <p>{trainee.user?.firstName}</p>
      <p>{trainee.user?.lastName}</p>
      <p>{trainee.user?.phone}</p>
      <p>{trainee.user?.email}</p>
      <div>
        <NavLinkCmp
          styleMode="none"
          styleSize="none"
          className="border rounded p-2"
          to={`/trainer/trainees/${trainee.id}`}
        >
          Details
        </NavLinkCmp>
      </div>
    </li>
  );
}
