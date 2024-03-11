const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Configure express to use ejs
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

// Database connection setup
const db = mysql.createConnection({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database', err);
    return;
  }
  console.log('Database connection established');
});

// Define a route for the home page
app.get("/", (req, res) => {
    // CURRENTLY PLACEHOLDER; Ideally fetch events and tasks from database
    res.render("index", { events: [], tasks: [] });
});

// Route for event details
app.get("/events/:id", (req, res) => {
    // Placeholder query for fetching event details by ID
    const query = "SELECT * FROM Events WHERE EventID = ?";
    db.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error fetching event details', err);
            return res.sendStatus(500);
        }
        res.render("event_detail", { event: result[0] });
    });
});

// Route for task details
app.get("/tasks/:id", (req, res) => {
    // Placeholder query for fetching task details by ID
    const query = "SELECT * FROM Tasks WHERE TaskID = ?";
    db.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error fetching task details', err);
            return res.sendStatus(500);
        }
        res.render("task_detail", { task: result[0] });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
