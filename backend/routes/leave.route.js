import { Router } from 'express'
import { auth } from './../middleware/authMiddleware.js';
import { addLeave, getAllLeaves } from '../controllers/leave.controller.js';

const leaveRouter = Router()

leaveRouter.post("/add", auth, addLeave)
leaveRouter.get("/list/:id", auth, getAllLeaves)

export default leaveRouter