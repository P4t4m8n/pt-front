import React, { useRef, useState } from "react";
import ProgramEditDays from "./ProgramEditDays";
import ProgramEditDates from "./ProgramEditDates";
import { TProgram } from "../../../../../types/program.type";
import { useModel } from "../../../../../hooks/useModel";
import { programService } from "../../../../../service/program.service";
import Button from "../../../../UI/Button";
import ModelOverlay from "../../../../UI/ModelOverlay";
import Input from "../../../../UI/Form/Input";

interface Props {
  setPrograms: React.Dispatch<React.SetStateAction<TProgram[]>>;
  program?: TProgram;
  traineeId: string;
  trainerId?: string;
}

export default function TraineeProgramEditModel({
  setPrograms,
  program,
  traineeId,
  trainerId,
}: Props) {
  const modelRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useModel(modelRef);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const program = await programService.save(formData);
      setPrograms((prev) => {
        const idx = prev.findIndex((p) => p?.id === program?.id);
        if (idx > -1) {
          prev[idx] = program;
          return [...prev];
        }
        return [...prev, program];
      });
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button
        styleMode="none"
        styleSize="none"
        className="underline mr-"
        onClick={() => setIsOpen(true)}
      >
        {program ? "Edit" : "Add"}
      </Button>
      {isOpen && (
        <ModelOverlay>
          <form
            className="pt-4 flex flex-col gap-4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black p-4 rounded"
            onSubmit={onSubmit}
          >
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
            <Input
              type="text"
              defaultValue={trainerId}
              name="trainerId"
              divStyle="hidden"
              hidden
            />
            <Input
              type="text"
              defaultValue={traineeId}
              name="traineeId"
              divStyle="hidden"
              hidden
            />
            <ProgramEditDays days={program?.days || []} />
            <ProgramEditDates
              startDate={program?.startDate as string}
              endDate={program?.endDate as string}
            />
            <Button
              styleMode="secondary"
              styleSize="large"
              type="submit"
              className=""
              disabled={isLoading}
            >
              Save
            </Button>
          </form>
        </ModelOverlay>
      )}
    </div>
  );
}
