import express, { Application, RequestHandler } from 'express';
import { getUser, getUsers, uploadProfile, userController } from '../controllers/userController';
import { authMiddleWare } from '../auth/index';
import { upload } from '../utils/index';

const router = express.Router();

/* GET users listing. */
router
// .get('/', userController as Application)
.get('/', getUsers as Application)
.get('/:userId', getUser as Application)
.post('/upload-profile', authMiddleWare as RequestHandler, upload.single('avatar'), uploadProfile as RequestHandler)

export default router;
