import TraineeMetricsEditModel from "./TraineeMetricsEditModel";
import TraineeMetricsDetailsModel from "./TraineeMetricsDetailsModel";
import { TTraineeMetrics } from "../../../../types/trainee.type";
import { dateUtil } from "../../../../utils/date.util";

interface Props {
  metric: TTraineeMetrics;
  setMetrics: React.Dispatch<React.SetStateAction<TTraineeMetrics[]>>;
  traineeId: string;
}
export default function TraineeMetricsPreview({
  metric,
  setMetrics,
  traineeId,
}: Props) {
  const date = dateUtil.formatDateForPreview(metric.date);
  return (
    <li className="border p-2 rounded flex justify-between h-8 items-center">
      <p>{date}</p>
      <span className="flex gap-2">
        <TraineeMetricsDetailsModel metric={metric} />
        <TraineeMetricsEditModel
          metric={metric}
          setMetrics={setMetrics}
          traineeId={traineeId}
        />
      </span>
    </li>
  );
}
