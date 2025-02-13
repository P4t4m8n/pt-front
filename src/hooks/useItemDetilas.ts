import { useItemQuery } from "./queryHooks/useItemQuery";

interface TUseItemDetailsProps<T extends { id?: string }> {
  id: string;
  queryKey: string;
  getById: (id: string) => Promise<T>;
}
export const useItemDetails = <T extends { id?: string }>(
  props: TUseItemDetailsProps<T>
) => {
  const { isPending, isError, data, error } = useItemQuery(props);
  return;
};
