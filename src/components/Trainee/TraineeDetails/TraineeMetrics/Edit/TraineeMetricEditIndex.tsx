//Types
import { TTraineeMetrics } from "../../../../../types/trainee.type";

//Services, Utils
import { metricsService } from "../../../../../service/metrics.service";
import { dateUtil } from "../../../../../utils/date.util";

//UI
import Model from "../../../../UI/Model";
import TraineeTableEdit from "../../../TraineeTableEdit";
import TraineeMetricEditInputs from "./TraineeMetricEditInputs";

interface Props {
  metric?: TTraineeMetrics;
  traineeId: string;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setMetrics: React.Dispatch<React.SetStateAction<TTraineeMetrics[]>>;
}
export default function TraineeMetricEdit({
  metric,
  traineeId,
  setMetrics,
}: Props) {
  const handleItem = async (formData: FormData): Promise<void> => {
    try {
      const metric = await metricsService.save(formData);
      setMetrics((prev) => {
        const idx = prev.findIndex((m) => m.id === metric?.id);
        if (idx === -1) {
          //Sort by date in case of new metric
          // TODO - improve later
          return [...prev, metric].sort(
            (a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime()
          );
        }
        prev[idx] = metric;
        return [...prev];
      });
    } catch (error) {
      console.error(error);
    }
  };
  const formattedDate = dateUtil.formatDateForInput(metric?.date);
  const isNew = metric?.id === undefined;

  return (
    <div className="">
      <Model
        button={{
          content: isNew ? "Add" : "Edit",
          props: {
            className:
              "btn btn-primary p-2 shadow-border rounded bg-secondary-light dark:bg-primary-dark h-fit",
          },
        }}
        model={
          <TraineeTableEdit handleItem={handleItem}>
            <TraineeMetricEditInputs
              metric={metric}
              formattedDate={formattedDate}
              traineeId={traineeId}
            />
          </TraineeTableEdit>
        }
      />
    </div>
  );
}
