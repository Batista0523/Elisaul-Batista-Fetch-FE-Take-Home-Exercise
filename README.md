# Fetch🐕Buddies

**Fetch🐕Buddies** is a React web application designed to connect dog lovers with their potential furry friends. Users can browse adoptable dogs, save favorites, generate matches, and even compare two dogs using an AI-powered tool.

## Features
- **Home Page:** Introduction to the application, highlighting features and rewards.
- **Search & Filter:** Browse dogs by breed, age, etc., with sorting and pagination.
- **Favorites:** Save your favorite dogs, select a pair, and compare them using AI.
- **Authentication:** Login functionality for secure access to the application.
- **Integration with Fetch Rewards:** Direct links to join Fetch Rewards and earn points.

## Project Structure

### Pages
- `Home.jsx` – Landing page introducing the application.
- `LoginPage.jsx` – Handles user login.
- `SearchPage.jsx` – Provides dog search, filtering, pagination, and matching functionalities.
- `FavoritePages.jsx` – Displays favorite dogs and enables AI-powered comparison.

### Components
- `NavBar.jsx` – Navigation bar with conditional rendering based on authentication status.

### Styles
- CSS files: `Home.css`, `navbar.css`, `favorite.css`, `login.css`, `search.css` for individual component styling.

### App.jsx
- Main entry point setting up routing and managing authentication state.

### package.json
- Lists dependencies including **React**, **Axios**, **React Router**, and **Vite**.

## Installation and Running Locally

### Prerequisites
- **Node.js:** [Download](https://nodejs.org/)
- **VSCode (Recommended):** For editing and running the project.

### Setup Steps
1. **Clone the Repository**

[git clone](https://github.com/Batista0523/Elisaul-Batista-Fetch-FE-Take-Home-Exercise.git) 
cd fetch-exercise

app lives at [Fetch🐕Buddies](https://fetchbuddies.netlify.app/)


2. **Install Dependencies**
npm install


3. **Configure Environment Variables**

Create a `.env` file in the root of the project with the following content:

- VITE_BASE_FETCH_URL=your-fetch-url 
- VITE_OPENAI_LOCAL_URL=your-server-url-to-run-openAI


4. **Run the Development Server**

The application will be accessible at [http://localhost:5173](http://localhost:5173) (or the port indicated in your terminal).


## API Endpoints

- The application communicates with a backend service for dog data and authentication at the URL specified in `VITE_BASE_FETCH_URL`.
- The AI comparison functionality calls the service at the URL specified in `VITE_OPENAI_LOCAL_URL`.

---

## OpenAI Server

The AI comparison feature relies on a separate OpenAI server. Please refer to the server repository for detailed setup instructions:

- [OpenAI-backend-server](https://github.com/Batista0523/OpenAI-backend-server)

---

## Live Demo

Check out the live app: [Fetch🐕Buddies](https://fetchbuddies.netlify.app/)

---

## Additional Instructions

This `README.md` contains all the necessary instructions:
- How to clone the repository.
- How to install dependencies.
- How to configure environment variables.
- How to run the development server.
- How to build for production.
- Details on the project structure, features, and API endpoints.
- Instructions for contributing and accessing the live demo.

Happy coding!


## Contributing

Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss your proposed modifications.

---