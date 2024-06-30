import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from "fs";
import {v2 as cloudinary} from "cloudinary";



export const createUser = async (req, res) => {
    try {
    

        const { name, age, gender, relationshipstatus, email, number, password, issues, googleId } = req.body;
        
        let existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 12);
        

        const newUser = new User({
            name,
            age,
            gender,
            relationshipstatus,
            email,
            number,
            password: hashedPassword,
            issues
        });

       

        const savedUser = await newUser.save();

        const token = jwt.sign(
            { userId: savedUser._id, email: savedUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({ token, user: savedUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: error.message });
    }
};



export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age, gender, relationshipstatus, email, number, Password, issues } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, age, gender, relationshipstatus, email, number, Password, issues},
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        
        const isPasswordMatch = await bcrypt.compare(password, user.Password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

     
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } 
        );

        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateSubscription = async (req, res) => {
    const { userId } = req.params;
    const { subscriptionId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const subscription = await Subscription.findById(subscriptionId);
        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }

        
        const subscriptionStart = new Date();
        const subscriptionEnd = new Date(subscriptionStart.getTime() + subscription.days * 24 * 60 * 60 * 1000);

        
        user.subscriptionStart = subscriptionStart;
        user.subscriptionEnd = subscriptionEnd;
        user.subscriptionDays = subscription.days;

        await user.save();

        res.status(200).json({ message: 'Subscription updated successfully', user });
    } catch (error) {
        console.error('Error updating subscription:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
