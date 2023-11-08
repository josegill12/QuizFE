import React from 'react';

const OptionComponent = ({ options, onSelectOption }) => {
    return (
        <ul>
            {options.map(option => (
                <li key={option.id}>
                    <input
                        type="radio"
                        name={`question-${option.question}`}
                        value={option.id}
                        onChange={(e) => onSelectOption(option.question, parseInt(e.target.value))}
                    />
                    {option.text}
                </li>
            ))}
        </ul>
    );
};

export default OptionComponent;