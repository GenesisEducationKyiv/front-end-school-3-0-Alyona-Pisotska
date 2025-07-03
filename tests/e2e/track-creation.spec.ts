import { test, expect } from '@playwright/test';
import { API_ENDPOINTS, APP_ROUTES } from '@/lib/constants/constants';

import type { Track, PaginationMeta } from '@/lib/types/types';

test.describe('Track Creation Flow with Mocked API', () => {
  const timestamp = Date.now();

  const mockNewTrack: Track = {
    id: 'mock-id-123',
    title: `Test-E2E-${timestamp}`,
    slug: `test-e2e-${timestamp}`,
    artist: 'Playwright Artist',
    album: 'E2E Mock Album',
    genres: ['e2e-mock'],
    coverImage: '',
    audioFile: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const mockPaginationMeta: PaginationMeta = {
    page: 1,
    limit: 10,
    total: 1,
    totalPages: 1,
  };

  test('User should be able to create a new track', async ({ page }) => {
    let postCallHappened = false;

    await page.route(`**${API_ENDPOINTS.trackList}**`, async (route, request) => {
      if (request.method() === 'GET') {
        const mockData = postCallHappened ? [mockNewTrack] : [];
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          json: { data: mockData, meta: { ...mockPaginationMeta, total: mockData.length } },
        });

        return;
      }

      if (request.method() === 'POST') {
        postCallHappened = true;
        await route.fulfill({
          status: 201,
          contentType: 'application/json',
          json: mockNewTrack,
        });

        return;
      }

      await route.continue();
    });

    await page.goto(APP_ROUTES.tracks);
    await expect(page.getByTestId('tracks-header')).toBeVisible();
    await page.getByTestId('create-track-button').click();

    const dialog = page.getByTestId('track-form-dialog');
    await expect(dialog).toBeVisible();

    await page.getByTestId('input-title').fill(mockNewTrack.title);
    await page.getByTestId('input-artist').fill(mockNewTrack.artist);
    await page.getByTestId('input-album').fill(mockNewTrack.album ?? '');
    await page.getByTestId('submit-button').click();

    await expect(dialog).not.toBeVisible();

    const newTrackRow = page.getByTestId(`track-item-${mockNewTrack.id}`);
    await expect(newTrackRow).not.toBeVisible();

    await expect(newTrackRow.getByText(mockNewTrack.title)).toBeVisible();
    await expect(newTrackRow.getByText(mockNewTrack.artist)).toBeVisible();
    await expect(newTrackRow.getByText(mockNewTrack.album ?? '')).toBeVisible();
  });
});
