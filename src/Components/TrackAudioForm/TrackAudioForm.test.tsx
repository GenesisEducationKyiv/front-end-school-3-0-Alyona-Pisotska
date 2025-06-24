import { useForm, useUploadAudioTrack, useDeleteAudioFile, useTrackContext } from '@/hooks/hooks';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { toast } from 'sonner';
import { TrackAudioForm } from './TrackAudioForm';

import type { AudioData, Track } from '@/lib/types/types';

vi.mock('@/hooks/hooks', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/hooks/hooks')>();
  return {
    ...actual,
    useForm: vi.fn(),
    useUploadAudioTrack: vi.fn(() => ({
      uploadAudioTrack: vi.fn(),
    })),
    useDeleteAudioFile: vi.fn(() => ({
      deleteAudioFile: vi.fn(),
    })),
    useTrackContext: vi.fn(() => ({
      handleAddAudioTrack: vi.fn(),
      handleDeleteAudioTrack: vi.fn(),
    })),
  };
});

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}));

vi.mock('@/Components/components', () => ({
  Button: vi.fn(({ children, ...props }) => <button {...props}>{children}</button>),
  Form: vi.fn(({ children }) => <>{children}</>),
}));

vi.mock('./components/components', () => ({
  TrackAudioField: vi.fn(() => <input data-testid='audio-file-input' type='file' />),
}));

const mockTrackData = {
  id: 'track-1',
  title: 'Test Track',
  artist: 'Test Artist',
  genres: ['pop'],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  album: 'Test Album',
  coverImage: 'test-image.png',
} as Track;

describe('TrackAudioForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockUseForm = ({
    handleSubmit = vi.fn((cb: (data: AudioData) => void) => (e?: React.SyntheticEvent) => {
      e?.preventDefault();
      cb({ audioFile: null });
    }),
    control = {},
    watch = vi.fn(),
  } = {}) => {
    (useForm as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      handleSubmit,
      control,
      watch,
    });
  };

  test('Save button should be disabled when no initial file and no new file selected', () => {
    mockUseForm({ watch: vi.fn(() => null) });
    render(<TrackAudioForm onFormSubmission={vi.fn()} trackData={{ ...mockTrackData }} />);

    expect(screen.getByTestId('save-submit-audio-button')).toBeDisabled();
  });

  test('Save button should be enabled when no initial file and a new file is selected', () => {
    mockUseForm({ watch: vi.fn(() => new File(['audio'], 'new-audio.mp3', { type: 'audio/mpeg' })) });
    render(<TrackAudioForm onFormSubmission={vi.fn()} trackData={{ ...mockTrackData }} />);

    expect(screen.getByTestId('save-submit-audio-button')).toBeEnabled();
  });

  test('Save button should be enabled when an initial file exists and it is removed (watchedFile is null)', () => {
    mockUseForm({ watch: vi.fn(() => null) });
    render(
      <TrackAudioForm onFormSubmission={vi.fn()} trackData={{ ...mockTrackData, audioFile: 'existing-audio.mp3' }} />,
    );

    expect(screen.getByTestId('save-submit-audio-button')).toBeEnabled();
  });

  test('Save button should be enabled when an initial file exists and a new file is selected', () => {
    mockUseForm({ watch: vi.fn(() => new File(['audio'], 'new-audio.mp3', { type: 'audio/mpeg' })) });
    render(
      <TrackAudioForm onFormSubmission={vi.fn()} trackData={{ ...mockTrackData, audioFile: 'existing-audio.mp3' }} />,
    );

    expect(screen.getByTestId('save-submit-audio-button')).toBeEnabled();
  });

  test('should call uploadAudioTrack and handleAddAudioTrack when a new file is present', async () => {
    const expectedUploadedAudioFile = 'new-uploaded-path.mp3';

    const mockUploadAudioTrack = vi.fn().mockResolvedValue({ ...mockTrackData, audioFile: expectedUploadedAudioFile });
    const mockAddAudioTrack = vi.fn();
    const mockDeleteAudioTrack = vi.fn();
    const mockDeleteAudioFile = vi.fn();
    const mockOnFormSubmission = vi.fn();

    (useUploadAudioTrack as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      uploadAudioTrack: mockUploadAudioTrack,
    });
    (useTrackContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      handleAddAudioTrack: mockAddAudioTrack,
      handleDeleteAudioTrack: mockDeleteAudioTrack,
    });
    (useDeleteAudioFile as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      deleteAudioFile: mockDeleteAudioFile,
    });

    const newFile = new File(['audio content'], 'new-track.mp3', { type: 'audio/mpeg' });
    mockUseForm({
      watch: vi.fn(() => newFile),
      handleSubmit: vi.fn((cb) => (e?: React.SyntheticEvent) => {
        e?.preventDefault();
        cb({ audioFile: newFile });
      }),
    });

    render(<TrackAudioForm onFormSubmission={mockOnFormSubmission} trackData={{ ...mockTrackData }} />);

    await waitFor(() => screen.getByTestId('save-submit-audio-button').click());

    expect(mockUploadAudioTrack).toHaveBeenCalledTimes(1);
    expect(mockUploadAudioTrack).toHaveBeenCalledWith(newFile);

    expect(mockDeleteAudioTrack).not.toHaveBeenCalled();
    expect(mockDeleteAudioFile).not.toHaveBeenCalled();

    expect(mockAddAudioTrack).toHaveBeenCalledTimes(1);
    expect(mockAddAudioTrack).toHaveBeenCalledWith(mockTrackData.id, expectedUploadedAudioFile);

    expect(mockOnFormSubmission).toHaveBeenCalledTimes(1);

    expect(toast.error).not.toHaveBeenCalled();
  });

  test('should call deleteAudioFile and handleDeleteAudioTrack when audioFile is null', async () => {
    const mockDeleteAudioFile = vi.fn().mockResolvedValue(undefined);
    const mockDeleteAudioTrack = vi.fn();
    const mockOnFormSubmission = vi.fn();
    const mockUploadAudioTrack = vi.fn();
    const mockAddAudioTrack = vi.fn();

    (useDeleteAudioFile as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      deleteAudioFile: mockDeleteAudioFile,
    });
    (useTrackContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      handleDeleteAudioTrack: mockDeleteAudioTrack,
      handleAddAudioTrack: mockAddAudioTrack,
    });
    (useUploadAudioTrack as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      uploadAudioTrack: mockUploadAudioTrack,
    });

    mockUseForm({
      watch: vi.fn(() => null),
      handleSubmit: vi.fn((cb) => (e?: React.SyntheticEvent) => {
        e?.preventDefault();
        cb({ audioFile: null });
      }),
    });

    render(
      <TrackAudioForm
        onFormSubmission={mockOnFormSubmission}
        trackData={{ ...mockTrackData, audioFile: 'existing-audio.mp3' }}
      />,
    );

    await waitFor(() => screen.getByTestId('save-submit-audio-button').click());

    expect(mockDeleteAudioFile).toHaveBeenCalledTimes(1);

    expect(mockDeleteAudioTrack).toHaveBeenCalledTimes(1);
    expect(mockDeleteAudioTrack).toHaveBeenCalledWith(mockTrackData.id);

    expect(mockUploadAudioTrack).not.toHaveBeenCalled();
    expect(mockAddAudioTrack).not.toHaveBeenCalled();

    expect(mockOnFormSubmission).toHaveBeenCalledTimes(1);

    expect(toast.error).not.toHaveBeenCalled();
  });

  test('should show a toast error if onSubmit fails', async () => {
    const mockUploadAudioTrack = vi.fn().mockRejectedValue(new Error('Upload failed'));
    const mockOnFormSubmission = vi.fn();

    (useUploadAudioTrack as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      uploadAudioTrack: mockUploadAudioTrack,
    });
    (useTrackContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      handleAddAudioTrack: vi.fn(),
      handleDeleteAudioTrack: vi.fn(),
    });

    const newFile = new File(['audio content'], 'failed-track.mp3', { type: 'audio/mpeg' });
    mockUseForm({
      watch: vi.fn(() => newFile),
      handleSubmit: vi.fn((cb) => (e?: React.SyntheticEvent) => {
        e?.preventDefault();
        cb({ audioFile: newFile });
      }),
    });

    render(<TrackAudioForm onFormSubmission={mockOnFormSubmission} trackData={{ ...mockTrackData }} />);

    await waitFor(() => screen.getByTestId('save-submit-audio-button').click());

    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(toast.error).toHaveBeenCalledWith('Error! Upload failed');

    expect(mockOnFormSubmission).not.toHaveBeenCalled();
  });
});
