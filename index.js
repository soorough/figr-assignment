require('dotenv').config();
const express = require('express');
// const cors = require('cors');
const rootRouter = require('./routes/index');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// // Configure CORS middleware
// app.use(cors({
//     origin: ['http://localhost:3000', 'https://figr-assignment.vercel.app', 'https://papaya-dasik-127f0d.netlify.app'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
// }));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set the root route for the API
app.use('/api/v1', rootRouter);

// Serve static files
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// Catch-all route for handling other routes and sending index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Start the server and listen on the specified port
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server is listening on port ${PORT}`);
    }
});
