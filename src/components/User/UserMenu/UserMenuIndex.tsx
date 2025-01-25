import { useRef } from "react";

import { useUser } from "../../../hooks/useUser";
import { useModel } from "../../../hooks/useModel";

import NavLinkCmp from "../../UI/Link";
import Button from "../../UI/Button";
import Image from "../../UI/Image";
import { icons } from "../../UI/Icons/App.icons";

export default function UserMenuIndex() {
  const { user, signOut } = useUser();
  const modelRef = useRef(null);
  const [isOpen, setIsOpen] = useModel(modelRef);

  if (!user) {
    return (
      <NavLinkCmp
        styleMode="none"
        styleSize="none"
        className="border p-2 rounded-sm"
        to="/auth"
      >
        Sign-In
      </NavLinkCmp>
    );
  }
  return (
    <div ref={modelRef} className="relative">
      <Button
        styleMode="none"
        styleSize="none"
        className="h-full aspect-square fill-white"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {user?.imgUrl ? (
          <Image
            src={user?.imgUrl}
            alt="User avatar"
            className="w-8 h-8 stroke-text-light dark:stroke-text-dark fill-text-light dark:fill-text-dark"
          />
        ) : (
          icons.ProfileSvg()
        )}
      </Button>
      {isOpen && (
        <ul className=" absolute border bg-white top-full right-0 p-4 rounded-sm w-36">
          <Button
            styleMode="none"
            styleSize="none"
            className=" p-2 flex items-center justify-between w-full   border-b"
            onClick={signOut}
          >
            <span>Logout</span>
            {icons.LogoutSvg({
              className: "h-6 aspect-square fill-none stroke-black rotate-180 ",
            })}
          </Button>
          <NavLinkCmp
            styleMode="none"
            styleSize="none"
            className=" p-2 flex items-center justify-between w-full  border-t "
            to={`profile/${user.id}`}
          >
            <span>Profile</span>
            {icons.LogoutSvg({
              className: "h-6 aspect-square fill-none stroke-black rotate-180 ",
            })}{" "}
          </NavLinkCmp>
        </ul>
      )}
    </div>
  );
}
