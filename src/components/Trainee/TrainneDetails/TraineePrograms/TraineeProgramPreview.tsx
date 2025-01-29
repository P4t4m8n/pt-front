import { programService } from "../../../../service/program.service";
import { TProgram } from "../../../../types/program.type";
import { dateUtil } from "../../../../utils/date.util";
import { icons } from "../../../UI/Icons/App.icons";
import NavLinkCmp from "../../../UI/Link";
import Model from "../../../UI/Model";
import TraineeTableEdit from "../../TraineeTableEdit";
import TraineeProgramEditInputs from "./TraineeProgramEdit/TraineeProgramEditInputs";

interface Props {
  program: TProgram;
  setPrograms: React.Dispatch<React.SetStateAction<TProgram[]>>;
}

export default function TraineeProgramPreview({ program, setPrograms }: Props) {
  const { id, startDate, endDate, isActive, name } = program;
  const url = `/program/${id}`;

  const dates =
    dateUtil.formatDateForPreview(startDate) +
    " - " +
    dateUtil.formatDateForPreview(endDate);
  return (
    <li className="border p-2 rounded flex justify-between h-12 items-center">
      <p>{name}</p>
      <p>{dates}</p>
      {isActive ? icons.ActiveSvg({}) : icons.CancelSvg({})}
      <span className="flex gap-2">
        <NavLinkCmp
          to={url}
          className="btn btn-primary p-2 shadow-border rounded bg-secondary-light dark:bg-primary-dark h-fit"
        >
          View
        </NavLinkCmp>
        <Model
          button={{
            content: "Edit",
            props: {
              className:
                "btn btn-primary p-2 shadow-border rounded bg-secondary-light dark:bg-primary-dark h-fit",
            },
          }}
          model={
            <TraineeTableEdit<TProgram>
              setItem={setPrograms}
              save={programService.save}
            >
              <TraineeProgramEditInputs
                trainerId={program.trainer?.id}
                traineeId={program?.trainee?.id}
                program={program}
              />
            </TraineeTableEdit>
          }
        />
      </span>
    </li>
  );
}
