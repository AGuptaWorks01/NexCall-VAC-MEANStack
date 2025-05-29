const authService = require( '../services/auth.service' )

exports.register = async ( req, res ) => {
    try
    {
        const result = await authService.register( req.body )
        res.status( 201 ).json( result )
    } catch ( err )
    {
        res.status( 500 ).json( { error: err.message } );
    }
}

exports.login = async ( req, res ) => {
    try
    {
        const result = await authService.login( req.body )
        res.status( 200 ).json( result )
    } catch ( err )
    {
        res.status( 401 ).json( { error: err.message } )
    }
}

exports.get = async ( req, res ) => {
    try
    {
        const result = await authService.getall( req.body )
        res.status( 200 ).json( result )
    } catch ( err )
    {
        res.status( 401 ).json( { error: err.message } )
    }
}