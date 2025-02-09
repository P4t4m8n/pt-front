//Types
import { TProgram } from "../../../types/program.type";
//UI
import Input from "../../UI/Form/Input";
//Components
import ProgramEditDates from "./ProgramEditDates";
import ProgramEditDays from "./ProgramEditDays";

interface Props {
  program?: TProgram;
}
export default function ProgramEditInputs({ program }: Props) {
  return (
    <>
      <Input
        type="text"
        placeholder="Name"
        defaultValue={program?.name}
        name="name"
        divStyle="h-10"
      />
      <Input
        type="text"
        defaultValue={program?.id}
        name="id"
        divStyle="hidden"
        hidden
      />

      <ProgramEditDays days={program?.days || []} />
      <ProgramEditDates
        startDate={program?.startDate as string}
        endDate={program?.endDate as string}
      />
    </>
  );
}
