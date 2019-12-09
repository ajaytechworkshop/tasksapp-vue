const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');

const app = express();
app.use(serveStatic('__dirname/dist'));

// Serve the app in the below port
const port = process.env.PORT || 7000;
app.listen(port);
console.log('Tasks webapp  started..', +port);
