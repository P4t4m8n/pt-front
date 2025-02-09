//Service
import { dateUtil } from "../../../utils/date.util";
//UI
import Input from "../../UI/Form/Input";
import Label from "../../UI/Form/Label";

interface Props {
  startDate?: string;
  endDate?: string;
}
export default function ProgramEditDates({ startDate, endDate }: Props) {
  const formattedStartDate = dateUtil.formatDateForInput(
    startDate || new Date()
  );

  const formattedEndDate = dateUtil.formatDateForInput(endDate || new Date());
  return (
    <>
      <span>
        <Label htmlFor="startDate">Start Date</Label>
        <Input
          type="date"
          name="startDate"
          id="startDate"
          defaultValue={formattedStartDate}
        />
      </span>
      <span>
        <Label htmlFor="endDate">Edn Date</Label>
        <Input
          type="date"
          name="endDate"
          id="endDate"
          defaultValue={formattedEndDate}
        />
      </span>
    </>
  );
}
