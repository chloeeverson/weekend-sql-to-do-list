const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const tasksRouter = require('./routes/tasksRouter');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

//routes
app.use('/tasks', tasksRouter);

//start listening to request on specific port
app.listen(PORT, () => {
    console.log('listening on port', PORT);
});