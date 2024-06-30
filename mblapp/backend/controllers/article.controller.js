import Article from '../models/article.model.js';
import { v2 as cloudinary } from "cloudinary";


export const createArticle = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "image"
        });

        const { title, content } = req.body;
        const imageUrl = result.secure_url;
        const imagePublicId = result.public_id;

        const newArticle = new Article({ title, content, imageUrl, imagePublicId });
        const savedArticle = await newArticle.save();

        res.status(201).json(savedArticle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getArticleById = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await Article.findById(id);

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const article = await Article.findById(id);

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        if (req.file) {
            
            await cloudinary.uploader.destroy(article.imagePublicId);

            // Upload the new image
            const result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: "image"
            });

            article.imageUrl = result.secure_url;
            article.imagePublicId = result.public_id;
        }

        article.title = title;
        article.content = content;

        const updatedArticle = await article.save();

        res.status(200).json(updatedArticle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await Article.findByIdAndDelete(id);

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        
        await cloudinary.uploader.destroy(article.imagePublicId);

        res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
