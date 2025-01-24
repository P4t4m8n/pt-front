
import { TProgram } from "../../../../types/program.type";
import ItemList from "../../../UI/ItemList";
import TraineeProgramPreview from "./TraineeProgramPreview";

interface Props {
  programs: TProgram[] | null;
}

export default function TraineeProgramsList({ programs }: Props) {
  //TODO handle programs null/undefined
  return (
    <ItemList
      listStyle=""
      items={programs!}
      renderItem={(programs) => <TraineeProgramPreview program={programs} />}
    />
  );
}
