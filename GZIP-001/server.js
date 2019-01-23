const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const trans = require('./trans');
const PORT = 4321;

app
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .post('/zip', (req, res) => {
    res.writeHead(200, {'Content-Disposition': 'attachment; filename=result.zip'});
    req
      .pipe(trans)
      .pipe(require('zlib').createGzip())
      .pipe(res);
  })
  .listen(process.env.PORT || PORT, () => console.log('Ok!'))
