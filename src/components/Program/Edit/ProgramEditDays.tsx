//Types
import { DAY_OF_WEEK, TDaysOfWeek } from "../../../types/program.type";
//UI
import Input from "../../UI/Form/Input";
import Label from "../../UI/Form/Label";

interface Props {
  days: TDaysOfWeek[];
  error?: string;
}
export default function ProgramEditDays({ days, error }: Props) {
  console.log("error:", error);
  return (
    <div className="flex flex-col gap-1">
      <h1 className="font-semibold text-sm">Days</h1>
      {error && (
        <Label
          className="ps-1.5 block font-semibold text-xs text-red-500"
          htmlFor={error}
        >
          {error}
        </Label>
      )}
      <ul className="flex flex-wrap gap-2 shadow-border rounded p-2">
        {DAY_OF_WEEK.map((day) => (
          <li key={day}>
            <Label htmlFor={`day-${day}`}>{day}</Label>
            <Input
              type="checkbox"
              name={`days-${day}`}
              id={`day-${day}`}
              value={day}
              defaultChecked={days.includes(day)}
              className=" border-none"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
