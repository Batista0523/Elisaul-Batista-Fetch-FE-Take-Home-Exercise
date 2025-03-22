
import Fetchrewards from "../Components/Fetchrewards";
import "./Home.css"; // Styling for the Home component
import { Link } from "react-router-dom"; // Link component for navigation between routes

/**
 * Home Component
 * This component serves as the landing page for the Fetch🐕Buddies application.
 * It provides an introduction, features list, and promotes the Fetch Rewards program.
 */

function Home() {
  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="home-header">
        <h1>Welcome to Fetch🐕Buddies!</h1>
        <p>
          Find your new best friend from a wide selection of lovable dogs waiting for a forever home.
        </p>
      </header>

      {/* About Section */}
      <section className="home-about">
        <h2>About Fetch🐕Buddies</h2>
        <p>
          Welcome to the ultimate platform for dog lovers! Whether you're looking to adopt or just love browsing adorable pups, we’ve got you covered. 
          You can explore dogs from different shelters, search by breed, save your favorites, and even find your perfect match. Our AI tool helps you compare your top picks, making your decision so much easier. Happy dog hunting!
        </p>
      </section>

      {/* Features Section */}
      <section className="home-features">
        <h2>Features 🦮</h2>
        <ul>
          <li>🔍 <strong>Search & Filter:</strong> Browse dogs by breed and filter results to match your preferences.</li>
          <li>📄 <strong>Pagination & Sorting:</strong> View results in pages and sort alphabetically by breed.</li>
          <li>❤️ <strong>Save Favorites:</strong> Keep track of your favorite dogs for easy reference.</li>
          <li>🐕 <strong>Find Your Match:</strong> Submit your favorites and let us help you find your perfect companion.</li>
          <li>🤖 <strong>Compare Two Dogs With AI:</strong> Use AI tools to compare your favorite dogs and make better choices.</li>
        </ul>
      </section>

      {/* Rewards Section */}
      <section className="home-features">
        <h2>Rewards That Keep Getting Better! 🐶</h2>
        <p>
          <strong>Shop, Snap & Play!</strong> Earn amazing rewards with <strong>FETCH Rewards</strong> every time you shop.
          Collect points on every receipt and redeem them for your favorite rewards:
        </p>
        <ul>
          <li>💳 Popular Gift Cards</li>
          <li>💵 Cash Sweepstakes Entries</li>
          <li>❤️ Charitable Donations</li>
        </ul>
        <p>Interested? Click the link below to start earning!</p>
       <Fetchrewards/>
      </section>

      {/* Footer Section */}
      <section className="home-footer">
        <h3>Ready to find your furry friend?</h3>
        <Link to="/login" className="home-button">
          Get Started
        </Link>
      </section>
    </div>
  );
}

export default Home;
