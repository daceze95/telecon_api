import express from 'express';
import { forgotPassword, getUser, getUsers, uploadProfile, userController } from '../controllers/userController';
import { authMiddleWare } from '../auth/index';
import { upload } from '../utils/index';

const router = express.Router();

/* GET users listing. */
router
// .get('/', userController )
.get('/', getUsers )
.get('/:userId', getUser )
.post('/upload-profile', authMiddleWare, upload.single('avatar'), uploadProfile)
.post('/forgot-password', forgotPassword)

export default router;