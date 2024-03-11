const mysql = require('mysql');

// Database connection information (replace with your actual data)
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database', err);
    return;
  }
  console.log('Connection established');
});

// SQL statements to create tables

const createEventsTable = `
CREATE TABLE IF NOT EXISTS Events (
  EventID INT AUTO_INCREMENT PRIMARY KEY,
  Title VARCHAR(45) NOT NULL,
  StartDateTime DATETIME NOT NULL,
  EndDateTime DATETIME NOT NULL,
  IsRepeating TINYINT(1) NOT NULL DEFAULT 0,
  Description TINYTEXT
);
`;

const createTasksTable = `
CREATE TABLE IF NOT EXISTS Tasks (
  TaskID INT AUTO_INCREMENT PRIMARY KEY,
  Title VARCHAR(45) NOT NULL,
  Deadline DATETIME NOT NULL,
  Description TINYTEXT
);
`;

const createSubtasksTable = `
CREATE TABLE IF NOT EXISTS Subtasks (
  SubtaskID INT AUTO_INCREMENT PRIMARY KEY,
  TaskID INT,
  Title VARCHAR(45) NOT NULL,
  EstimatedDuration DECIMAL(10, 0),
  FOREIGN KEY (TaskID) REFERENCES Tasks(TaskID)
);
`;

// Execute SQL statements to create tables

db.query(createEventsTable, (err, results) => {
  if (err) throw err;
  console.log("Events table created or already exists.");
});

db.query(createTasksTable, (err, results) => {
  if (err) throw err;
  console.log("Tasks table created or already exists.");
});

db.query(createSubtasksTable, (err, results) => {
  if (err) throw err;
  console.log("Subtasks table created or already exists.");
});

require('dotenv').config();

// Close the database connection
db.end();
