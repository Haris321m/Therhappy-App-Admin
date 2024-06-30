import YogaPose from '../models/yoga.model.js';
import { v2 as cloudinary } from 'cloudinary';

export const createYogaPose = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: 'video',
        });
        const { title } = req.body;
        const video = result.secure_url;

        const newYogaPose = new YogaPose({ title, video });
        const savedYogaPose = await newYogaPose.save();

        res.status(201).json(savedYogaPose);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getYogaPoses = async (req, res) => {
    try {
        const yogaPoses = await YogaPose.find();
        res.status(200).json(yogaPoses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateYogaPose = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        let video;

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: 'video',
            });
            video = result.secure_url;
        }

        const updatedYogaPose = await YogaPose.findByIdAndUpdate(
            id,
            { title, ...(video && { video }) },
            { new: true, runValidators: true }
        );

        if (!updatedYogaPose) {
            return res.status(404).json({ message: 'Yoga pose not found' });
        }

        res.status(200).json(updatedYogaPose);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteYogaPose = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedYogaPose = await YogaPose.findByIdAndDelete(id);

        if (!deletedYogaPose) {
            return res.status(404).json({ message: 'Yoga pose not found' });
        }

        res.status(200).json({ message: 'Yoga pose deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
