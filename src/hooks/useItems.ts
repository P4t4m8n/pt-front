//Core
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
//Utils
import { ClientError } from "../utils/ClientError";
import { showUserMsg } from "../utils/toastEmitter.util";
//Constants
import { ERROR_MESSAGES } from "../constants/errors.const";

interface UseItemsProps<T extends { id?: string }> {
  useQuery: () => {
    isPending: boolean;
    isError: boolean;
    items: T[] | undefined;
    error: Error | null;
  };
  itemAction: {
    actions: (formData: FormData) => Promise<T>;
    queryKey: string;
  };
}
/**
 * Custom hook to manage items with query and item actions.
 *
 * @template T - The type of the item, which extends an object with an optional `id` property.
 * @template DTO - The Data Transfer Object type for server errors.
 *
 * @param {UseItemsProps<T>} props - The properties for the hook, including `useQuery` and `itemAction`.
 * @returns {Object} - An object containing:
 *   - `isPending` (boolean): Indicates if the query is pending.
 *   - `isError` (boolean): Indicates if there was an error with the query.
 *   - `items` (T[]): The list of items returned by the query.
 *   - `error` (any): The error object if the query failed.
 *   - `handleItem` (function): A function to handle item actions, which takes `FormData` as an argument and returns a boolean indicating success or failure.
 *   - `serverErrors` (Record<keyof DTO, string> | null | undefined): The server validation errors, if any.
 */
export const useItems = <T extends { id?: string }, DTO>(
  props: UseItemsProps<T>
): {
  isPending: boolean;
  isError: boolean;
  items: T[] | undefined;
  error: Error | null;
  handleItem: (formData: FormData) => Promise<boolean>;
  serverErrors: Record<keyof DTO, string> | null | undefined;
} => {
  const { useQuery: useQuery, itemAction } = props;
  const { isPending, isError, items, error } = useQuery();
  const queryClient = useQueryClient();
  const [serverErrors, setServerErrors] = useState<
    Record<keyof DTO, string> | null | undefined
  >(null);

  const handleItem = useCallback(
    async (formData: FormData) => {
      const { actions, queryKey } = itemAction;
      try {
        const _item = await actions(formData);
        queryClient.setQueryData([queryKey], (prev: T[]) => {
          const idx = prev.findIndex((item) => item?.id === _item?.id);
          if (idx < 0) return [...prev, _item];
          return prev.map((item) => (item?.id === _item?.id ? _item : item));
        });

        return true;
      } catch (error) {
        if (error instanceof ClientError) {
          setServerErrors(error?.validationErrors?.errors);
          showUserMsg(ERROR_MESSAGES.validation, "warning");
        } else {
          showUserMsg(ERROR_MESSAGES.server, "error");
        }
        return false;
      }
    },
    [itemAction, queryClient]
  );

  return { isPending, isError, items, error, handleItem, serverErrors };
};
