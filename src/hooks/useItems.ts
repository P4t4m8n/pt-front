//Core
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
//Utils
import { ClientError } from "../utils/ClientError";
import { showUserMsg } from "../utils/toastEmitter.util";
//Constants
import { ERROR_MESSAGES } from "../constants/errors.const";
import { useListItemsQuery } from "./queryHooks/useListItemsQuery";

interface UseItemsProps<T extends { id?: string }> {
  save: (formData: FormData) => Promise<T>;
  get: (params?: URLSearchParams) => Promise<T[]>;
  queryKey: string;
  params?: URLSearchParams;
}
/**
 * Custom hook to manage items with asynchronous operations.
 *
 * @template T - The type of the items, which must have an optional `id` property.
 * @template DTO - The type of the Data Transfer Object for server errors.
 *
 * @param {UseItemsProps<T>} props - The properties required to use the hook.
 * @param {Function} props.get - Function to fetch the items.
 * @param {Function} props.save - Function to save an item.
 * @param {string} props.queryKey - The query key for caching.
 * @param {Object} [props.params] - Optional parameters for fetching items.
 *
 * @returns {Object} The state and handlers for managing items.
 * @returns {boolean} isPending - Indicates if the items are being fetched.
 * @returns {boolean} isError - Indicates if there was an error fetching the items.
 * @returns {T[] | undefined} items - The fetched items.
 * @returns {Error | null} error - The error encountered during fetching, if any.
 * @returns {Function} handleItem - Handler to save an item.
 * @returns {Record<keyof DTO, string> | null | undefined} serverErrors - Server validation errors, if any.
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
  const { get, save, queryKey, params } = props;
  const { isPending, isError, items, error } = useListItemsQuery({
    get,
    queryKey,
    params,
  });
  const queryClient = useQueryClient();
  const [serverErrors, setServerErrors] = useState<
    Record<keyof DTO, string> | null | undefined
  >(null);

  const handleItem = useCallback(
    async (formData: FormData) => {
      try {
        const _item = await save(formData);
        queryClient.setQueryData([queryKey, params], (prev: T[]) => {
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
    [queryClient, queryKey, save]
  );

  return { isPending, isError, items, error, handleItem, serverErrors };
};
