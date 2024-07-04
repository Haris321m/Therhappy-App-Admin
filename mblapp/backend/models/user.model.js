import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String
    },
    googleId: {
        type: String
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    relationshipstatus: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    issues: {
        type: [String]
    },
    subscriptionStart: {
        type: Date,
        default: Date.now
    },
    subscriptionEnd: {
        type: Date
    },
    subscriptionDays: {
        type: Number,  
    }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    try {
        if (!this.subscriptionEnd && this.subscriptionDays) {
            const startDate = this.subscriptionStart || new Date();
            this.subscriptionEnd = new Date(startDate.getTime() + this.subscriptionDays * 24 * 60 * 60 * 1000);
        }
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);

export default User;
