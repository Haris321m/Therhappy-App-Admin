import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser, login ,updateSubscription } from '../controllers/user.controller.js';
import isAdmin from '../middlewares/admin.middleware.js'; 
import upload from '../middlewares/multer.middleware.js';
import passport from 'passport';


const router = express.Router();

router.post('/signup',createUser);
router.post('/login', login);
router.get('/auth/google' , passport.authenticate('google', { scope: 
	[ 'email', 'profile' ] 
})); 
router.get("/auth/google/callback", passport.authenticate('google', {
    failureRedirect: "/failure"
}), (req, res) => {
    res.redirect('/success'); 
});
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/success',
    failureRedirect: '/failure'
}));
router.get('/auth/apple', passport.authenticate('apple', { scope: ['name', 'email'] }));
router.post('/auth/apple/callback', passport.authenticate('apple', {
    successRedirect: '/success',
    failureRedirect: '/failure'
}));
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', upload.single("img"),isAdmin,updateUser);
router.delete('/:id', deleteUser);
router.put('/users/:userId/subscription', updateSubscription);

export default router;
