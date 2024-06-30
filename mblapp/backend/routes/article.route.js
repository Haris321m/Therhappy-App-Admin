import express from 'express';
import {
    createArticle,
    getArticles,
    getArticleById,
    updateArticle,
    deleteArticle
} from '../controllers/article.controller.js';
import upload from '../middlewares/multer.middleware.js';

const router = express.Router();

router.post('/',upload.single("img"),createArticle);
router.get('/', getArticles);
router.get('/:id', getArticleById);
router.put('/:id',upload.single("img"),updateArticle);
router.delete('/:id', deleteArticle);

export default router;
