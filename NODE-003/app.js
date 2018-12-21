const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const Parser = require('rss-parser');
const parser = new Parser();
const PORT = 4321;
const URL = "https://nodejs.org/en/feed/blog.xml";

app
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .all('/', r => r.res.send('Go to /rss'))
  .post('/rss', async (req,res) => {
    try {
      const n = req.body.n;
      let feed = await parser.parseURL(URL);
      let result = {};
      feed.items = (n !== undefined) ? feed.items.slice(0, n) : feed.items;
      feed.items.forEach(item => {
        console.log(item.title + ':' + item.link);
        result[item.title] = item.link;
      });

      res.send(result);
    } catch (e) {
      console.error(e);
      res.send('Something went wrong');
    }
  })
  .listen(process.env.PORT || PORT, () => console.log('Ok!'))