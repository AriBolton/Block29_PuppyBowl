import { useParams } from 'react-router-dom';
import { usePlayerQuery } from '../api/puppyBowlApi';

const PuppyDetails = () => {
    const { id } = useParams();
    const { data, error, isLoading } = usePlayerQuery(id);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading puppy details</div>;
    if (!data?.data?.player) return <div>Puppy not found</div>;

    const puppy = data.data.player;

    return (
        <div className="puppy-details">
            <h2>Puppy Details</h2>
            <div className="puppy-card">
                <img src={puppy.imageUrl} alt={puppy.name} className="puppy-image" />
                <div className="puppy-info">
                    <h3>{puppy.name}</h3>
                    <p><strong>Breed:</strong> {puppy.breed}</p>
                    <p><strong>Status:</strong> {puppy.status}</p>
                    <p><strong>ID:</strong> {puppy.id}</p>
                </div>
            </div>
        </div>
    );
};

export default PuppyDetails; 