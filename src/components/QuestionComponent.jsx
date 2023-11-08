import React, {useState} from 'react';
import OptionComponents from './OptionComponents';


const QuestionComponent = ({ question }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelectOption = (questionId, optionId) => {
        setSelectedOption(optionId);
        
    };

    return (
        <div>
            <h3>{question.text}</h3>
            <OptionComponents options={question.options} onSelectOption={handleSelectOption} />
        </div>
    );
};

export default QuestionComponent;