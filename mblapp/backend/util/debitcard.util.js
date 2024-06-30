import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const createDebitCardPaymentIntent = async (amount, currency) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: ['card'],
        });

        return paymentIntent;
    } catch (error) {
        throw new Error(`Error creating payment intent: ${error.message}`);
    }
};


export const confirmDebitCardPayment = async (paymentIntentId, paymentMethodId) => {
    try {
        const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
            payment_method: paymentMethodId,
        });

        return paymentIntent;
    } catch (error) {
        throw new Error(`Error confirming payment intent: ${error.message}`);
    }
};


export const createCharge = async (amount, currency, source, description) => {
    try {
        const charge = await stripe.charges.create({
            amount,
            currency,
            source,
            description,
        });

        return charge;
    } catch (error) {
        throw new Error(`Error creating charge: ${error.message}`);
    }
};
