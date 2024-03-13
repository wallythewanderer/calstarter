const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Route to get events and tasks as JSON
app.get("/api/events-tasks", (req, res) => {
    const eventsQuery = "SELECT * FROM Events";
    const tasksQuery = "SELECT * FROM Tasks";
    
    // Execute queries to fetch data (this example assumes both tables exist)
    db.query(eventsQuery, (err, eventsResult) => {
        if (err) {
            console.error('Error fetching events', err);
            return res.sendStatus(500);
        }

        db.query(tasksQuery, (err, tasksResult) => {
            if (err) {
                console.error('Error fetching tasks', err);
                return res.sendStatus(500);
            }

            // Send back a combined JSON object
            res.json({
                events: eventsResult,
                tasks: tasksResult
            });
        });
    });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

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

app.post("/create-event", (req, res) => {
    // Extract event data from request body
    const { title, startDateTime, endDateTime, isRepeating, description } = req.body;
    
    // SQL Query to insert event into the database
    const insertEventSql = `
        INSERT INTO Events (Title, StartDateTime, EndDateTime, IsRepeating, Description)
        VALUES (?, ?, ?, ?, ?);
    `;
    db.query(insertEventSql, [title, startDateTime, endDateTime, isRepeating, description], (err, result) => {
        if (err) {
            // Handle error (maybe render an error page or message)
            console.error('Error inserting event into database', err);
            res.status(500).send('Error inserting event');
        } else {
            // Redirect back to index.html upon successful insertion
            res.redirect('/');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
