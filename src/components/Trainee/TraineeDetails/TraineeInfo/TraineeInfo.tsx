//Types
import { TUser } from "../../../../types/user.type";
//UI
import { icons } from "../../../UI/Icons/App.icons";
import Image from "../../../UI/Image";

interface Props {
  user?: TUser | null;
}
export default function TraineeInfo({ user }: Props) {
  const { firstName, lastName, email, phone, imgUrl } = user!;

  return (
    <div className="w-full h-full border p-2 rounded borer-white flex items-center justify-center gap-8">
      {imgUrl ? (
        <Image src={imgUrl} alt="User Image" width={32} height={32} />
      ) : (
        icons.ProfileSvg()
      )}
      <div>
        <h2 className="text-lg font-bold">
          {firstName} {lastName}
        </h2>
        <p className="text-sm">{email}</p>
        <p className="text-sm">{phone}</p>
      </div>
    </div>
  );
}
