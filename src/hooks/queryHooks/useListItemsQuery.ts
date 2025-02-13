import { useQuery } from "@tanstack/react-query";

interface IUseListItemsQueryPros<T> {
  get: (params?: URLSearchParams) => Promise<T[]>;
  queryKey: string;
  params?: URLSearchParams;
}
export const useListItemsQuery = <T>(props: IUseListItemsQueryPros<T>) => {
  const { get, queryKey, params } = props;
  const { isPending, isError, data, error } = useQuery({
    queryKey: [queryKey, params],
    queryFn: () => get(params),

    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  return { isPending, isError, items: data, error };
};
