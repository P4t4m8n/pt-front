import { useState } from "react";
import { TTraineeMetrics } from "../../../../types/trainee.type";
import { metricsService } from "../../../../service/metrics.service";
import { dateUtil } from "../../../../utils/date.util";
import Input from "../../../UI/Form/Input";
import Button from "../../../UI/Button";
import { icons } from "../../../UI/Icons/App.icons";

interface Props {
  metric?: TTraineeMetrics;
  traineeId: string;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setMetrics: React.Dispatch<React.SetStateAction<TTraineeMetrics[]>>;
}
export default function TraineeMetricEdit({
  metric,
  setIsOpen,
  traineeId,
  setMetrics,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const metric = await metricsService.save(formData);
      setMetrics((prev) => {
        const idx = prev.findIndex((m) => m.id === metric?.id);
        if (idx === -1) {
          return [...prev, metric];
        }
        prev[idx] = metric;
        return [...prev];
      });
      if (setIsOpen) setIsOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const formattedDate = dateUtil.formatDateForInput(metric?.date);
  return (
    <div className="w-screen max-w-lg min-w-md bg-black p-4 shadow-border rounded flex h-main-with-gap overflow-auto flex-col gap-4">
      <Button
        styleMode="none"
        styleSize="none"
        className="border rounded-full h-6 w-6"
        onClick={() => setIsOpen!(false)}
      >
        {icons.PlusSvg({ className: "w-full h-full stroke-current rotate-45" })}
      </Button>
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <Input
          type="number"
          placeholder="Heart rate"
          defaultValue={metric?.heartRate || ""}
          name="heartRate"
        />
        <Input
          type="number"
          placeholder="weight"
          defaultValue={metric?.weight || ""}
          name="weight"
        />
        <Input
          type="number"
          placeholder="height"
          defaultValue={metric?.height || ""}
          name="height"
        />
        <Input
          type="number"
          placeholder="age"
          defaultValue={metric?.age || ""}
          name="age"
        />
        <div className="flex gap-1 items-center w-full justify-around">
          <Input
            type="number"
            placeholder="bloodPressureSystole"
            defaultValue={metric?.bloodPressureSystole || ""}
            name="bloodPressureSystole"
          />
          <p className="text-4xl">/</p>
          <Input
            type="number"
            placeholder="bloodPressureDiastole"
            defaultValue={metric?.bloodPressureDiastole || ""}
            name="bloodPressureDiastole"
          />
        </div>
        <Input
          type="date"
          placeholder="date"
          defaultValue={formattedDate}
          name="date"
        />
        <Input
          type="string"
          defaultValue={metric?.id || ""}
          name="id"
          divStyle="hidden"
        />
        <Input
          type="string"
          defaultValue={traineeId || ""}
          name="traineeId"
          divStyle="hidden"
        />
        <Button
          styleMode="none"
          styleSize="none"
          type="submit"
          className="p-2 border rounded"
          disabled={isLoading}
        >
          Save
        </Button>
      </form>
    </div>
  );
}
