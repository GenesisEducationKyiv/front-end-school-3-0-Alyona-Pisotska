import { O, pipe } from '@mobily/ts-belt';

const getValidatedOrDefaultQueryParam = <T, U extends NonNullable<T>>(
  option: O.Option<T>,
  validator: (value: T) => value is U,
  fallback: U,
) => {
  return pipe(
    option,
    O.flatMap((value) => (validator(value) ? O.Some(value) : O.None)),
    O.getWithDefault(fallback),
  );
};

export { getValidatedOrDefaultQueryParam };
