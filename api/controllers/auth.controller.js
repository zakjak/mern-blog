import User from '../models/user.module.js'
import bcrypt from 'bcryptjs'

export const signup = async (req, res) => {
    const { username, email, password } = req.body

    if(!username || !email 
        || !password || 
        username === '' || 
        password === '' || 
        email === '') 
    return res.status(400).json({ message: 'All fields are required' })

    const hashPassword = bcrypt.hashSync(password, 10)
    const newUser = new User({
        username,
        email,
        password: hashPassword
    })

    try{
        await newUser.save()

        res.json('Signup successful')
    }catch(err){
        res.status(500).json({ message: err.message })
    }

}