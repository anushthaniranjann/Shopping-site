const express = require('express');
require('./db/mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();

const port = process.env.PORT;

app.use(express.json());

app.use(userRouter);

app.use(taskRouter);

app.listen(port, () => {
    console.log("Server is running at " + port);
});

//token = header.payload.signature--base64decode.org

//middleware-- neqw request-->run a function or something---> new route handler