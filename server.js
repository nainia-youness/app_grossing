const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config({path: './config/.env'});



// Express APIs
const api = require('./routes/routes');


// Express settings
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(cors());


// API Routes
app.use('/', api);


// Define PORT
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));



// Express error handling
app.use((req, res, next) => {
    setImmediate(() => {
        next(new Error('Something Went Wrong : 404'));
    });
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
