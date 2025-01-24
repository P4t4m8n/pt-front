import { icons } from "../UI/Icons/App.icons";
import NavLinks from "../UI/NavLinks";

export default function AppNav() {
  return (
    <NavLinks
      navStyle=" flex w-full justify-between py-2 px-6 h-16 border-t"
      itemStyle="w-6 flex flex-col items-center justify-between "
      navLinks={NAV_LINKS}
    />
  );
}

const NAV_LINKS: { to: string; icon: JSX.Element; text: string }[] = [
  {
    text: "Home",
    to: "/",
    icon: icons.HomeSvg(),
  },
  {
    text: "Trainee",
    to: "/trainee",
    icon: icons.TraineeSvg(),
  },
  {
    text: "Profile",
    to: "/profile",
    icon: icons.ProfileSvg(),
  },
  {
    text: "Trainer",
    to: "/trainer",
    icon: icons.TrainerSvg(),
  },
];
