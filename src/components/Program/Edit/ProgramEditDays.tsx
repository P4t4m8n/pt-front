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
      <ul className="grid md:grid-cols-7 md:grid-rows-1 grid-cols-4 grid-rows-2 gap-2 shadow-border rounded p-2">
        {DAY_OF_WEEK.map((day) => (
          <li key={day} className="">
            <Input
              type="checkbox"
              name={`days-${day}`}
              id={`days-${day}`}
              value={day}
              defaultChecked={days.includes(day)}
              className=" border-none hidden peer"
              hidden={true}
            >
              <Label
                htmlFor={`days-${day}`}
                className="cursor-pointer p-2 rounded-full shadow-border h-12 aspect-square block
              peer-checked:bg-accent-light peer-checked:text-white leading-9.5 text-center
              transition-all duration-200"
              >
         
                 {day.substring(0, 3)}
             
              </Label>
            </Input>
          </li>
        ))}
      </ul>
    </div>
  );
}
