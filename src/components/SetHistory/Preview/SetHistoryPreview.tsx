import { TSetHistory } from "../../../types/set.type";
import { dateUtil } from "../../../utils/date.util";
import Button from "../../UI/Button";

interface Props {
  setHistory: TSetHistory;
  setSetsToEdit: React.Dispatch<React.SetStateAction<TSetHistory | null>>;
}
export default function SetHistoryPreview({
  setHistory,
  setSetsToEdit,
}: Props) {
  const formatDate = dateUtil.formatDateForPreview(setHistory.date);
  return (
    <li className=" flex items-center justify-between border p-2 rounded my-2">
      <p>{formatDate}</p>
      <Button type="button" onClick={() => setSetsToEdit(setHistory)} className="rounded p-2 border">
        Edit
      </Button>
    </li>
  );
}
