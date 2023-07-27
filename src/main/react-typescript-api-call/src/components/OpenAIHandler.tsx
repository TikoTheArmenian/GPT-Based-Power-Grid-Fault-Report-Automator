import React, { useState } from 'react';
import axios from 'axios';

const OpenAIHandler: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(event.target.value);
    };
    

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        try {
            const result = await axios.post('http://localhost:8080/api/generate', { prompt: prompt });
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
              <input type="text" value={prompt} onChange={handleChange} placeholder="Enter prompt..." />
              <button type="submit" disabled={loading}>Generate Text</button>
          </form>
          {loading ? (
              <div>Doing complex anlysis...</div>
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
