import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { Result } from 'neverthrow';

type UseAppMutationOptions<TData, TError, TVariables> = {
  mutationFn: (variables: TVariables) => Promise<Result<TData, TError>>;
  successMessage: string;
  errorMessage?: string;
  invalidateQueryKey?: string[];
  onSuccessCallback?: (data: TData) => void;
  onErrorCallback?: (error: TError) => void;
};

const useAppMutation = <TData = unknown, TError = Error, TVariables = void>(
  options: UseAppMutationOptions<TData, TError, TVariables>,
) => {
  const queryClient = useQueryClient();
  const { mutationFn, successMessage, errorMessage, invalidateQueryKey, onSuccessCallback, onErrorCallback } = options;

  return useMutation<TData, TError, TVariables>({
    mutationFn: async (payload: TVariables) => {
      const result = await mutationFn(payload);
      if (result.isErr()) {
        throw result.error;
      }

      return result.value;
    },
    onSuccess: (data) => {
      toast.success(successMessage);
      if (invalidateQueryKey) {
        queryClient.invalidateQueries({ queryKey: invalidateQueryKey }).catch((error: unknown) => {
          const err = error instanceof Error ? error : new Error('Unknown error');
          toast.error(`Failed to refresh data: ${err.message}`);
        });
      }
      onSuccessCallback?.(data);
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : 'Something went wrong';
      toast.error(errorMessage || `Error! ${message}`);
      onErrorCallback?.(error);
    },
  });
};

export { useAppMutation };
