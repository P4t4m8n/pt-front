import { useParams } from "react-router";
import { useItemQuery } from "../../../hooks/queryHooks/useItemQuery";
import { TProgram } from "../../../types/program.type";
import { programService } from "../../../service/program.service";

export default function ProgramDetailsIndex() {
  const { id } = useParams<{ id: string }>();
  const {
    isPending,
    isError,
    data: program,
    error,
  } = useItemQuery<TProgram>({
    id,
    queryKey: "program-details",
    getById: programService.getById,
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;
  console.log("program:", program);

  return <div>ProgramDetailsIndex</div>;
}
