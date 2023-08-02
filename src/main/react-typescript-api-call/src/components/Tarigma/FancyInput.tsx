import React from 'react';

interface FancyInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const FancyInput: React.FC<FancyInputProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="fancy-input">
      <label>{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FancyInput;
