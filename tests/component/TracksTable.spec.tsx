import { test, expect } from '@playwright/experimental-ct-react';
import { TracksTable } from '@/Components/components';
import { API_ENDPOINTS } from '@/lib/constants/constants';

import type { Track, PaginationMeta } from '@/lib/types/types';

const queenTrack = {
  id: '1',
  title: 'Bohemian Rhapsody',
  artist: 'Queen',
  album: 'A Night at the Opera',
  slug: 'bohemian-rhapsody',
  genres: ['Rock'],
  createdAt: '1975-10-31T00:00:00.000Z',
  updatedAt: '1975-10-31T00:00:00.000Z',
};

const nirvanaTrack = {
  id: '2',
  title: 'Smells Like Teen Spirit',
  artist: 'Nirvana',
  album: 'Nevermind',
  slug: 'smells-like-teen-spirit',
  genres: ['Grunge', 'Rock'],
  createdAt: '1991-09-10T00:00:00.000Z',
  updatedAt: '1991-09-10T00:00:00.000Z',
};

const mockTracksSortedByTitle: Track[] = [{ ...queenTrack }, { ...nirvanaTrack }];

const mockTracksSortedByArtist: Track[] = [{ ...nirvanaTrack }, { ...queenTrack }];

const mockPaginationMeta: PaginationMeta = {
  page: 1,
  limit: 10,
  total: 2,
  totalPages: 1,
};

const getTrackRowId = (track: Track) => `track-item-${track.id}`;

test.describe('Component: TracksTable Sorting', () => {
  test('should re-fetch and display tracks in a new order when a sortable column is clicked', async ({
    mount,
    page,
  }) => {
    await page.route(`**${API_ENDPOINTS.trackList}**`, async (route, request) => {
      const url = new URL(request.url());
      const sortBy = url.searchParams.get('sort');
      console.log('sortBy', sortBy);

      if (sortBy === 'title') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          json: { data: mockTracksSortedByTitle, meta: mockPaginationMeta },
        });

        return;
      }

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        json: { data: mockTracksSortedByArtist, meta: mockPaginationMeta },
      });

      return;
    });

    const component = await mount(<TracksTable />);

    await expect(component.getByTestId('tracks-table')).toBeVisible();

    const firstRowByArtist = component.locator('[data-row-track]').nth(0);
    const secondRowByArtist = component.locator('[data-row-track]').nth(1);
    await expect(firstRowByArtist).toHaveAttribute('data-testid', getTrackRowId(mockTracksSortedByArtist[0]));
    await expect(secondRowByArtist).toHaveAttribute('data-testid', getTrackRowId(mockTracksSortedByArtist[1]));

    await component.getByTestId('sort-select-title').click();

    const firstRowByTitle = component.locator('[data-row-track]').nth(0);
    const secondRowByTitle = component.locator('[data-row-track]').nth(1);
    await expect(firstRowByTitle).toHaveAttribute('data-testid', getTrackRowId(mockTracksSortedByTitle[0]));
    await expect(secondRowByTitle).toHaveAttribute('data-testid', getTrackRowId(mockTracksSortedByTitle[1]));
  });
});
