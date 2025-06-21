import { useValidatedQueryParam, useQueryParams, useCallback } from '@/hooks/hooks';
import { O } from '@mobily/ts-belt';
import { QUERY_PARAM_KEYS, INITIAL_QUERY_PARAMS_VALUE } from '@/lib/constants/constants';

const usePageQueryParam = () => {
  const { getIntParam, set } = useQueryParams();

  const rawPage = useValidatedQueryParam({
    option: getIntParam(QUERY_PARAM_KEYS.page),
    validator: (page) => page >= INITIAL_QUERY_PARAMS_VALUE.page,
    key: QUERY_PARAM_KEYS.page,
    defaultValue: INITIAL_QUERY_PARAMS_VALUE.page,
  });

  const page = O.getWithDefault(rawPage, INITIAL_QUERY_PARAMS_VALUE.page);

  const handleChangePage = useCallback(
    (newPage: number) => {
      if (page === newPage) {
        return;
      }

      set(QUERY_PARAM_KEYS.page, newPage);
    },
    [page, set],
  );

  return { page, handleChangePage };
};

export { usePageQueryParam };
