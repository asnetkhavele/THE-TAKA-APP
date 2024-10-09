const express = require('express');
const app = express();
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

dotenv.config({ path: './.env' });

// Middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Connection to the DB using a pool
function handleDisconnect() {
    const pool = mysql.createPool({
        connectionLimit: 10,  // Adjust the limit according to your application's needs
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        queueLimit: 0
    });

    pool.getConnection((err, connection) => {
        if (err) {
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.error('Database connection lost. Reconnecting...');
                handleDisconnect();  // Reconnect if the connection is lost
            } else {
                console.error('Error connecting to the database: ', err);
                setTimeout(handleDisconnect, 10000);  // Retry after 10 seconds if there's a connection error
            }
        } else {
            console.log('Connected to the database.');

            // Create a table if it doesn't exist
            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS issues (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    location VARCHAR(255) NOT NULL,
                    description TEXT NOT NULL,
                    image VARCHAR(255),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `;

            connection.query(createTableQuery, (err, results) => {
                if (err) {
                    console.error('Error creating table: ', err);
                } else {
                    console.log('Table issues is ready.');
                }
                connection.release();  // Release the connection back to the pool
            });
        }
    });

    pool.on('error', (err) => {
        console.error('Database error: ', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();  // Reconnect if the connection is lost
        } else {
            throw err;
        }
    });

    return pool;
}

const pool = handleDisconnect();


   // Routes

   // Report an issue
   app.post('/public/issues', (req, res) => {
    const { location, description, image } = req.body;
    const query = 'INSERT INTO issues (location, description, image) VALUES (?, ?, ?)';
    pool.query(query, [location, description, image], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, location, description, image });
    });
});

// Get all issues
app.get('/public/issues', (req, res) => {
    const query = 'SELECT * FROM issues';
    pool.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

// Express server setup
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
