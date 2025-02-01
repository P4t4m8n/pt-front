//Core
import { useState } from "react";
//Types
import { TTraineeMetrics } from "../../../../types/trainee.type";
//Components
import TraineeMetricsLatest from "./TraineeMetricsLatest/TraineeMetricsLatest";
import TraineeMetricsPreview from "./Preview/TraineeMetricsPreview";
import TraineeMetricEdit from "./Edit/TraineeMetricEditIndex";
//UI
import ItemList from "../../../UI/ItemList";

interface Props {
  metricsProps?: TTraineeMetrics[];
  traineeId: string;
}

export default function TraineeMetricsIndex({
  metricsProps,
  traineeId,
}: Props) {
  const [metrics, setMetrics] = useState<TTraineeMetrics[]>(metricsProps || []);

  return (
    <div className="w-full h-full border p-2 rounded borer-white flex flex-col gap-4 ">
      <div className="flex w-full h-48  p-2 gap-2">
        <TraineeMetricsLatest
          metric={metrics?.[0]}
          setMetrics={setMetrics}
          traineeId={traineeId}
        />

        <TraineeMetricEdit setMetrics={setMetrics} traineeId={traineeId} />
      </div>
      <ItemList
        listStyle="flex flex-col gap-1 h-[calc(100%-12rem)] overflow-y-auto"
        items={metrics?.slice(1) || []}
        renderItem={(metric) => (
          <TraineeMetricsPreview
            metric={metric}
            setMetrics={setMetrics}
            traineeId={traineeId}
          />
        )}
      />
    </div>
  );
}
