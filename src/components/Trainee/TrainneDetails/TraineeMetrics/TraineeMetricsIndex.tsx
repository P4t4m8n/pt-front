import { useState } from "react";

import { TTraineeMetrics } from "../../../../types/trainee.type";

import TraineeMetricsLatest from "./TraineeMetricsLatest/TraineeMetricsLatest";
import TraineeMetricsPreview from "./TraineeMetricsPreview";
import TraineeMetricEdit from "./TraineeMetricEdit";

import ItemList from "../../../UI/ItemList";
import Model from "../../../UI/Model";

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
        <Model
          button={{
            content: "New",
            props: {
              className:
                "btn btn-primary p-2 shadow-border rounded bg-secondary-light dark:bg-primary-dark h-fit",
            },
          }}
          model={
            <TraineeMetricEdit traineeId={traineeId} setMetrics={setMetrics} />
          }
        />
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
