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
  //User is undefined when the query is still loading prevent the component from rendering
  if (user === undefined) return;
  //If user is null then the user is not authenticated
  if (!user) {
    return (
      <NavLinkCmp
        styleMode="none"
        styleSize="none"
        className="border p-2 rounded-sm flex items-center justify-center "
        to="/auth"
      >
        Sign-In
      </NavLinkCmp>
    );
  }
  return (
    <div ref={modelRef} className="relative h-12 aspect-square">
      <Button
        styleMode="none"
        styleSize="none"
        className=" fill-white w-full h-full"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {user?.imgUrl ? (
          <Image
            srcProp={user?.imgUrl}
            alt="User avatar"
            styleSize="responsive"
            styleMode="avatar"
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
