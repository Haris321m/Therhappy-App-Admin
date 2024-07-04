import Audio from '../models/audio.models.js'; // Adjust the path as needed
import { v2 as cloudinary } from 'cloudinary';

// Create a new audio entry
export const createAudio = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: 'video', 
        });
        const { title, description } = req.body;
        const audioUrl = result.secure_url;
        const publicId = result.public_id;

        const newAudio = new Audio({ title, description, audioUrl, publicId });
        const savedAudio = await newAudio.save();

        res.status(201).json(savedAudio);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getAllAudios = async (req, res) => {
    try {
        const audios = await Audio.find();
        res.status(200).json(audios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getAudioById = async (req, res) => {
    try {
        const { id } = req.params;
        const audio = await Audio.findById(id);

        if (!audio) {
            return res.status(404).json({ message: 'Audio not found' });
        }

        res.status(200).json(audio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateAudio = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        let audioUrl;
        let publicId;

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: 'video',
            });
            audioUrl = result.secure_url;
            publicId = result.public_id;
        }

        const updatedAudio = await Audio.findByIdAndUpdate(
            id,
            { title, description, ...(audioUrl && { audioUrl }), ...(publicId && { publicId }) },
            { new: true, runValidators: true }
        );

        if (!updatedAudio) {
            return res.status(404).json({ message: 'Audio not found' });
        }

        res.status(200).json(updatedAudio);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const deleteAudio = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAudio = await Audio.findByIdAndDelete(id);

        if (!deletedAudio) {
            return res.status(404).json({ message: 'Audio not found' });
        }

        
        await cloudinary.uploader.destroy(deletedAudio.publicId, {
            resource_type: 'video',
        });

        res.status(200).json({ message: 'Audio deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
