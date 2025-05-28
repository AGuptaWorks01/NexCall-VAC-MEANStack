const User = require('../models/user.model');
const { hasdPassword, comparePassword } = require('../utils/hash')
const { generateToken } = require('../utils/jwt')

exports.register = async ({ name, email, password }) => {
    const existingUser = await User.findOne({ email })
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await hasdPassword(password)
    const user = await User.create({ name, email, password: hashedPassword })

    return {
        message: 'User registered successfully',
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    };
}

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email })
    console.log("user", user)

    if (!user) throw new Error("Invalid credentails");

    const match = await comparePassword(password, user.password)
    console.log("match", match)
    if (!match) throw new Error('Invalid credentials');

    const token = generateToken({ userId: user.id })
    return { message: 'Login successful', token };
}