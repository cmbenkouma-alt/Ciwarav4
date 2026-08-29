const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

// Alias logo-hitradio.png to logo hitradio.png if requested
app.get('/logo-hitradio.png', (req, res) => {
  const fileWithDash = path.join(__dirname, 'logo-hitradio.png');
  const fileWithSpace = path.join(__dirname, 'logo hitradio.png');
  if (fs.existsSync(fileWithDash)) {
    return res.sendFile(fileWithDash);
  }
  if (fs.existsSync(fileWithSpace)) {
    return res.sendFile(fileWithSpace);
  }
  res.status(404).end();
});

// Serve static assets
app.use(express.static(__dirname));

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Radio Ciwara server listening on http://${HOST}:${PORT}`);
});
