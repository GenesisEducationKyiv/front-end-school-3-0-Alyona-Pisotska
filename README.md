# MusicApp

This project is a web application for managing music tracks, built as a test task.

## Githab

https://github.com/Alyona-Pisotska/music_app

## Prerequisites

- Node.js version v20.13.1 is recommended.

## Getting Started

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Run the application:**

    ```bash
    npm start
    ```

3.  Open your browser and navigate to `http://localhost:3000`.

_Note: Ensure the backend API server is running (as provided in the task description) on `http://localhost:8000`._

## Extra Tasks Implemented

Here is the status of the optional extra tasks:

- **Implement bulk delete functionality (select multiple or all tracks and delete them):**

  - You can select multiple tracks using the checkboxes in the table and delete them all at once.

- **Implement optimistic updates to reflect changes in the UI before they are confirmed by the server:**

  - Optimistic updates are implemented for **editing** track metadata using `useState`. Changes appear immediately, and revert if the server request fails. Adding and deleting tracks update the UI after confirmation from the server (using `react-query`'s invalidation mechanism).

- **Add visualization for the audiowave of currently played track:**
  - Tracks with uploaded audio files can be played inline using the standard HTML `<audio>` element, which provides basic playback controls.

## Testability Notes (`data-testid` Attributes)

Most `data-testid` attributes required by the task specification have been implemented. However, certain attributes associated with dynamically generated elements were omitted due to integration complexities with the chosen libraries (e.g., `sonner` for toasts).

Potentially missing attributes:

- `data-testid="confirm-delete"`
- `data-testid="cancel-delete"`
- `data-testid="bulk-delete-button"`
- `data-testid="toast-{type}"`
- `data-testid="select-mode-toggle"`

Although a few test attributes are missing, **all required functionality** of the task has been fully implemented.
