const express = require('express');
const router = express.Router();
// const authController = require('../controllers/auth.controller');
// const validate = require('../validations/auth.validation');
const passport = require('passport')


// protected.routes.js
router.use(passport.authenticate('jwt', { session: false }));

router.get('/dashboard', (req, res) => {
    res.json({ msg: 'dashboard Profile route', user: req.user });
});
router.get('/account', (req, res) => {
    res.json({ msg: 'dashboard Profile route', user: req.user });
});

module.exports = router;