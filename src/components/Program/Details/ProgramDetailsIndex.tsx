import { useParams } from "react-router";
import { useSingleItemQuery } from "../../../hooks/queryHooks/useSingleItemQuery";
import { TProgram, TProgramDto } from "../../../types/program.type";
import { programService } from "../../../service/program.service";

export default function ProgramDetailsIndex() {
  const { id } = useParams<{ id: string }>();
  const {
    isPending,
    isError,
    data: program,
    error,
  } = useSingleItemQuery<TProgram, TProgramDto>({
    id,
    queryKey: "program-details",
    getById: programService.getById,
  });
  console.log("program:", program);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return <div>ProgramDetailsIndex</div>;
}
