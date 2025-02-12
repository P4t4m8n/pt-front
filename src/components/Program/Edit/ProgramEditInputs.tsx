//Types
import { TProgram, TProgramDto } from "../../../types/program.type";
//UI
import Input from "../../UI/Form/Input";
import Label from "../../UI/Form/Label";
//Components
import ProgramEditDates from "./ProgramEditDates";
import ProgramEditDays from "./ProgramEditDays";

interface Props {
  program?: TProgram;
  traineeId?: string;
  serverErrors?: Record<keyof TProgramDto, string> | null;
}
export default function ProgramEditInputs({
  program,
  serverErrors,
  traineeId,
}: Props) {
  const INPUTS = [
    {
      type: "text",
      placeholder: "Name",
      name: "name",
      divStyle: "flex flex-col",
      defaultValue: program?.name,
    },
    {
      type: "text",
      name: "id",
      divStyle: "hidden",
      hidden: true,
      defaultValue: program?.id,
    },
    {
      type: "text",
      name: "traineeId",
      divStyle: "hidden",
      hidden: true,
      defaultValue: traineeId,
    },
  ];
  return (
    <>
      {INPUTS.map((input) => (
        <Input key={input.name} {...input} id={input.name}>
          <Label className="  font-semibold text-sm " htmlFor={input.name}>
            {input.name.charAt(0).toLocaleUpperCase() + input.name.slice(1)}
          </Label>
          <Label
            className="ps-1.5 pb-1  font-semibold text-xs text-red-500"
            htmlFor={input.name}
          >
            {serverErrors?.[input.name as keyof TProgramDto]}
          </Label>
        </Input>
      ))}

      <ProgramEditDays days={program?.days || []} error={serverErrors?.days} />
      <ProgramEditDates
        startDate={program?.startDate as string}
        endDate={program?.endDate as string}
      />
    </>
  );
}
