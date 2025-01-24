import { TProgram } from "../../../../types/program.type";
import { dateUtil } from "../../../../utils/date.util";
import { icons } from "../../../UI/Icons/App.icons";
import NavLinkCmp from "../../../UI/Link";

interface Props {
  program: TProgram;
}

export default function TraineeProgramPreview({ program }: Props) {
  const { id, startDate, endDate, isActive, name } = program;
  const url = `/program/${id}`;

  const dates =
    dateUtil.formatDateForPreview(startDate) +
    " - " +
    dateUtil.formatDateForPreview(endDate);
  return (
    <li className="w-full flex">
      <NavLinkCmp
        styleMode="none"
        styleSize="none"
        to={url}
        className="trainee-details-program-preview w-full "
      >
        <p>{name}</p>
        <span>{dates}</span>
        {isActive ? icons.ActiveSvg({}) : icons.CancelSvg({})}
      </NavLinkCmp>
    </li>
  );
}
