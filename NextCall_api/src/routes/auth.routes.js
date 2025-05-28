const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const validate = require('../validations/auth.validation');
const passport = require('passport')
// const authMiddleware = require('../middleware/auth.middleware')

router.post('/register', validate.register, authController.register);
router.post('/login', validate.login, authController.login);
// router.get('/protected', authMiddleware, (req, res) => {
//     res.json({ msg: 'This is a protected route', user: req.user });
// });

router.get('/protected',
    passport.authenticate('jwt', { session: false })
    , (req, res) => {
        res.json({ msg: 'This is a protected route', user: req.user });
    });

module.exports = router;