//Core
import { useState } from "react";
//Types
import { TProgram } from "../../../types/program.type";
//Services
import { programService } from "../../../service/program.service";
//Hooks
import { useUser } from "../../../hooks/useUser";
//UI
import ItemList from "../../UI/ItemList";
import Model from "../../UI/Model";
//Components
import TraineeTableEdit from "../TraineeTableEdit";
import TraineeProgramPreview from "../../Program/Preview/ProgramPreview";
import TraineeProgramEditInputs from "../../Program/Edit/ProgramEditInputs";

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

  const handleItem = async (formData: FormData) => {
    try {
      const _program = await programService.save(formData);
      setPrograms((prev) => {
        const idx = prev.findIndex((item) => item.id === _program.id);
        if (idx < 0) return [...prev, _program];
        prev[idx] = _program;
        return [...prev];
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-full border p-2 rounded borer-white flex flex-col gap-4 ">
      <Model
        button={{
          content: "New",
          props: {
            className:
              "btn btn-primary p-2 shadow-border rounded bg-secondary-light dark:bg-primary-dark h-fit",
          },
        }}
        model={
          <TraineeTableEdit handleItem={handleItem}>
            <TraineeProgramEditInputs
              trainerId={trainerId}
              traineeId={traineeId}
              program={{}}
            />
          </TraineeTableEdit>
        }
      />
      <ItemList
        listStyle="grid gap-2"
        items={programs!}
        renderItem={(programs) => (
          <TraineeProgramPreview program={programs} handleItem={handleItem} />
        )}
      />
    </div>
  );
}
