import React, { useState } from 'react';
import axios from 'axios';

const OpenAIHandler: React.FC = () => {
    const [formData, setFormData] = useState({
        incidentDescription: '',
        causeIdentification: '',
        // Add more fields as needed
    });

    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        try {
            const result = await axios.post('http://localhost:8080/api/generate', formData);
            setResponse(result.data.choices[0].text);
        } catch (error) {
            console.error('Failed to generate text:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Incident Description:
                    <input type="text" name="incidentDescription" value={formData.incidentDescription} onChange={handleChange} />
                </label>
                <label>
                    Cause Identification:
                    <input type="text" name="causeIdentification" value={formData.causeIdentification} onChange={handleChange} />
                </label>
                {/* Repeat above pattern for all fields */}
                <button type="submit" disabled={loading}>Generate Text</button>
            </form>
            {loading ? (
                <div>Doing complex analysis...</div>
            ) : (
                <div>
                    <h3>Generated Text:</h3>
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
};

export default OpenAIHandler;
