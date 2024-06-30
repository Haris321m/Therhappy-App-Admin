import express from 'express';
import { createQuestion, getQuestions, deleteQuestion } from '../controllers/quiz.controller.js';

const router = express.Router();

// Route to create a question
router.post('/questions', createQuestion);

// Route to get all questions
router.get('/questions', getQuestions);

// Route to delete a question
router.delete('/questions/:id', deleteQuestion);

export default router;
