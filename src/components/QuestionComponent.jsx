import React, {useState} from 'react';
import axios from 'axios';
import OptionComponents from './OptionComponents';



const QuestionComponent = ({ question }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    
    const handleSelectOption = (questionId, optionId) => {
        setSelectedOption(optionId);
        
    };

const handleSaveQuestion = async() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('Not logged in!');
        return;
    }

    try {
        const response = await axios.post(
            'http://localhost:8000/api/save-question/',
            {   question_id: question.id, 
                option_id: question.options.map(option => option.id), 
            },
            {
                headers: { 'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            
            },
        },
        )
    }
    catch (error) {
        console.error('Error saving question:', error);
    }
return (
    <div>
        <h3>{question.text}</h3>
        <OptionComponents
            options={question.options}
            selectedOption={selectedOption}
            onSelectOption={handleSelectOption}
        />
        <button onClick={handleSaveQuestion}>Save Question</button>
    </div>
);
}
}

export default QuestionComponent;