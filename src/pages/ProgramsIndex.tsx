//Core
import { useQueryClient } from "@tanstack/react-query";
//Types
import { TProgram } from "../types/program.type";
//Services
import { programService } from "../service/program.service";
//Hooks
import { useProgramsQuery } from "../hooks/queryHooks/useProgramsQuery";
//UI
import Model from "../components/UI/Model";
import EditForm from "../components/UI/Form/EditForm";
import ItemList from "../components/UI/ItemList";
//Components
import ProgramEditInputs from "../components/Program/Edit/ProgramEditInputs";
import ProgramPreview from "../components/Program/Preview/ProgramPreview";

export default function ProgramsIndex() {
  const { isPending, isError, programs, error } = useProgramsQuery();
  const queryClient = useQueryClient();

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  const handleItem = async (formData: FormData) => {
    try {
      const _program = await programService.save(formData);
      queryClient.setQueryData(["user-programs"], (prev: TProgram[]) => {
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
          <EditForm handleItem={handleItem}>
            <ProgramEditInputs program={{}} />
          </EditForm>
        }
      />
      <ItemList
        listStyle="grid gap-2"
        items={programs!}
        renderItem={(programs) => (
          <ProgramPreview program={programs} handleItem={handleItem} />
        )}
      />
    </div>
  );
}
