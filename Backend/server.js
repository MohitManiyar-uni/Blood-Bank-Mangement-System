const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your React app
}));
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: 'root',
  password: 'mohit123',
  database: 'NewBloodBankDB'
});

db.connect((err) => {
  if (err) {
    console.error('DB connection failed:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.get('/', (req, res) => {
  return res.json("From Backend Side");
});

// GET all donors
app.get('/donors', (req, res) => {
  db.query('SELECT * FROM Donor', (err, results) => {
    if (err) {
      console.error('Error fetching donors:', err);
      res.status(500).json({ error: 'Failed to fetch donors' });
    } else {
      res.json(results);
    }
  });
});

// GET all patients
app.get('/patients', (req, res) => {
  db.query('SELECT * FROM Patient', (err, results) => {
    if (err) {
      console.error('Error fetching patients:', err);
      res.status(500).json({ error: 'Failed to fetch patients' });
    } else {
      res.json(results);
    }
  });
});

// Add new patient
app.post('/add-patient', async (req, res) => {
  const { Name, Age, BloodType, ContactInfo, HospitalID, EmergencyStatus } = req.body;

  if (!Name || !Age || !BloodType || !ContactInfo || !HospitalID || EmergencyStatus === undefined) {
    return res.status(400).json({ message: 'Missing fields in request body' });
  }

  try {
    const query = `
      INSERT INTO Patient (Name, Age, BloodType, ContactInfo, HospitalID, EmergencyStatus)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await db.query(query, [Name, Age, BloodType, ContactInfo, HospitalID, EmergencyStatus]);
    res.status(201).json({ message: 'Patient added successfully' });
  } catch (err) {
    console.error('Error inserting patient:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Add new donor
app.post('/add-donor', (req, res) => {
  const { name, age, bloodType, lastDonationDate, contactInfo, address, healthStatus } = req.body;

  const sql = `
    INSERT INTO Donor (Name, Age, BloodType, LastDonationDate, ContactInfo, Address, HealthStatus)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, age, bloodType, lastDonationDate, contactInfo, address, healthStatus], (err, result) => {
    if (err) {
      console.error('Error inserting donor:', err);
      res.status(500).json({ message: 'Failed to add donor' });
    } else {
      res.status(201).json({ message: 'Donor added successfully' });
    }
  });
});

// Get blood inventory
app.get('/blood-inventory', (req, res) => {
  db.query('SELECT * FROM BloodInventory', (err, results) => {
    if (err) {
      console.error('Error fetching blood inventory:', err);
      res.status(500).json({ error: 'Failed to fetch blood inventory' });
    } else {
      res.json(results);
    }
  });
});

app.listen(3036, () => {
  console.log("Listening on port 3036");
});

