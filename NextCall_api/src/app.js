const express = require('express');
const cors = require('cors');
const path = require("path")
const auth = require('./routes/auth.routes')
const passport = require('./congif/passport-jwt');

const app = express();
// Middleware
app.use(cors({
    origin: "*"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
// Initialize passport middleware

app.use(express.static(path.join(__dirname, "../public")))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname), "../public/index.html")
})

app.use("/api", auth)

module.exports = app;
