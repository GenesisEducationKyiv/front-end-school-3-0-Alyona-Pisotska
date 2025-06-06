# ADR-0001: Persisting Filter, Sorting, and Pagination State in URL Query Parameters

**Status:** Proposed | In review | **Accepted** | Rejected  
**Date:** 27.05.2025

## Context

The application includes a key feature — a tracks table — which allows users to sort data, search (by track title, artist, or album), filter by genre, and paginate through large datasets.  
Currently, the state of these features (e.g., active search query, current page, selected sort column, and direction) is managed via React Context.

This approach has significant limitations that negatively impact user experience (usability):

- **State loss:** On page refresh or accidental tab closure, all user-defined state (filters, sorting, page) is lost, reverting to a default view.
- **Lack of shareability:** Users cannot share a link to the table with specific filters or sorting applied.
- **No bookmarking:** Users cannot bookmark a specific table state using browser bookmarks.
- **Inaccurate browser history:** Navigation using the browser’s "Back"/"Forward" buttons does not reflect table state changes, as they are not represented in the URL.

These issues reduce the overall usability and predictability of the system. The application becomes less intuitive, predictable, and convenient.

## Decision

Persist and synchronize the search, pagination, and sorting state of the tracks table using **URL query parameters**. The URL will act as the **Single Source of Truth** for these parameters.

### Implementation

- Use `useSearchParams` from `react-router-dom` (already used in the project) to read and update parameters in the URL.
- Components responsible for filtering, sorting, and pagination will either:

✅ Use useQueryParams to read and update table state, or

✅ Use useSearchParams directly if coupling is minimal and duplication is not a concern.

- React Context may still be used to distribute query parameter state (retrieved from the URL) down the component tree to avoid prop drilling.
- On any state change (search text, page number, items per page, sorting field, sorting order), the hook will update the corresponding query parameter in the URL.
- When the table component loads, it will initialize its state based on the query parameters. If parameters are missing or invalid, the hook will fall back to default values.

### Update Strategy

- **Search (`q`)**: Update with debounce (e.g., 300–500 ms) to avoid changing the URL on every keystroke.
- **Pagination (`page`)**: Update immediately.
- **Sorting (`sortBy`, `order`)**: Update immediately.
- **Filter (`genre`)**: Update immediately.

Use `replace: true` for changes that shouldn’t create new entries in browser history (e.g., during debounced search), and `replace: false` for explicit user actions (changing page or sort), to ensure browser "Back"/"Forward" buttons work correctly.

### Example Parameters

- `?q=lady` (search query)
- `?page=2` (page number)
- `?sortBy=title&order=asc` (sorting)
- `?genre=rock` (selected genre)

Combined: `?q=classic&page=3&sortBy=artist&order=desc&genre=rock`

## Rationale

- **React Context (current approach)**  
  Rejected due to limitations outlined in the "Context" section (state loss, no shareability/bookmarks, broken browser history).

- **localStorage/sessionStorage**  
  Rejected because it does not solve link sharing, bookmarking, or browser history tracking, although it would preserve state on reload.

## Consequences

### Positive

✅ **Improved usability**

- Users can share links with specific table states.
- Table states can be bookmarked.
- Table state is preserved on page reload.
- Browser navigation buttons work correctly for table state changes.
- UI becomes more intuitive and predictable.

✅ **Centralized state**

- The URL becomes the source of truth for display parameters, simplifying logic in components.

✅ **Analytics potential**

- Easier to track commonly used filters or sorting options if URLs are logged.
- Easier debugging and QA by reproducing specific states directly from the URL. This approach will help to mock certain needed data for functional or e2e tests

✅ **Accessibility improvements**

- While indirect, stable URLs can improve accessibility as users can return to familiar states.

### Negative

⚠️ **Increased complexity**

- Additional logic required to parse and validate URL parameters, handle defaults, and update the URL accordingly.

  👉 We mitigate this by encapsulating URL state logic into a reusable hook (e.g., useQueryParams), which handles parsing, validation, and fallback defaults in a single place.

- Updating the URL is an async operation; the UI must respond correctly.

  👉 We ensure updates are batched and debounced where needed (e.g., search), and use useEffect with stable dependencies to avoid unnecessary renders.

- More complex state management, needing synchronization between the URL and internal state.

  👉 We avoid duplication by treating the URL as the single source of truth. Components either read directly from the URL via the custom hook or receive the current values via React Context derived from it.

⚠️ **Invalid parameter handling**

- Users may manually edit the URL to invalid values, which must be handled gracefully (e.g., fall back to defaults).

  👉 We perform schema-based validation (using Zod) for incoming query parameters. If a value is missing or invalid, we silently fall back to a predefined default. This approach avoids runtime errors and ensures a predictable experience.

## Edge Cases & Technical Notes

- Define clear and consistent names and allowed values for query parameters (e.g., `order` must be either `asc` or `desc`).
- Define a strategy for filters that allow multiple selections (`?genre=rock&genre=pop` vs `?genre=rock,pop`).

We use the repeating key format: `?genre=rock&genre=pop`

This approach is the most widely adopted and semantically correct for query parameters representing arrays. It offers several advantages:

✅ **Native support** in URLSearchParams: params.getAll('genre') returns an array directly.

✅ **HTML form compatibility**: It reflects how browsers submit array values from multiple-select fields or checkboxes.

✅ **Better interoperability** with backend frameworks, router libraries, and analytics tools.

✅ **More resilient** to edge cases — avoids parsing ambiguity (e.g., values that include commas).

Alternatives like ?genre=rock,pop require manual string parsing and are more error-prone, especially when values may contain commas.
Therefore, we choose the repeating key strategy for its simplicity, compatibility, and robustness.

- Handle situations where the number of search results changes and the current page becomes invalid (e.g., automatically navigate to the last available page).
- Use `encodeURIComponent` and `decodeURIComponent` for query parameter values — especially for search terms — to avoid issues with special characters.
- Clearly define what state should _not_ be stored in the URL (e.g., selection state for bulk deletion, as it is temporary/session-based).

### ❗️Security

- Never store sensitive information (e.g., user IDs, tokens, or private data) in the URL.
- All query parameters must be non-sensitive and safe for logging, sharing, and bookmarking.

## UX Considerations

- **Reset Filters**: Implement a "Reset Filters" feature that clears the corresponding URL parameters and returns the table to its default state.
