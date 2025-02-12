//Types
import { TProgram, TProgramDto } from "../types/program.type";
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
import { useItems } from "../hooks/useItems";

export default function ProgramsIndex() {
  const {
    isPending,
    isError,
    items: programs,
    error,
    handleItem,
    serverErrors,
  } = useItems<TProgram, TProgramDto>({
    useQuery: useProgramsQuery,
    itemAction: { actions: programService.save, queryKey: "user-programs" },
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className="p-2 flex flex-col gap-4 ">
      <h2 className="text-3xl">Programs</h2>
      <Model
        button={{
          content: "New",
          props: {
            className:
              "btn btn-primary p-2 shadow-border rounded bg-secondary-light dark:bg-primary-dark h-fit w-12",
          },
        }}
        model={
          <EditForm handleItem={handleItem}>
            <ProgramEditInputs
              program={{}}
              serverErrors={serverErrors}
            />
          </EditForm>
        }
      />
      <div>
        <ItemList
          listStyle="grid gap-2"
          items={programs!}
          renderItem={(programs) => (
            <ProgramPreview program={programs} handleItem={handleItem} />
          )}
        />
      </div>
    </div>
  );
}
