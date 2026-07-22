# Book Discovery

A React application for discovering books using the Open Library API. Users can search for books, view detailed information, and save their favorite books for later.

## Features

* Search for books using the Open Library API
* View detailed information about individual books
* Display book covers, authors, descriptions, subjects, and publication information
* Add and remove books from favorites
* Persist favorites using `localStorage`
* View all saved books on a dedicated Favorites page
* Display the current favorites count in the navigation
* Responsive user interface
* Loading, error, and empty states
* Client-side navigation using React Router

## Technology Stack

* React
* Vite
* JavaScript
* React Router
* Open Library API
* React Context
* Browser `localStorage`

## How AI Helped

AI acted as a development assistant throughout this project. It helped me plan the application incrementally, suggested a modular React structure, generated code for individual milestones, explained implementation decisions, assisted with Open Library API integration, React Context, localStorage persistence, routing, and debugging. I reviewed each milestone, approved changes before moving forward, and verified the final application through linting, production builds, and manual testing.

## Manual Improvements and Corrections

* I reviewed AI-generated code after every milestone before approving it.
* I inspected real Open Library API responses instead of relying on assumptions about the data structure.
* I verified that API logic, custom hooks, components, pages, and shared state had separate responsibilities.
* I corrected the provider wiring so the application renders once inside `FavoritesProvider`.
* I verified that favorite-button clicks do not accidentally navigate to the book details page.
* I reused `BookCard` on both the Home and Favorites pages instead of duplicating the UI.
* I ran `npm run lint` and `npm run build`.
* I manually tested searching, book details, favorites, localStorage persistence, navigation, and loading, error, and empty states.
* I manually added a favorites count display in the Navbar, since it was not covered by the original prompts.

## Project Structure

The project separates responsibilities between API communication, React state, shared application state, reusable components, and pages.

The main areas include:

* API services for communicating with Open Library
* Custom hooks for asynchronous data and React state
* Context for shared favorites state
* Reusable components such as `BookCard`
* Pages for the main application views
* React Router for navigation

## Project Status

The application is complete and demonstrates an AI-assisted React development workflow focused on incremental implementation, code review, debugging, testing, and refinement.

## Documentation

See PROMPTS.md for the prompts used during the AI-assisted development process.

