import { Router } from 'express';
import {
    createSubscription,
    getSubscriptions,
    updateSubscription,
    deleteSubscription,
} from '../controllers/subscription.controller.js';

const router = Router();

// Route to create a subscription
router.post('/sub', createSubscription);

// Route to get all subscriptions
router.get('/', getSubscriptions);

// Route to update a subscription
router.post('/update/:id', updateSubscription);

// Route to delete a subscription
router.get('/delete/:id', deleteSubscription);

export default router;
