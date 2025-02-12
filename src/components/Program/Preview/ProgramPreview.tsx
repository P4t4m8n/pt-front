//Types
import { TProgram } from "../../../types/program.type";
//Service
import { dateUtil } from "../../../utils/date.util";
//UI
import { icons } from "../../UI/Icons/App.icons";
import NavLinkCmp from "../../UI/Link";
import Model from "../../UI/Model";
//Components
import EditForm from "../../UI/Form/EditForm";
import ProgramEditInputs from "../Edit/ProgramEditInputs";

interface Props {
  program: TProgram;
  handleItem: (formData: FormData) => Promise<boolean>;
}

export default function ProgramPreview({ program, handleItem }: Props) {
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
            <EditForm handleItem={handleItem}>
              <ProgramEditInputs program={program} />
            </EditForm>
          }
        />
      </span>
    </li>
  );
}
