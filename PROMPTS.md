# AI Frontend Internship – Week 3

## Book Discovery Application

## Prompt History

This document records the prompts used during the incremental development of the Book Discovery application with AI assistance.

The application was developed feature by feature rather than being generated as one complete project. After each milestone, I reviewed the generated implementation, tested the result, and approved the next step.

---

### Prompt 1 – Project Planning

```text
You are my AI development assistant for a React application.

I am building a Book Discovery application as part of a frontend AI engineering assignment. The goal is to build a working application while I review, understand, test, and manually improve the code you generate.

Before writing code, create a concise implementation plan for the project.

Application concept:
- Users can discover and search for books.
- Users can view book details.
- Users can save books as favorites.
- The application should have a clean, responsive interface.

Technical constraints:
- Use React with Vite.
- Use JavaScript, not TypeScript.
- Use functional components and React Hooks.
- Use React Router for navigation.
- Use an open books API such as Open Library.
- Do not use a UI component library.
- Use CSS for styling.
- Keep the architecture modular and beginner-readable.
- Separate API logic from UI components.
- Avoid putting the entire application in one component.

For now, do NOT write any code.

First:
1. Propose a suitable folder structure.
2. Explain the main components and their responsibilities.
3. Explain the application routes.
4. Explain how API communication should be separated from the UI.
5. Suggest a simple state-management approach using React Hooks and Context only if necessary.

Wait for my approval before implementing anything.
```

### Prompt 2 – Project Initialization

```text
The implementation plan is approved with one clarification:

For book identity:
- Open Library search results should provide a work ID derived from the result key, such as OL123W.
- The details route should be /book/:id.
- The details API should fetch /works/{id}.json.
- Do not use cover IDs as book identifiers.

Now initialize the React application using Vite.

Requirements:
- React with Vite
- JavaScript, not TypeScript
- Functional components only
- React Hooks
- React Router
- No UI component library
- No Redux or external state-management library
- Use CSS for styling

For this step only:
1. Initialize the project.
2. Install only the dependencies required for the current foundation.
3. Create the basic src directory structure from the approved plan.
4. Set up the application entry point and React Router.
5. Create placeholder route components for Home, BookDetails, and Favorites.
6. Create a minimal Navbar with navigation links.
7. Make sure the application runs successfully.

Do not implement:
- Open Library API calls
- Search functionality
- Favorites logic
- Book cards
- Detailed styling

After implementation, explain:
- What files you created or changed.
- What dependencies you installed and why.
- How the routing works.
- Any decisions you made.
```

### Prompt 3 – Open Library API and useBooks

```text
The foundation is now running correctly and I have manually verified the Home, Favorites, and Book Details routes.

Now implement the Open Library API layer and the useBooks hook.

Requirements:

1. In src/api/books.js:
- Create searchBooks(query).
- Use the Open Library Search API.
- Encode the search query safely.
- Return simplified book objects containing:
  id, title, authors, firstPublishYear, coverId, and coverUrl.
- Use the Open Library work key as the book ID.
- Keep all fetch/network logic in this file.
- Do not use React or React hooks here.
- Throw readable errors when requests fail.

2. Create src/hooks/useBooks.js:
- Manage books, loading, and error state.
- Expose a searchBooks function that calls the API layer.
- Do not call fetch directly from the hook.
- Do not add favorites logic yet.

3. Update Home.jsx:
- Add a controlled search input and search button.
- Allow searching by pressing Enter.
- Use useBooks.
- Display loading and error states.
- Display returned books in a basic grid/list.
- Do not create the final reusable BookCard component yet.

4. Do not modify Favorites.jsx.
5. Do not add localStorage yet.
6. Keep the implementation modular.

After implementation:
- Run the app.
- Test a real search such as "Harry Potter".
- Verify results are displayed.
- Run npm run build.
- Report the files changed and any issues encountered.
```

### Prompt 4 – BookCard Component

```text
Create a reusable BookCard component.

Requirements:

1. Create:
src/components/BookCard.jsx

2. The component should receive one book object through props.

3. Display:
- book cover image when coverUrl exists
- a clear placeholder when no cover exists
- book title
- authors
- first publication year when available

4. The entire card or a clear details action should link to:
 /book/:id

5. Use React Router's Link for navigation.

6. Keep BookCard presentational:
- Do not call fetch.
- Do not use React hooks for data fetching.
- Do not manage the entire books list.
- Do not add favorites functionality yet.

7. Move the book display markup currently inside Home.jsx into BookCard.

8. Update Home.jsx to render:
books.map(book => <BookCard key={book.id} book={book} />)

9. Preserve the existing search, loading, error, and empty states.

10. Keep the current visual design and styling unless a small adjustment is needed.

After implementation:
- Run npm run build.
- Verify that searching for "Harry Potter" still displays the results.
- Click a book card and verify the URL changes to /book/:id.
- Report the files changed and any issues found.
```

### Prompt 5 – Book Details API and Page

```text
Implement the book details API and BookDetails page.

Requirements:

1. In src/api/books.js, add an exported function:

getBookDetails(id)

2. Fetch detailed information for a book from the Open Library Works API:
https://openlibrary.org/works/{id}.json

3. Keep all fetch logic inside the API layer.

4. Handle:
- network errors
- non-OK HTTP responses
- invalid or missing API responses

5. Return a simplified book details object containing useful information such as:
- id
- title
- description
- authors
- subjects
- first publication date or year when available
- cover image URL when a cover is available

6. In src/pages/BookDetails.jsx:
- Read the book id from the URL using useParams.
- Fetch the book details when the page loads.
- Show a loading state while fetching.
- Show a readable error message if fetching fails.
- Display the book title, cover, authors, description, publication information, and subjects when available.
- Provide a link back to the Home page.

7. Create a custom hook:
src/hooks/useBookDetails.js

The hook should:
- manage book details state
- manage loading state
- manage error state
- call getBookDetails from the API layer
- not call fetch directly

8. Keep the responsibilities separated:
- API layer: network requests
- custom hook: data fetching state
- page: rendering the UI

9. Do not implement favorites yet.

After implementation:
- run npm run build
- report all files changed
- explain any assumptions made about the Open Library response structure.
```

### Prompt 6 – Favorites with Context and localStorage

```text
Implement the favorites feature using React Context and localStorage.

Requirements:

1. Implement FavoritesContext in:
src/context/FavoritesContext.jsx

2. The context should provide:
- favorites
- addFavorite(book)
- removeFavorite(bookId)
- isFavorite(bookId)

3. Persist favorites to localStorage using a clear storage key.

4. Initialize favorites from localStorage when the application starts.

5. Handle invalid or corrupted localStorage data gracefully by falling back to an empty favorites array.

6. Favorites should store the simplified book data needed to display a book card:
- id
- title
- authors
- firstPublishYear
- coverId
- coverUrl

7. Wrap the application with FavoritesProvider in the appropriate place.

8. Update BookCard:
- show an Add to Favorites button
- show Remove from Favorites when the book is already saved
- clicking the favorite button must not navigate to the book details page
- use event.stopPropagation() or an appropriate structure to prevent the button click from triggering the card's Link

9. Update BookDetails:
- show an Add to Favorites / Remove from Favorites button
- preserve the existing details functionality

10. Update Favorites.jsx:
- read favorites from the context
- display saved books using the reusable BookCard component
- show a clear empty state when no books are saved

11. Do not add Redux or any external state-management library.

12. Keep API/network logic separate from favorites state logic.

After implementation:
- run npm run build
- report all files changed
- explain how localStorage persistence works
- identify any decisions made to prevent favorite-button clicks from navigating to book details.
```

### Prompt 7 – Correcting Application Provider Wiring

```text
I found a critical issue in the current implementation of src/main.jsx.

The application is currently rendered twice:

<App />
<FavoritesProvider>
  <App />
</FavoritesProvider>

This is incorrect because the first <App /> is outside FavoritesProvider. Components such as Navbar, BookCard, BookDetails, and Favorites use useFavorites(), so the entire application must be rendered inside a single FavoritesProvider.

Please fix only src/main.jsx.

The final structure must be exactly:

- StrictMode
  - FavoritesProvider
    - App

Use this implementation:

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'
import { FavoritesProvider } from './context/FavoritesContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </StrictMode>,
)

Do not modify any other files or add new functionality.

After making the change:
1. Run npm run build.
2. Confirm that the build succeeds.
3. Briefly explain why rendering App twice was incorrect and why the provider must wrap the single App instance.
```

## How AI Helped

AI acted as a development assistant throughout this project. It helped me plan the application incrementally, suggested a modular React structure, generated code for individual milestones, explained implementation decisions, assisted with Open Library API integration, React Context, localStorage persistence, routing, and debugging. I reviewed each milestone, approved changes before moving forward, and verified the final application through linting, production builds, and manual testing.


## Final Verification

- npm run lint
- npm run build
- Manual browser testing