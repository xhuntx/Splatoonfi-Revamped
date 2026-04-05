# Contributing Guidelines

Thank you for wanting to contribute to Splatoonfi! These rules are based on the existing `MusicPage`'s.

## 1. General Principles

- Use **modern React** with functional components and hooks.
- Prefer **readable, straightforward code** over clever abstractions.
- Match the existing patterns in this file for structure, styling, and behavior.

Reasoning: consistent patterns make it easier for anyone to read, debug, and extend the app.

## 2. Components & Structure

- Use **functional components** and React hooks (`useState`, `useRef`, etc.).
- Use `memo` for presentational components that:
  - Only depend on props, and
  - Don’t need to re-render often (e.g., `Navbar`).
- Keep components **focused**:
  - Shared layout/UI (e.g., navbars, players) should be separate components.
  - Page-specific logic (filters, playlist behavior) stays in the page component.

Reasoning: separating concerns keeps components smaller and re-renders cheaper.

## 3. Routing

- Use `react-router-dom`’s `Routes` and `Route` as in `MusicPage`.
- Each page should:
  - Have a clear `path`.
  - Use a top-level container with consistent layout (background, padding, centering).
- Keep navigation (`<Navbar />`) consistent across music pages.

Reasoning: consistent routing and layout prevent navigation bugs and visual jumps between pages.

## 4. Data & Assets

- Store song data in a local array (like `songsData`) with:
  - `id`, `title`, `artist`, `cover`, `audio`.
- Ensure `id` values are **unique**.
- Use consistent asset paths (e.g., `/img/...`, `/audio/...`).
- Keep filenames URL-safe (no spaces; prefer `_`).

Reasoning: a consistent data shape allows reuse of display and playback logic without special cases.

## 5. Search, Playback & Playlist Behavior

### Search

- Implement search by **title and artist**:
  - Use `query` state.
  - Filter with `includes(query.toLowerCase())` like `filteredSongs`.

Reasoning: this gives a predictable user experience across all music pages.

### Playback

- Use a **single `<audio>` element** controlled with `useRef`.
- Follow the existing logic:
  - Clicking play on the **same song** toggles play/pause.
  - Clicking play on a **different song**:
    - Updates `currentSong`.
    - Sets `isPlaying` to `true`.
    - Calls `audioRef.current.load()` then `audioRef.current.play()`.

Reasoning: one central audio element avoids multiple tracks playing at once and simplifies state.

### Playlist

- Avoid duplicate entries by checking `id` before adding.
- Provide:
  - A way to **play** songs from the playlist.
  - A way to **remove** songs from the playlist.
- Visually highlight the current song (e.g., `ring-2 ring-blue-400` on the active list item).

Reasoning: clear playlist behavior makes it obvious what’s playing and prevents confusing duplicates.

## 6. Styling & Layout

- Use **Tailwind CSS** utility classes, mirroring current patterns:
  - Dark theme: `bg-neutral-900`, `bg-neutral-700`, `bg-zinc-800`, etc.
  - Rounded corners and consistent padding/margins.
- Use responsive grids similar to:
  - `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`
- Keep:
  - The **left column** for playlist or controls.
  - The **right column** for the music grid.
  - A fixed **bottom player bar** for the current song.

Reasoning: consistent styling avoids one-off layouts and maintains a unified look across pages.

## 7. Icons & External Libraries

- Use `lucide-react` icons:
  - Reuse `Search`, `Music`, `Play`, `Pause`, `Plus`, `X` when possible.
- When adding new icons:
  - Import them from `lucide-react`.
  - Keep sizes and colors consistent with existing icons.

Reasoning: a single icon library keeps the UI visually coherent and reduces dependencies.

## 8. Animations & Effects

- Use the existing `ScrollReveal` component for heading/section reveal animations.
- Do not add new animation libraries unless absolutely necessary.
- Keep animations subtle and non-blocking.

Reasoning: limiting animation tools avoids bloat and keeps transitions predictable.

## 9. Code Style

- Keep song data in a **single source of truth** per page.
- Keep most business logic in handlers (`handlePlay`, `handleAddToPlaylist`, etc.), not inline in JSX.
- Use comments only where behavior isn’t obvious.
- Follow the existing ordering:
  - Imports
  - Constants/data (`songsData`)
  - Components (`Navbar`, then page)
  - `export default` at the end

Reasoning: consistent structure helps future contributors quickly find what they need.

## 10. Testing Changes

Before submitting changes:

1. Run the dev server.
2. Verify:
   - All songs render correctly (covers, titles, artists).
   - Search works for both song titles and artists.
   - Play/pause works from:
     - The grid.
     - The playlist.
     - The bottom player bar.
   - Playlist add/remove works and UI updates immediately.
   - No broken image or audio paths.
3. Check browser console for **no errors/warnings**.
4. Inspect layout on:
   - Mobile width
   - Tablet width
   - Desktop width

Reasoning: catching issues locally keeps the main branch stable and predictable.

## 11. Pull Requests

- Keep PRs **small and focused** (e.g., “Add Splatoon 1 songs”, “Refactor playback logic”).
- In the PR description, include:
  - What you changed.
  - Why you changed it (bug fix, feature, refactor).
- Mention any UI/UX changes briefly.

Reasoning: small, clearly explained PRs are easier to review, test, and roll back if needed.
