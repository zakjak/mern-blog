import express from 'express'
import { signup } from '../controllers/auth.controller.js'
import { deleteUser, updateUser } from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

router.post('/signup', signup)
router.put('/update/:userId', verifyToken,updateUser)
router.delete('/delete/:userId', verifyToken, deleteUser)

export default router