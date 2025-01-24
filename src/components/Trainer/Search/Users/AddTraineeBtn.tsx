import { useState } from "react";
import { useUser } from "../../../../hooks/useUser";
import Button from "../../../UI/Button";
import Input from "../../../UI/Form/Input";
import { traineeService } from "../../../../service/trainee.service";
import { useNavigate } from "react-router";

interface Props {
  userId: string;
}

export default function AddTraineeButton({ userId }: Props) {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const formData = new FormData(e.currentTarget);
      const id = await traineeService.create(formData);
      if (!id) throw new Error("Failed to create trainee");
      navigate(`/trainer/trainee/${id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <Input
        name="userId"
        type="hidden"
        defaultValue={userId}
        className="hidden"
        divStyle="hidden"
      />
      <Input
        name="trainerId"
        type="hidden"
        defaultValue={user?.trainer?.id}
        className="hidden"
        divStyle="hidden"
      />
      <Button
        styleMode="none"
        styleSize="none"
        className="border border-white p-2 rounded"
        disabled={isLoading}
      >
        Add
      </Button>
    </form>
  );
}
