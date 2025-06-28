import { useValidatedQueryParam, useQueryParams, useCallback } from '@/hooks/hooks';
import { QUERY_PARAM_KEYS, INITIAL_QUERY_PARAMS_VALUE } from '@/lib/constants/constants';

const isValidPage = (pageValue: number): pageValue is number => {
  return pageValue >= INITIAL_QUERY_PARAMS_VALUE.page;
};

const usePageQueryParam = () => {
  const { getIntParam, set } = useQueryParams();

  const page = useValidatedQueryParam({
    option: getIntParam(QUERY_PARAM_KEYS.page),
    validator: isValidPage,
    key: QUERY_PARAM_KEYS.page,
    defaultValue: INITIAL_QUERY_PARAMS_VALUE.page,
  });

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
