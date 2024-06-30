import Mood from '../models/mode.model.js';


export const createMood = async (req, res) => {
    try {
        const { mood, comments, user } = req.body;

        const newMood = new Mood({ mood, comments, user });
        const savedMood = await newMood.save();

        res.status(201).json(savedMood);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getMoods = async (req, res) => {
    try {
        const moods = await Mood.find().populate('user');
        res.status(200).json(moods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getMoodById = async (req, res) => {
    try {
        const { id } = req.params;
        const mood = await Mood.findById(id).populate('user');

        if (!mood) {
            return res.status(404).json({ message: 'Mood entry not found' });
        }

        res.status(200).json(mood);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateMood = async (req, res) => {
    try {
        const { id } = req.params;
        const { mood, comments, user } = req.body;

        const updatedMood = await Mood.findByIdAndUpdate(
            id,
            { mood, comments, user },
            { new: true, runValidators: true }
        );

        if (!updatedMood) {
            return res.status(404).json({ message: 'Mood entry not found' });
        }

        res.status(200).json(updatedMood);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const deleteMood = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMood = await Mood.findByIdAndDelete(id);

        if (!deletedMood) {
            return res.status(404).json({ message: 'Mood entry not found' });
        }

        res.status(200).json({ message: 'Mood entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
