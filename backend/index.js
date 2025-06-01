const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve the resume PDF statically from /public
app.get('/resume', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Anti_CV.pdf'));
});

// Or, to serve all static files in /public (recommended for future assets)
app.use('/public', express.static(path.join(__dirname, 'public')));

// Contact form endpoint (demo: logs to console)
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  // Here you could add email sending or database logic
  console.log('Contact form submission:', { name, email, message });
  res.json({ success: true, message: 'Message received!' });
});

// Health check
app.get('/', (req, res) => res.send('API Running'));

app.get('/certificates', (req, res) => {
  res.json([
    {
      name: "Deep Learning Specialization",
      org: "Coursera",
      img: "/certificates/deep-learning.png",
      file: "/certificates/deep-learning.pdf",
      desc: "A comprehensive specialization covering neural networks, CNNs, RNNs, and more."
    },
    // ...more certificates
  ]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));