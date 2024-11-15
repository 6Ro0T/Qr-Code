const express = require('express');
const fs = require('fs').promises;
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data.json');

app.post('/api/register', async (req, res) => {
  try {
    // Read existing data
    const fileData = await fs.readFile(DATA_FILE, 'utf8');
    const data = JSON.parse(fileData);

    // Add new registration with timestamp
    const newRegistration = {
      ...req.body,
      id: Date.now(),
      registrationDate: new Date().toISOString()
    };

    data.registrations.push(newRegistration);

    // Write back to file
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));

    res.status(201).json({ message: 'Registration successful', data: newRegistration });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/qr-code/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const fileData = await fs.readFile(DATA_FILE, 'utf8');
    const data = JSON.parse(fileData);
    const registration = data.registrations.find(reg => reg.id === Number(id));

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    res.status(200).json({ registrationData: registration });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
