//Types
import { TTraineeMetrics } from "../../../../../types/trainee.type";
//Utils
import { dateUtil } from "../../../../../utils/date.util";

interface Props {
  metric: TTraineeMetrics;
  modelRef?: React.RefObject<HTMLUListElement>;
}
export default function TraineeMetricsDetails({ metric, modelRef }: Props) {
  const {
    heartRate,
    height,
    weight,
    age,
    bloodPressureDiastole,
    bloodPressureSystole,
    date,
  } = metric;
  const fixedDate = dateUtil.formatDateForPreview(date);

  const style = modelRef ? "bg-black p-4 px-8 rounded grid gap-4" : "";

  return (
    <ul ref={modelRef} className={style}>
      <ListItem label="Weight:" value={weight} />
      <ListItem label="Height:" value={height} />
      <ListItem label="Heart Rate:" value={heartRate} />
      <ListItem label="Age:" value={age} />
      <ListItem
        label="Blood Pressure:"
        value={`${bloodPressureSystole}/${bloodPressureDiastole}`}
      />
      <ListItem label="Date:" value={fixedDate} />
    </ul>
  );
}

const ListItem = ({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) => (
  <li className="flex gap-1">
    <span>{label}</span>
    <span className="font-semibold">{value}</span>
  </li>
);
