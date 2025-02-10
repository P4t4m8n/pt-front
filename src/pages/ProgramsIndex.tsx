//Core
import { useQueryClient } from "@tanstack/react-query";
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
import { useState } from "react";
import { ValidationError } from "../utils/ValidationError";
import { showUserMsg } from "../utils/toastEmitter.util";
import { ERROR_MESSAGES } from "../constants/errors.const";
import { useUser } from "../hooks/useUser";

export default function ProgramsIndex() {
  const { isPending, isError, programs, error } = useProgramsQuery();
  const queryClient = useQueryClient();
  const [serverErrors, setServerErrors] = useState<
    Record<keyof TProgramDto, string> | null | undefined
  >(null);
  console.log("serverErrors:", serverErrors);
  const { user } = useUser();
  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  const handleItem = async (formData: FormData) => {
    try {
      console.log("formData:");
      const _program = await programService.save(formData);
      queryClient.setQueryData(["user-programs"], (prev: TProgram[]) => {
        const idx = prev.findIndex((item) => item.id === _program.id);
        if (idx < 0) return [...prev, _program];
        prev[idx] = _program;
        return [...prev];
      });

      return true;
    } catch (error) {
      if (error instanceof ValidationError) {
        setServerErrors(error?.validationErrors?.errors);
        showUserMsg(ERROR_MESSAGES.validation, "warning");
      } else {
        showUserMsg(ERROR_MESSAGES.server, "error");
      }
      return false;
    }
  };

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
            <ProgramEditInputs program={{}} traineeId={user?.trainee?.id} />
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
