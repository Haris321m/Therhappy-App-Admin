import Subscription from '../models/subscription.model.js';

// Create a new subscription
export const createSubscription = async (req, res) => {
    try {
        const { price,  time} = req.body;
        const newSubscription = new Subscription({ price,  time });
        await newSubscription.save();
        res.status(200).json(newSubscription);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all subscriptions
export const getSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).render( subscriptions );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a subscription
export const updateSubscription = async (req, res) => {
    try {
        const { id } = req.params;
        const { price, time } = req.body;
        await Subscription.findByIdAndUpdate(id, { price, time }, { new: true });
        res.status(200).json({Subscription})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a subscription
export const deleteSubscription = async (req, res) => {
    try {
        const { id } = req.params;
        await Subscription.findByIdAndDelete(id);
        res.status(200).json("deleted successfully");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
