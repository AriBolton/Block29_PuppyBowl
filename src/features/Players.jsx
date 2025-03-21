// Import the React library

// Import the generated hook from our RTK Query API slice
import {
    usePlayersQuery,
    useDeletePlayerMutation
} from "../api/puppyBowlApi";
import NavBar from "./NavBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreatePuppyForm from "./CreatePuppyForm";

// Define a new React component
const Players = () => {
    // Use the generated hook to fetch data from the API
    // When the component is first rendered, it will start the API fetch
    // It will re-render each time the fetch status changes (e.g., "loading", "data arrived", "error")
    const { data = {}, error, isLoading } = usePlayersQuery();
    const [deletePlayer] = useDeletePlayerMutation();
    const navigate = useNavigate();
    const [searchParameter, setSearchParameter] = useState("");
    const [showCreateForm, setShowCreateForm] = useState(false);

    // Show a loading message while data is being fetched
    if (isLoading) {
        return (
            <section>
                <h2> Loading...</h2>
            </section>
        );
    }

    // Show an error message if the fetch failed
    if (error) {
        return (
            <section>
                <h2> Oops, it broke. Try back soon...</h2>
            </section>
        );
    }
    console.log(data)

    const handleDelete = async (id) => {
        try {
            await deletePlayer(id);
        } catch (error) {
            console.error('Failed to delete puppy:', error);
        }
    };

    const playersToDisplay =
        searchParameter !== "" && data.data?.players
            ? data.data.players.filter(
                (player) =>
                    player.name.toUpperCase().includes(searchParameter.toUpperCase()) ||
                    player.breed.toLowerCase().includes(searchParameter.toLowerCase())
            )
            : data.data?.players || [];

    // Show the fetched data after it has arrived
    return (
        <section>
            <NavBar
                searchParameter={searchParameter}
                setSearchParameter={setSearchParameter}
            />
            <button
                className="create-button"
                onClick={() => setShowCreateForm(!showCreateForm)}
            >
                {showCreateForm ? 'Hide Form' : 'Add New Puppy'}
            </button>

            {showCreateForm && <CreatePuppyForm />}

            <div className="players">
                {/* Map through the data array and generate a div for each player */}
                {playersToDisplay.map((player) => (
                    // Use the player's ID as the key for this div
                    <div key={player.id} className="player-card">
                        {/* Display the player's image, with the player's name as alt text */}
                        <img
                            className="player-image"
                            src={player.imageUrl}
                            alt={player.name}
                        />
                        <div className="player-details">
                            <h2>{player.name}</h2>
                            <p>{player.breed}</p>
                            <p>{player.status}</p>
                            <div className="button-container">
                                <button
                                    className="details-button"
                                    onClick={() => navigate(`/puppy/${player.id}`)}
                                >
                                    View Details
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(player.id)}
                                >
                                    Delete Puppy
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );

    // <div className="players">
    //     {/* Map through the data array and generate a div for each player */}
    //     {data.data.players.map((player) => (
    //         // Use the player's ID as the key for this div
    //         <div key={player.id} className="player-card">
    //             {/* Display the player's image, with the player's name as alt text */}
    //             <img className="player-image" src={player.imageUrl} />
    //             <div className="player-details">
    //                 <h2> {player.name} </h2>

    //                 <p> {player.breed} </p>

    //                 <p> {player.status} </p>
    //             </div>
    //         </div>
    //     ))}
    // </div>

    //         <section className="animalList">
    //             <NavBar
    //                 searchParameter={searchParameter}
    //                 setSearchParameter={setSearchParameter}
    //             />
    //             {animalsToDisplay.map((animalObj) => (
    //                 <div
    //                     className="card"
    //                     key={animalObj.animal_id}
    //                     onClick={() => navigate(`/animals/${animalObj.animal_id}`)}
    //                 >
    //                     <div
    //                         className="img"
    //                         style={{ backgroundImage: `url(${animalObj.img_url})` }}
    //                     />
    //                     <h2>{animalObj.name}</h2>
    //                 </div>
    //             ))}
    //         </section>
    //     );
};

// Export the component so it can be imported and used in other files
export default Players;
