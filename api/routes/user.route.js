import express from 'express'
import { signup } from '../controllers/auth.controller.js'
import { deleteUser, getUser, getUsers, signout, updateUser } from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

router.post('/signup', signup)
router.put('/update/:userId', verifyToken,updateUser)
router.delete('/delete/:userId', verifyToken, deleteUser)
router.post('/signout', signout)
router.get('/getusers', verifyToken, getUsers)
router.get('/:userId', getUser)
export default router