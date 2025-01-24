import { useState } from "react";
import TraineeProgramEditModel from "./TraineeProgramEdit/TraineeProgramEditModel";
import TraineeProgramPreview from "./TraineeProgramPreview";
import { TProgram } from "../../../../types/program.type";
import { useUser } from "../../../../hooks/useUser";
import ItemList from "../../../UI/ItemList";

interface Props {
  programsProps: TProgram[];
  traineeId: string;
}
export default function TraineeProgramsIndex({
  programsProps,
  traineeId,
}: Props) {
  const [programs, setPrograms] = useState(programsProps);
  const { user } = useUser();

  const trainerId = user?.trainer?.id;
  return (
    <div className="w-full h-full border p-2 rounded borer-white flex flex-col gap-4 ">
      <TraineeProgramEditModel
        setPrograms={setPrograms}
        traineeId={traineeId}
        trainerId={trainerId}
      />
      <ItemList
        listStyle="grid gap-2"
        items={programs!}
        renderItem={(programs) => <TraineeProgramPreview program={programs} />}
      />
    </div>
  );
}
