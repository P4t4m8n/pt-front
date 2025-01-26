import { MouseEvent, useEffect, useState } from "react";
import { useParams } from "react-router";

import { TTraining } from "../../../types/training.type";

import { trainingService } from "../../../service/training.service";
import { setService } from "../../../service/set.service";

import Input from "../../UI/Form/Input";
import TextArea from "../../UI/Form/TextArea";
import Button from "../../UI/Button";

import TrainingEditSets from "./TrainingEditSets";

interface Props {
  idProps?: string;
  setTrainings: React.Dispatch<React.SetStateAction<TTraining[] | null>>;
  setIsOpen?: (isOpen: boolean) => void;
}

export default function TrainingEdit({
  idProps,
  setTrainings,
  setIsOpen,
}: Props) {
  const [trainingToEdit, setTrainingToEdit] = useState<TTraining | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    const loadTraining = async (id?: string) => {
      try {
        const trainings = id
          ? await trainingService.getById(id)
          : trainingService.getEmpty();
        setTrainingToEdit(trainings);
      } catch (error) {
        console.error(error);
      }
    };

    const _id = idProps || id;

    loadTraining(_id);
  }, [id, idProps]);

  const onAddSet = (e: MouseEvent) => {
    e.preventDefault();

    const emptySet = setService.getEmpty();
    setTrainingToEdit((prev) => ({
      ...prev!,
      defaultSets: [...prev!.defaultSets, emptySet],
    }));
  };

  const onRemoveSet = (e: MouseEvent, id?: string) => {
    e.preventDefault();
    if (!trainingToEdit?.defaultSets?.length) {
      console.error("No sets to remove");
      return;
    }

    let sets = [];

    if (!id) {
      sets = trainingToEdit.defaultSets.toSpliced(
        trainingToEdit.defaultSets.length - 1
      );
    } else {
      sets = trainingToEdit.defaultSets.filter((set) => set.id !== id);
    }
    setTrainingToEdit((prev) => ({ ...prev!, defaultSets: sets }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsSaving(true);
      const formData = new FormData(e?.currentTarget);
      const training = await trainingService.save(formData);
      setTrainings((prev) => {
        if (!prev) return [training];

        const index = prev.findIndex((t) => t.id === training.id);
        if (index === -1) return [...prev, training];
        const newTrainings = [...prev];
        newTrainings[index] = training;
        return newTrainings;
      });
      if (setIsOpen) setIsOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <form
      onSubmit={onSubmit}
      className="w-screen max-w-lg min-w-md bg-black p-4 shadow-border rounded flex h-main-with-gap overflow-auto flex-col gap-4"
    >
      <Input
        type="text"
        placeholder="Training Name"
        name="name"
        defaultValue={trainingToEdit?.name}
      />
      <Input type="text" name="id" defaultValue={trainingToEdit?.id} hidden />
      <TextArea
        name="description"
        placeholder="Description"
        defaultValue={trainingToEdit?.description}
      />
      <TrainingEditSets
        sets={trainingToEdit?.defaultSets || []}
        onAddSet={onAddSet}
        onRemoveSet={onRemoveSet}
      />
      <Button
        className="w-full p-2 bg-primary-light dark:bg-primary-dark rounded text-text-light dark:text-text-dark font-semibold"
        type="submit"
        disabled={isSaving}
      >
        Save
      </Button>
    </form>
  );
}
