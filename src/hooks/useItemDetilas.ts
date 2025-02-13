import { useSingleItemQuery } from "./queryHooks/useSingleItemQuery";

interface TUseItemDetailsProps<T extends { id?: string }, DTO> {
  id: string;
  queryKey: string;
  getById: (id?: string) => Promise<T>;
  getEmpty?: () => DTO;
}
export const useItemDetails = <T extends { id?: string }, DTO>(
  props: TUseItemDetailsProps<T, DTO>
) => {
  const { isPending, isError, data, error } = useSingleItemQuery<T, DTO>(props);
  return { isPending, isError, data, error };
};
