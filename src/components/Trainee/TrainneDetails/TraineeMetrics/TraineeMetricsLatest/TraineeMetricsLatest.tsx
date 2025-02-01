//Types
import { TTraineeMetrics } from "../../../../../types/trainee.type";
//UI
import Model from "../../../../UI/Model";
//Components
import TraineeMetricsDetails from "../Details/TraineeMetricsDetails";
import TraineeMetricEdit from "../Edit/TraineeMetricEditIndex";

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
        <Model
          button={{
            content: "Edit",
            props: {
              className:
                "btn btn-primary p-2 shadow-border rounded bg-secondary-light dark:bg-primary-dark h-fit",
            },
          }}
          model={
            <TraineeMetricEdit
              metric={metric}
              traineeId={traineeId}
              setMetrics={setMetrics}
            />
          }
        />
      </header>
      <TraineeMetricsDetails metric={metric} />
    </div>
  ) : (
    <div>No metrics</div>
  );
}
