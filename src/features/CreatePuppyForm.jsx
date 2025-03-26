import { useState } from 'react';
import { useCreatePlayerMutation } from '../api/puppyBowlApi';

const CreatePuppyForm = ({ onSuccess }) => {
    const [createPlayer] = useCreatePlayerMutation();
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        imageUrl: '',
        status: 'bench'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPlayer(formData).unwrap();
            setFormData({
                name: '',
                breed: '',
                imageUrl: '',
                status: 'bench'
            });
            onSuccess?.(); // Call the onSuccess callback to close the form
        } catch (error) {
            console.error('Failed to create puppy:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form onSubmit={handleSubmit} className="create-puppy-form">
            <h2>Add New Puppy</h2>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="breed">Breed:</label>
                <input
                    type="text"
                    id="breed"
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="imageUrl">Image URL:</label>
                <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Add Puppy</button>
        </form>
    );
};

export default CreatePuppyForm; 