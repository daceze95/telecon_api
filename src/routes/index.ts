import express, { Application } from 'express';
import { indexController } from '../controllers/indexController';
import { login, register } from '../controllers/userController';
const router = express.Router();

const API_AUTH = "/auth"

/* GET home page. */
router
.get('/', indexController as Application)
.post(`${API_AUTH}/signup`, register as Application)
.post(`${API_AUTH}/login`, login )

export default router;
