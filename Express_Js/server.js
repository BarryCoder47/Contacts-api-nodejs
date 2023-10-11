const express = require('express');
const dotenv = require('dotenv').config();
const { route } = require('./routes/contactRoutes');
const errorHandler = require('./middleware/errorHandler');

const connectDb = require('./config/dbConnections');

connectDb();
const app = express();
const port = process.config.dotenv || 5001;

app.use(express.json());
app.use("/api/contacts",  require('./routes/contactRoutes'));
app.use("/api/users",  require('./routes/userRoutes'));
app.use(errorHandler) ;

app.listen(port, ()=> {
    console.log(`server is running on the ${port}`);
})