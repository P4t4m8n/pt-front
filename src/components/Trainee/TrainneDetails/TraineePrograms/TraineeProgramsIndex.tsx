import { useState } from "react";
import TraineeProgramPreview from "./TraineeProgramPreview";
import { TProgram } from "../../../../types/program.type";
import { useUser } from "../../../../hooks/useUser";
import ItemList from "../../../UI/ItemList";
import Model from "../../../UI/Model";
import TraineeTableEdit from "../../TraineeTableEdit";
import { programService } from "../../../../service/program.service";
import TraineeProgramEditInputs from "./TraineeProgramEdit/TraineeProgramEditInputs";

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

  const onSave = async (formData: FormData) => {
    try {

      const {} = progrem
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
          <TraineeTableEdit<TProgram>
            setItem={setPrograms}
            save={programService.save}
          >
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
          <TraineeProgramPreview program={programs} setPrograms={setPrograms} />
        )}
      />
    </div>
  );
}
