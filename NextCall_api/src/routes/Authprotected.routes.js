const express = require( 'express' );
const router = express.Router();
// const authController = require('../controllers/auth.controller');
// const validate = require('../validations/auth.validation');
const passport = require( 'passport' )
const authController = require( '../controllers/auth.controller' );


// protected.routes.js
router.use( passport.authenticate( 'jwt', { session: false } ) );

router.get( '/dashboard', ( req, res ) => {
    res.json( { msg: 'dashboard Profile route', user: req.user } );
} );
router.get( '/account', ( req, res ) => {
    res.json( { msg: 'dashboard Profile route', user: req.user } );
} );

// This route is protected, it requires a valid JWT token
router.get( '/profile',
    passport.authenticate( 'jwt', { session: false } ),
    ( req, res ) => {
        // ...
    }
);

module.exports = router;