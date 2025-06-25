import { describe, expect, test } from 'vitest';
import { O } from '@mobily/ts-belt';
import { getValidatedOrDefaultQueryParam } from './get-validated-or-default-query-param';
import { TRACK_LIST_SORT_BY } from '@/lib/constants/constants';

import type { TrackListSort } from '@/lib/types/track-list-sort.type';

describe('getValidatedOrDefaultQueryParam', () => {
  describe('with a simple numeric validator', () => {
    const isPositiveNumber = (value: unknown): value is number => {
      return typeof value === 'number' && value > 0;
    };
    const fallbackNumber = 1;

    test.each([
      { description: 'a valid positive number', option: O.Some(123), expected: 123 },
      { description: 'an invalid negative number', option: O.Some(-5), expected: fallbackNumber },
      { description: 'a value of a different type', option: O.Some('not-a-number'), expected: fallbackNumber },
      { description: 'a None option', option: O.None, expected: fallbackNumber },
    ])('should return $expected for $description', ({ option, expected }) => {
      const result = getValidatedOrDefaultQueryParam<unknown, number>(option, isPositiveNumber, fallbackNumber);

      expect(result).toBe(expected);
    });
  });

  describe('with a type guard for "sortBy" field', () => {
    const SORTABLE_COLUMNS = TRACK_LIST_SORT_BY as TrackListSort[];
    const defaultSortBy: TrackListSort = 'title';

    const isSortByField = (value: unknown): value is TrackListSort => {
      return typeof value === 'string' && SORTABLE_COLUMNS.includes(value as TrackListSort);
    };

    test.each([
      { description: "a valid field ('artist')", option: O.Some('artist'), expected: 'artist' },
      { description: "another valid field ('album')", option: O.Some('album'), expected: 'album' },
      { description: "an invalid string ('year')", option: O.Some('year'), expected: defaultSortBy },
      { description: 'an empty string', option: O.Some(''), expected: defaultSortBy },
      { description: 'a value with the wrong type (a number)', option: O.Some(2025), expected: defaultSortBy },
      { description: 'a None option (missing param)', option: O.None, expected: defaultSortBy },
    ])('should return "$expected" for $description', ({ option, expected }) => {
      const result = getValidatedOrDefaultQueryParam<unknown, TrackListSort>(option, isSortByField, defaultSortBy);

      expect(result).toBe(expected);
    });
  });
});
