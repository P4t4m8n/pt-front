import { useQuery } from "@tanstack/react-query";

interface TUseSingleItemQueryProps<T extends { id?: string }, DTO> {
  id?: string;
  queryKey: string;
  getById: (id?: string) => Promise<T>;
  getEmpty?: () => DTO;
}
export const useSingleItemQuery = <T extends { id?: string }, DTO>(
  props: TUseSingleItemQueryProps<T, DTO>
) => {
  const { id, queryKey, getById, getEmpty } = props;
  const { isPending, isError, data, error } = useQuery({
    queryKey: [queryKey, id],
    queryFn: () => getById(id),
    select: (data) => data ?? getEmpty?.(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  return { isPending, isError, data, error };
};
