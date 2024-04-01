const express = require('express');

const app = express();

app.listen(9362);

app.get('/',(req, res) => {
    res.sendFile('./views/login.html',{ root:__dirname});
});