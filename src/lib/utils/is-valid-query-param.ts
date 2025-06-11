import { O, pipe } from '@mobily/ts-belt';

const isValidQueryParam = <T>(option: O.Option<T>, validator: (value: T) => boolean) => {
  return pipe(
    option,
    O.match(
      (value) => validator(value),
      () => false,
    ),
  );
};

export { isValidQueryParam };
