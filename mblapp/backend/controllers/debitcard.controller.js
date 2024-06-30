import {
    createDebitCardPaymentIntent,
    confirmDebitCardPayment,
    createCharge
} from '../utils/stripeDebitCard.js';


export const createDebitCardPayment = async (req, res) => {
    const { amount, currency } = req.body;

    try {
        const paymentIntent = await createDebitCardPaymentIntent(amount, currency);
        res.status(201).json(paymentIntent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const confirmDebitCardPayment = async (req, res) => {
    const { paymentIntentId, paymentMethodId } = req.body;

    try {
        const paymentIntent = await confirmDebitCardPayment(paymentIntentId, paymentMethodId);
        res.status(200).json(paymentIntent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const createChargePayment = async (req, res) => {
    const { amount, currency, source, description } = req.body;

    try {
        const charge = await createCharge(amount, currency, source, description);
        res.status(201).json(charge);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
