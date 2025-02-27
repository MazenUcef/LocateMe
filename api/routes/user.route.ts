import express from 'express';
import { test } from '../controllers/userController';


const router = express.Router();


router.use('/test', test)


export default router;