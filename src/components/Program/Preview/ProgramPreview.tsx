//Types
import { TProgram, TProgramDto } from "../../../types/program.type";
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
  serverErrors?: Record<keyof TProgramDto, string> | null;
}
//TODO find a better and more efficient way to handle the server errors.
//At the moment errors are being pass to all children and only the open model renders them

export default function ProgramPreview({
  program,
  handleItem,
  serverErrors,
}: Props) {
  const { id, startDate, endDate, isActive, name } = program;
  const url = `/programs/${id}`;

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
              <ProgramEditInputs
                program={program}
                serverErrors={serverErrors}
              />
            </EditForm>
          }
        />
      </span>
    </li>
  );
}
