const express = require('express');
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
// configure cors
const cors = require('cors');
require("dotenv").config();


// import the routes
const registeruser = require('./routes/registeruser');
const createuser = require('./routes/createuser');

const loginuser = require("./routes/loginuser");

const adminrouter = require('./routes/admin');

// middleware

const authenticateToken = require('./middleware/authenticate');
const authenticateAdminToken = require('./middleware/authenticateadmin');

// authenticated routes
const getuser = require('./routes/authenticatedroutes/getuser');
const addInternationalStudentInfo = require("./routes/authenticatedroutes/internationalstudentinfo");
const certificateRouter = require("./routes/authenticatedroutes/certificates");

// admin routes
const questionBankRouter = require("./routes/adminautheticatedroutes/questionbanks");


// Create express app
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors("*"));


mongoose.connect('mongodb+srv://vignanuser:QasQik7m.m2C5Lw@vignanuniversitycluster.tr5ru.mongodb.net/211FA04468', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
    }
);

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use('/api', registeruser);
app.use('/api', createuser);
app.use("/api",loginuser);
app.use('/api/admin', adminrouter);


app.use("/api", authenticateToken, getuser);
app.use("/api", authenticateToken, addInternationalStudentInfo);
app.use("/api", authenticateToken, addInternationalStudentInfo);
app.use("/api", authenticateToken, certificateRouter);


app.use("/api/admin", authenticateAdminToken, questionBankRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});