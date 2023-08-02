import React, { useState } from "react";
import axios from "axios";
import FancyInput from "./FancyInput";

const OpenAIHandler: React.FC = () => {
  const [formData, setFormData] = useState({
    incidentDescription: "",
    causeIdentification: "",
    equipmentInvolved: "",
    protectionSystems: "",
    sequenceOfEvents: "",
    faultDurationAndImpact: "",
    actionsTaken: "",
    analysisAndRecommendations: "",
    dataAndMeasurements: "",
  });

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      console.log(formData);
      const result = await axios.post(
        "http://localhost:8080/api/generate",
        formData
      );
      if (result.data.choices && result.data.choices.length > 0) {
        setResponse(result.data.choices[0].message.content);
      } else {
        setResponse("No assistant response found.");
      }
    } catch (error) {
      console.error("Failed to generate text:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FancyInput
          label="Incident Description:"
          name="incidentDescription"
          value={formData.incidentDescription}
          onChange={handleChange}
          placeholder="Enter incident description..."
        />
        <FancyInput
          label="Cause Identification:"
          name="causeIdentification"
          value={formData.causeIdentification}
          onChange={handleChange}
          placeholder="Enter cause identification..."
        />
        <FancyInput
          label="Equipment Involved:"
          name="equipmentInvolved"
          value={formData.equipmentInvolved}
          onChange={handleChange}
          placeholder="Enter equipment involved..."
        />
        <FancyInput
          label="Protection Systems:"
          name="protectionSystems"
          value={formData.protectionSystems}
          onChange={handleChange}
          placeholder="Enter protection systems..."
        />
        <FancyInput
          label="Sequence of Events:"
          name="sequenceOfEvents"
          value={formData.sequenceOfEvents}
          onChange={handleChange}
          placeholder="Enter sequence of events..."
        />
        <FancyInput
          label="Fault Duration and Impact:"
          name="faultDurationAndImpact"
          value={formData.faultDurationAndImpact}
          onChange={handleChange}
          placeholder="Enter fault duration and impact..."
        />
        <FancyInput
          label="Actions Taken:"
          name="actionsTaken"
          value={formData.actionsTaken}
          onChange={handleChange}
          placeholder="Enter actions taken..."
        />
        <FancyInput
          label="Analysis and Recommendations:"
          name="analysisAndRecommendations"
          value={formData.analysisAndRecommendations}
          onChange={handleChange}
          placeholder="Enter analysis and recommendations..."
        />
        <FancyInput
          label="Data and Measurements:"
          name="dataAndMeasurements"
          value={formData.dataAndMeasurements}
          onChange={handleChange}
          placeholder="Enter data and measurements..."
        />

        <button type="submit" disabled={loading}>
          Generate Text
        </button>
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
