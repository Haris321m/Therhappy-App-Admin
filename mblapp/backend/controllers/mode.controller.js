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



const formatDate = (date) => {
    const formattedDate = new Date(date);
    return `${formattedDate.getFullYear()}-${(formattedDate.getMonth() + 1).toString().padStart(2, '0')}-${formattedDate.getDate().toString().padStart(2, '0')}`;
};

const formatTime = (date) => {
    const formattedTime = new Date(date);
    return `${formattedTime.getHours().toString().padStart(2, '0')}:${formattedTime.getMinutes().toString().padStart(2, '0')}:${formattedTime.getSeconds().toString().padStart(2, '0')}`;
};

export const getMoods = async (req, res) => {
    try {
        const moods = await Mood.find().populate('user');
        const formattedMoods = moods.map(mood => ({
            _id: mood._id,
            mood: mood.mood,
            comments: mood.comments,
            user: mood.user,
            createdAt: {
                date: formatDate(mood.createdAt),
                time: formatTime(mood.createdAt)
            },
            updatedAt: {
                date: formatDate(mood.updatedAt),
                time: formatTime(mood.updatedAt)
            }
        }));
        res.status(200).json(formattedMoods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getMoodById = async (req, res) => {
    try {
        const { id } = req.params;
        const mood = await Mood.findOne({user:id});

        if (!mood) {
            return res.status(404).json({ message: 'Mood entry not found' });
        }

        const formattedMood = {
            _id: mood._id,
            mood: mood.mood,
            comments: mood.comments,
            user: mood.user,
            createdAt: {
                date: formatDate(mood.createdAt),
                time: formatTime(mood.createdAt)
            },
            updatedAt: {
                date: formatDate(mood.updatedAt),
                time: formatTime(mood.updatedAt)
            }
            // Add any other fields you want to include in the response
        };

        res.status(200).json(formattedMood);
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
