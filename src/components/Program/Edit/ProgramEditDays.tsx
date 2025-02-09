//Types
import { DAY_OF_WEEK, TDaysOfWeek } from "../../../types/program.type";
//UI
import Input from "../../UI/Form/Input";
import Label from "../../UI/Form/Label";

interface Props {
  days: TDaysOfWeek[];
}
export default function ProgramEditDays({ days }: Props) {
  return (
    <ul className="flex flex-wrap gap-2 border rounded p-2">
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
  );
}
