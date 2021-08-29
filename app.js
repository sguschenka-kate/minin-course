const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const { json } = require('express');

const app = express();

app.use(express.json({ extended: true }));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));


const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useUnifiedTopology: true,
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`)) 
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1)
    }
}

start()
