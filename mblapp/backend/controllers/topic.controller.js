import Topic from '../models/topic.model.js';


export const createTopic = async (req, res) => {
    try {
        const { title, description } = req.body;

        const newTopic = new Topic({ title, description });
        const savedTopic = await newTopic.save();

        res.status(201).json(savedTopic);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getTopics = async (req, res) => {
    try {
        const topics = await Topic.find().populate('articles');
        res.status(200).json(topics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getTopicById = async (req, res) => {
    try {
        const { id } = req.params;
        const topic = await Topic.findById(id).populate('articles');

        if (!topic) {
            return res.status(404).json({ message: 'Topic not found' });
        }

        res.status(200).json(topic);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateTopic = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const updatedTopic = await Topic.findByIdAndUpdate(
            id,
            { title, description },
            { new: true, runValidators: true }
        );

        if (!updatedTopic) {
            return res.status(404).json({ message: 'Topic not found' });
        }

        res.status(200).json(updatedTopic);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const deleteTopic = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTopic = await Topic.findByIdAndDelete(id);

        if (!deletedTopic) {
            return res.status(404).json({ message: 'Topic not found' });
        }

        res.status(200).json({ message: 'Topic deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
