import NavLinks from "../UI/NavLinks";

export default function TrainerNav() {
  return (
    <NavLinks
      navStyle="flex w-full justify-center gap-8 h-12 items-center text-sm font-semibold mb-4"
      itemStyle="px-2 border  items-center flex h-full rounded  bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark hover:bg-secondary-dark dark:hover:bg-secondary-light hover:text-text-dark dark:hover:text-text-light"
      navLinks={NAV_LINKS}
    />
  );
}
const NAV_LINKS = [
  {
    to: "/trainer/trainees",
    text: "Trainees",
  },
  {
    to: "training",
    text: "training",
  },
  {
    to: "trainees/create",
    text: "Create Trainee",
  },
  {
    to: "/trainer/search",
    text: "Search",
  },
];
