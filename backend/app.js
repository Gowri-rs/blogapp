const express = require('express');
const cors = require('cors');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes')

require('dotenv').config();
const connectDB = require('./db')

const app = express();

app.use(cors());
app.use(express.json());
app.use('/blog', blogRoutes)
app.use('/user', userRoutes)

connectDB();

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`app is running on http://localhost:${PORT}`)
})