import TraineeMetricsEditModel from "../TraineeMetricsEditModel";
import TraineeMetricsDetails from "../TraineeMetricsDetails";
import { TTraineeMetrics } from "../../../../../types/trainee.type";

interface Props {
  metric?: TTraineeMetrics;
  setMetrics: React.Dispatch<React.SetStateAction<TTraineeMetrics[]>>;
  traineeId: string;
}
export default function TraineeMetricsLatest({
  metric,
  setMetrics,
  traineeId,
}: Props) {
  return metric ? (
    <div className="w-1/2 h-full border-r  px-2">
      <header className="flex justify-between">
        <h2 className="text-2xl font-semibold underline">Latest</h2>
        <TraineeMetricsEditModel
          metric={metric}
          setMetrics={setMetrics}
          traineeId={traineeId}
        />
      </header>
      <TraineeMetricsDetails metric={metric} />
    </div>
  ) : (
    <div>No metrics</div>
  );
}
