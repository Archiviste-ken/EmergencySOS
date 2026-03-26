const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); 
const connectDB = require('./config/db');
const alertRoutes = require('./routes/alertRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// 1. API Routes
app.use('/api/alerts', alertRoutes);

// ==========================================
//    PRODUCTION SETUP
// ==========================================

// 2. Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// 3. Catch-all route 
// Using a native RegExp /.*/ completely bypasses the path-to-regexp string parser
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ==========================================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));