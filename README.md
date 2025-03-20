# Fetch🐕Buddies

Fetch🐕Buddies is a web application built with React that connects dog lovers with their potential furry friends. Users can browse adoptable dogs, save favorites, generate matches, and even compare two dogs using an AI-powered tool.

## Features
Home Page: An introduction to the application with details about features and rewards.
Search & Filter: Browse dogs by breed, age, and more with sorting and pagination.
Favorites: Save your favorite dogs, select a pair, and compare them using AI.
Authentication: Login functionality to ensure secure access to the application.
Integration with Fetch Rewards: Direct links to join Fetch Rewards and earn points.
Project Structure
Pages:

### Home.jsx – Landing page with application introduction.
### LoginPage.jsx – Handles user login.
### SearchPage.jsx – Provides dog search, filtering, pagination, and matching functionalities.
### FavoritePages.jsx – Displays favorite dogs and enables AI-powered comparison.

## Components:

NavBar.jsx – Navigation bar with conditional rendering based on authentication.
Styles:

CSS files (Home.css, navbar.css, favorite.css, login.css, search.css) for component styling.
App.jsx:

Main entry point that sets up routing and authentication state.
package.json:

Lists dependencies including React, Axios, React Router, and Vite.
Installation and Running Locally
Prerequisites
Node.js: Ensure you have Node.js installed. You can download it from nodejs.org.
VSCode: Recommended for editing and running the project locally.
Setup Steps
Clone the Repository

bash

git clone <[repository-url](https://github.com/Batista0523/Elisaul-Batista-Fetch-FE-Take-Home-Exercise.git)>
cd fetch-exercise
Install Dependencies

Use your package manager to install dependencies:

bash

npm install
Configure Environment Variables

Create a .env file in the root of the project with the following content:

env
Copy
Edit
VITE_BASE_FETCH_URL= your fetch url
VITE_OPENAI_LOCAL_URL= your server url to run openAI


Run the Development Server

Start the application using Vite:

bash

npm run dev
The application will be accessible at http://localhost:5173 (or the port indicated in your terminal).

Build for Production

To build the project for production, run:

bash

npm run build
Preview the Production Build

To preview your production build locally, run:

bash

npm run preview
Additional Information
API Endpoints:

The application communicates with a backend service for dog data and authentication at VITE_BASE_FETCH_URL.
The AI comparison functionality calls the service at VITE_OPENAI_LOCAL_URL.

OpenAI Server:
The AI comparison feature relies on a separate OpenAI server. Please refer to the server repo <[repository-url] (https://github.com/Batista0523/OpenAI-backend-server)> for detailed setup instructions to run this server locally.

Contributing
Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

app lives at[fetch](https://fetchbuddies.netlify.app/)