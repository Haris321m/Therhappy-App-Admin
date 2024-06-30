import express from 'express';
import {
    createDebitCardPayment,
    confirmDebitCardPayment,
    createChargePayment
} from '../controllers/paymentController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-payment-intent', authMiddleware, createDebitCardPayment);
router.post('/confirm-payment', authMiddleware, confirmDebitCardPayment);
router.post('/create-charge', authMiddleware, createChargePayment);

export default router;
