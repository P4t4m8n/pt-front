//Types
import { TProgram, TProgramDto } from "../types/program.type";
//Services
import { programService } from "../service/program.service";
//Hooks
import { useItems } from "../hooks/useItems";
//UI
import ItemList from "../components/UI/ItemList";
//Components
import ProgramPreview from "../components/Program/Preview/ProgramPreview";
import ProgramEditModel from "../components/Program/Edit/ProgramEditModel";
import { useLocation } from "react-router";

export default function ProgramsIndex() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const {
    isPending,
    isError,
    items: programs,
    error,
    handleItem,
    serverErrors,
  } = useItems<TProgram, TProgramDto>({
    get: programService.getByUser,
    save: programService.save,
    queryKey: "programs",
    params,
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className="p-2 flex flex-col gap-4 ">
      <h2 className="text-3xl">Programs</h2>
      <ProgramEditModel handleItem={handleItem} serverErrors={serverErrors} />
      <div>
        <ItemList
          listStyle="grid gap-2"
          items={programs || []}
          renderItem={(program) => (
            <ProgramPreview
              program={program}
              handleItem={handleItem}
              serverErrors={serverErrors}
            />
          )}
        />
      </div>
    </div>
  );
}
