import { Outlet } from "react-router";
import TrainerNav from "../components/Trainer/TrainerNav";

export default function TrainerIndex() {
  return (
    <div className="w-full h-full">
      <TrainerNav />
      <Outlet />
    </div>
  );
}
