import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionComponent from './QuestionComponent';
import './QuizStyle.css';



const QuizComponent = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [answers, setAnswers] = useState({}); // Store selected options for each question

    useEffect(() => {
        axios.get('http://localhost:8000/api/quizzes/')
            .then(response => {
                setQuizzes(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Failed to fetch quizzes.');
                setLoading(false);
            });
    }, []);
    // logic to calculate the score
    const calculateScore = () => {
        // TODO: 
        let score = 0;
        quizzes.forEach(quiz => {
            quiz.questions.forEach(question => {
                if (answers[question.id] === question.correct_option) {
                    score += 1;
                }
            });
        });
        return score;
    }

    // Function to handle the selection of an option
    const handleSelectOption = (answerId, optionId) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [answerId]: optionId
        }));
    };

    // Function to handle submission of answers
    const handleSubmit = () => {
        const score = calculateScore();
        const token = localStorage.getItem('authToken');

        axios.post('http://localhost:8000/api/submit-answer/', { score }, {
            headers: { 'Authorization': `Token ${token}` }
        })
            .then(response => {
                console.log('Answer result saved!', response.data);
            })
            .catch(error => {
                console.error('Error saving quiz result:', error);
            });
        console.log('Submitted Answers:', answers);
    };

    if (loading) {
        return <p>Loading quizzes...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="quiz-container"> {/* Apply 'quiz-container' class */}
            <h1 className="quiz-title">Quizzes</h1> {/* Apply 'quiz-title' class */}
            {quizzes.map(quiz => (
                <div key={quiz.id}>
                    <h2>{quiz.title}</h2>
                    {quiz.questions.map(question => (
                            <QuestionComponent 
                                key={question.id}
                                question={question} 
                                onSelectOption={handleSelectOption} 
                            />
                        
                    ))}
                </div>
            ))}
            <button className="submit-button" onClick={handleSubmit}>Submit Answers</button> {/* Apply 'submit-button' class */}
        </div>
    );
};

export default QuizComponent;