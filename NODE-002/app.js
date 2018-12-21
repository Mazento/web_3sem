const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const PORT = 4321;
const URL = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20woeid%3D%222123260%22)%20and%20u%3D'c'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

app
  .use(cors())
  .get('/', r => r.res.send('Go to /weather'))
  .get('/weather', async (req,res) => {
    try {
      const query = await axios.get(URL).then(x =>
        x.data.query.results.channel.item.forecast[1].low);
      res.send(query);
    } catch (e) {
      console.error(e);
      res.send('Something went wrong');
    }
  })
  .listen(process.env.PORT || PORT, () => console.log('Ok!'))
