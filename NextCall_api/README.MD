nextcall_backend/
│
├── 📁 src/                          # All application logic lives here
│   ├── 📁 config/                   # App-wide config (env, constants)
│   │   └── socket.config.js
│   │
│   ├── 📁 controllers/             # Business logic
│   │   └── call.controller.js
│   │
│   ├── 📁 routes/                  # REST API routes
│   │   └── call.routes.js
│   │
│   ├── 📁 services/                # Service layer (abstracts controller logic)
│   │   └── call.service.js
│   │
│   ├── 📁 sockets/                 # Socket.io event handling
│   │   └── call.socket.js
│   │
│   ├── 📁 utils/                   # Reusable helper functions
│   │   └── logger.js
│   │
│   ├── 📁 middleware/             # Express middlewares (auth, error handling, etc.)
│   │   └── errorHandler.js
│   │
│   ├── 📁 models/                 # Database models (MongoDB, SQL, etc.)
│   │   └── user.model.js
│   │
│   ├── 📁 validations/            # Joi or Zod schema validations
│   │   └── call.validation.js
│   │
│   ├── server.js                  # Entry point (creates Express app, Socket.io)
│   └── app.js                     # Express app setup (middlewares, routes)
│
├── 📁 public/                      # Static files, if any (index.html, icons)
│
├── 📁 logs/                        # Log files (if using a logger like Winston)
│
├── .env                            # Environment variables
├── .gitignore                      # Git ignore rules
├── package.json                    # Project metadata and dependencies
└── README.md                       # Project documentation
