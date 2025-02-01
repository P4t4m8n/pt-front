//Types
import { TTraineeMetrics } from "../../../../../types/trainee.type";
//Utils
import { dateUtil } from "../../../../../utils/date.util";
//UI
import Model from "../../../../UI/Model";
//Components
import TraineeMetricsDetails from "../Details/TraineeMetricsDetails";
import TraineeMetricEdit from "../Edit/TraineeMetricEditIndex";

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
        <Model
          button={{
            content: "View",
            props: {
              className:
                "btn btn-primary p-2 shadow-border rounded bg-secondary-light dark:bg-primary-dark h-fit",
            },
          }}
          model={<TraineeMetricsDetails metric={metric} />}
        />
        <TraineeMetricEdit
          metric={metric}
          traineeId={traineeId}
          setMetrics={setMetrics}
        />
      </span>
    </li>
  );
}
