import { TreadMillSvg } from "../UI/Icons/Training.icons";
import UserMenuIndex from "../User/UserMenu/UserMenuIndex";

export default function Header() {
  return (
    <header className="h-16 p-4  w-full flex justify-between items-center border-b">
      <TreadMillSvg className="h-full aspect-square stroke-text-light dark:stroke-text-dark fill-text-light dark:fill-text-dark" />
      <UserMenuIndex />
    </header>
  );
}
