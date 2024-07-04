import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MCQs() {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctOption, setCorrectOption] = useState('');
    const API=import.meta.env.VITE_API_URL;
    useEffect(() => {
        
        fetchQuestions();
    }, []);

    async function fetchQuestions() {
        try {
            const response = await axios.get(`${API}/questions/questions`);
            setQuestions(response.data);
        } catch (error) {
            console.error(error.message);
        }
    }

    async function handleDeleteQuestion(id) {
        try {
            await axios.delete(`${API}/questions/questions/${id}`);
            setQuestions(questions.filter(question => question._id !== id));
        } catch (error) {
            console.error(error.message);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post(`${API}/questions/questions`, {
                question: newQuestion,
                answers: options.map((option, index) => ({
                    text: option,
                    isCorrect: index.toString() === correctOption
                }))
            });
            setQuestions([...questions, response.data]);
            setNewQuestion('');
            setOptions(['', '', '', '']);
            setCorrectOption('');
        } catch (error) {
            console.error(error.message);
        }
    }

    function handleOptionChange(index, value) {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    }

    function handleCorrectOptionChange(index) {
        setCorrectOption(index.toString());
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='my-10'>
                <div>
                    {questions.map((question, qIndex) => (
                        <div key={question._id}>
                            <div className='mt-5'>
                                <div className='grid'>
                                    <label className='text-3xl'>{`Q : ${qIndex + 1}`}</label>
                                    <input type="text" placeholder='Write Question' className='p-3 mt-1' value={question.question} disabled />
                                </div>
                                <div className='grid grid-cols-4 my-5'>
                                    {question.answers.map((answer, aIndex) => (
                                        <div key={aIndex} className='flex gap-2 items-center'>
                                            <label className='text-3xl'>{`${String.fromCharCode(97 + aIndex)}`}</label>
                                            <input type="text" placeholder={`${String.fromCharCode(97 + aIndex)}`} className='p-3 w-40 rounded-xl' value={answer.text} disabled />
                                            {answer.isCorrect && <span className='text-green-500 font-bold'> (Correct)</span>}
                                        </div>
                                    ))}
                                </div>
                                <button onClick={() => handleDeleteQuestion(question._id)} className='bg-red-500 text-white px-3 py-1 mt-3'>Delete Question</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='mt-5'>
                    <div className='grid'>
                        <label className='text-3xl'>New Question</label>
                        <input type="text" placeholder='Write Question' className='p-3 mt-1' value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} />
                    </div>
                    <div className='grid grid-cols-2 gap-5 mt-5'>
                        {options.map((option, index) => (
                            <div key={index} className='flex gap-2 items-center'>
                                <label className='text-3xl'>{` ${String.fromCharCode(97 + index)}`}</label>
                                <input type="text" placeholder={`${String.fromCharCode(97 + index)}`} className='p-3 w-40 rounded-xl' value={option} onChange={(e) => handleOptionChange(index, e.target.value)} />
                                <input type="radio" name="correctOption" checked={correctOption === index.toString()} onChange={() => handleCorrectOptionChange(index)} />
                                <label className='text-lg'>Correct</label>
                            </div>
                        ))}
                    </div>
                    <button type='submit' className='bg-green-300 py-3 px-7 text-xl text-white mt-5'>Create Question</button>
                </div>
            </form>
        </>
    );
}

export default MCQs;
