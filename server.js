const express = require('express');
const app = express();
const PORT = 3000;
const build = `${__dirname}/build`

app.use(express.static(build));
app.get('*', (req, res) => {
  return res.sendFile(`${build}/index.html`);
});

app.listen(PORT, () => {});
