import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
