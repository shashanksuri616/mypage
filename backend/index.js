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
    {
      name: "ML Spark - Tvastr’25 Analytics Fest (2nd Place)",
      org: "University of Hyderabad",
      img: "/certificates/ml-spark-tvastr25.png",
      file: "/certificates/ml-spark-tvastr25.pdf",
      desc: "Secured Second place in ML Spark at Tvastr’25 – The Analytics Fest, organized by Analytics Club, School of Management Studies, University of Hyderabad."
    },
    {
      name: "ML Quest Hackathon (4th Place)",
      org: "IEEE CIS SBC, GHRCE",
      img: "/certificates/ml-quest-hackathon.png",
      file: "/certificates/ml-quest-hackathon.pdf",
      desc: "Achieved 4th position for the problem statement 'Identifying Fake Job Listings' in the ML Quest Hackathon organized by IEEE CIS SBC, GHRCE."
    },
    {
      name: "Microsoft Azure Fundamentals",
      org: "Microsoft",
      img: "/certificates/azure-fundamentals.png",
      file: "/certificates/Azure.pdf",
      desc: "Certified in Microsoft Azure Fundamentals, demonstrating foundational knowledge of cloud services and how those services are provided with Microsoft Azure."
    },
    {
      name: "Data Science Certificate",
      org: "DataCamp",
      img: "/certificates/datacamp-ds.png",
      file: "/certificates/datacamp-ds.pdf",
      desc: "Completed Data Science track covering Python, statistics, machine learning, and data visualization."
    },
    {
      name: "AI For Everyone",
      org: "Coursera",
      img: "/certificates/ai-for-everyone.png",
      file: "/certificates/ai-for-everyone.pdf",
      desc: "Non-technical introduction to AI, its societal impact, and how to navigate an AI-powered world."
    }
  ]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));