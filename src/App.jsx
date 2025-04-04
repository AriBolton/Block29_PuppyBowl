// Import the React library, which allows us to define components
import { Routes, Route } from 'react-router-dom';

// Import the Players component, which we'll use to show a list of players
import Players from "./features/Players";
import PuppyDetails from "./features/PuppyDetails";

// Define the App component
function App() {
  // This component renders the Players component inside a div
  // This div has a class of 'App', which we could use for styling
  return (
    <section>
      <h1>Puppy Players</h1>
      <div className="App">
        <Routes>
          <Route path="/" element={<Players />} />
          <Route path="/puppy/:id" element={<PuppyDetails />} />
        </Routes>
      </div>
    </section>
  );
}

// Export the App component as the default export
export default App;