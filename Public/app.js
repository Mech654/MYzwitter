const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors());


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'zwitter_db'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        return;
    }
    console.log('Connected to the MySQL database.');
});






app.post('/register', (req, res) => {
    const { Email, Username, Password } = req.body;

    const query = 'INSERT INTO users (Email, Username, Password) VALUES (?, ?, ?)';
    connection.query(query, [Email, Username, Password], (err, results) => {
        if (err) {
            console.error('Error inserting user:', err.message);
            res.status(500).send('Error inserting user');
            return;
        }
        res.status(201).json({ id: results.insertId, Email, Username });
    });
});



app.post('/login', (req, res) => {
    const { User, Password } = req.body;
    const query = 'SELECT * FROM users WHERE Email = ? OR Username = ?';
    connection.query(query, [User, User], (err, results) => {
        if (err) {
            console.error('Error during user lookup:', err.message);
            res.status(500).send('Error during authentication');
            return;
        }

        if (results.length > 0) {
            const user = results[0];
            // Check if the provided password matches the stored password
            if (user.Password === Password) {
                res.status(200).json({
                    message: 'Login successful',
                    user: {
                        id: user.id,
                        Email: user.Email,
                        Username: user.Username,
                    }
                });
            } else {
                // User found, but password is incorrect
                res.status(401).send('Incorrect password');
            }
        } else {
            // No user found with the provided Email or Username
            res.status(404).send('User not found');
        }
    });
});







app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});