
import { useRef } from "react";
import TraineeMetricsDetails from "./TraineeMetricsDetails";
import { TTraineeMetrics } from "../../../../types/trainee.type";
import { useModel } from "../../../../hooks/useModel";
import Button from "../../../UI/Button";
import ModelOverlay from "../../../UI/ModelOverlay";

interface Props {
  metric: TTraineeMetrics;
}
export default function TraineeMetricsDetailsModel({ metric }: Props) {
  const modelRef = useRef<HTMLUListElement>(null);
  const [isOpen, setIsOpen] = useModel(modelRef);
  return (
    <div>
      <Button
        styleMode="none"
        styleSize="none"
        className="underline"
        onClick={() => setIsOpen(true)}
      >
        View
      </Button>
      {isOpen && (
        <ModelOverlay>
          <TraineeMetricsDetails metric={metric!} modelRef={modelRef} />
        </ModelOverlay>
      )}
    </div>
  );
}
