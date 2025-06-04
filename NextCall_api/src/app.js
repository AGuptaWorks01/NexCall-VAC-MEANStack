const express = require( 'express' );
const cors = require( 'cors' );
const path = require( "path" );
const helmet = require( 'helmet' );
const morgan = require( 'morgan' );
const compression = require( 'compression' );
const crid = require( 'connect-rid' );
const swaggerUi = require( 'swagger-ui-express' );
const YAML = require( "yamljs" );

const auth = require( './routes/auth.routes' );
const protectedauth = require( './routes/Authprotected.routes' );
const passport = require( './congif/passport-jwt' );
const swaggerDocument = YAML.load( './src/docs/swagger.doc.yaml' )

const app = express();

// ======== MIDDLEWARE SETUP ========

// Enable Cross-Origin Resource Sharing (CORS)
app.use( cors( {
    origin: '*',
    methods: [ 'GET', 'POST', 'PUT', 'DELETE' ],
    allowedHeaders: [ 'Content-Type', 'Authorization' ]
} ) );

// Parse JSON and URL-encoded bodies
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );

app.use( ( req, res, next ) => {
    res.setHeader(
        'Content-Security-Policy',
        "script-src 'seld';"
    );
    next()
} )




// Security HTTP headers with Helmet
app.use( helmet() );

// HTTP request logger (use 'combined' for detailed logs or 'dev' for development)
app.use( morgan( 'dev' ) );

// Compress response bodies for all requests
app.use( compression() );

// Assign unique request IDs (UUID) to each incoming request for better logging/tracking
app.use( crid() );

// Initialize Passport middleware for JWT authentication
app.use( passport.initialize() );

// Serve static files from public folder
app.use( express.static( path.join( __dirname, "../public" ) ) );

// Basic route for home page
app.get( "/", ( req, res ) => {
    res.sendFile( path.join( __dirname, "../public/index.html" ) );
} );

// Register API routes
app.use( "/api", auth );
app.use( "/api", protectedauth );

app.use( "/api-docs", swaggerUi.serve, swaggerUi.setup( swaggerDocument ) )

module.exports = app;
