
import { useModel } from "../../../../hooks/useModel";
import { TTraineeMetrics } from "../../../../types/trainee.type";
import Button from "../../../UI/Button";
import ModelOverlay from "../../../UI/ModelOverlay";
import TraineeMetricEdit from "./TraineeMetricEdit";
import { useRef } from "react";

interface Props {
  metric?: TTraineeMetrics;
  traineeId: string;
  setMetrics: React.Dispatch<React.SetStateAction<TTraineeMetrics[]>>;
}
export default function TraineeMetricsEditModel({
  metric,
  traineeId,
  setMetrics,
}: Props) {
  const modelRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useModel(modelRef);
  const isNew = metric?.id ? "Edit" : "Add";
  return (
    <div>
      <Button
        styleMode="none"
        styleSize="none"
        className="underline"
        onClick={() => setIsOpen(true)}
      >
        {isNew}
      </Button>
      {isOpen && (
        <ModelOverlay>
          <div
            ref={modelRef}
            className="fixed p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black flex flex-col gap-2 rounded "
          >
            <Button
              styleMode="none"
              styleSize="none"
              className="border rounded-full h-6 w-6"
              onClick={() => setIsOpen(false)}
            >
              X
            </Button>
            <TraineeMetricEdit
              metric={metric}
              setIsOpen={setIsOpen}
              traineeId={traineeId}
              setMetrics={setMetrics}
            />
          </div>
        </ModelOverlay>
      )}
    </div>
  );
}
