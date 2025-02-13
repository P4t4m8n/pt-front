import { useQuery } from "@tanstack/react-query";

interface TUseItemQueryProps<T extends { id?: string }> {
  id?: string;
  queryKey: string;
  getById: (id?: string) => Promise<T>;
}
export const useItemQuery = <T extends { id?: string }>(
  props: TUseItemQueryProps<T>
) => {
  const { id, queryKey, getById } = props;
  const { isPending, isError, data, error } = useQuery({
    queryKey: [queryKey, id],
    queryFn: () => getById(id),

    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  return { isPending, isError, data, error };
};
