const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
require('dotenv').config();

app.use(express.json());


app.listen(port, () => {
  console.log(`Poké Ipsum running on http://localhost:${port}`);
});

module.exports = app;
