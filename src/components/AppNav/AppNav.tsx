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
    text: "Programs",
    to: "/programs",
    icon: icons.TraineeSvg(),
  },
  {
    text: "Trainings",
    to: "/trainings",
    icon: icons.ProfileSvg(),
  },
  {
    text: "Metrics",
    to: "/metrics",
    icon: icons.TrainerSvg(),
  },
];
