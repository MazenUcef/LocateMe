import express from 'express';
import { SignUp } from '../controllers/authController';
import { validateAuthUser } from '../middleware/validation';



const router = express.Router()


router.post('/signup', validateAuthUser, SignUp)


export default router;