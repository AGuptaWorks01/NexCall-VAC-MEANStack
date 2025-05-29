require( 'dotenv' ).config(); // Load environment variables from .env file

const cluster = require( 'cluster' );
const os = require( 'os' )
const http = require( "http" );
const app = require( "./app" )
const { setupSocket } = require( "./congif/socket.config" )
const connectToMongo = require( "./congif/db.config" );

const PORT = process.env.PORT || 3000;
const numCPUS = os.cpus().length;

if ( cluster.isMaster )
{
    console.log( `Master ${ process.pid } is running` );

    for ( let i = 0; i < numCPUS; i++ )
    {
        cluster.fork()
    }

    cluster.on( 'exit', ( worker, code, signal ) => {
        console.log( `Worker ${ worker.process.pid } died. Restarting...` );
        cluster.fork();
    } );
} else
{
    // Worker processes

    // Connect to DB only once per process
    connectToMongo();

    // Create HTTP server with socket support
    const server = http.createServer( app );

    setupSocket( server ); // Attach WebSocket

    server.listen( PORT, () => {
        console.log( `Worker ${ process.pid } is running at http://localhost:${ PORT }` );
    } );
}