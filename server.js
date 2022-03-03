const express = require('express');
const app = express();
const PORT = 3000;
const build = `${__dirname}/build`

function serverIndex(req, res) {
  return res.sendFile(`${build}/index.html`);
}

app.use(express.static(build));
app.get('*', serverIndex);

app.listen(PORT, () => {});
