const express = require('express');
const morgan = require('morgan');

const appData = require('./app-data');
const app = express();

app.use(morgan('common'));

app.get('/apps', (req, res) => {
  const { sort, genre = '' } = req.query;
  // const { genre } = req.query;

  console.log('sort is', sort);
  let result;

  let resultsByApp = appData.filter(app => {
    return app.App;
  });

  let resultsByRating = appData.filter(rating => {
    return rating.Rating;
  });

  if (sort && !['rating', 'app'].includes(sort)) {
    return res.status(400).send('Sort must be either rating or app');
  }

  if (sort === 'rating') {
    result = resultsByRating.sort((a, b) => {
      a.rating < b.rating ? -1 : 1;
      console.log('rating', result);
      res.set('Content-Type', 'application/json');
      res.json(result);
    });
  } else if (sort === 'app') {
    result = resultsByApp.sort((a, b) => {
      a.app < b.app ? -1 : 1;
      console.log('sorting', result);
      res.set('Content-Type', 'application/json');
      res.json(result);
    });
  } else {
    const results = appData.map(app => app);
    console.log('hi');
    res.set('Content-Type', 'application/json');
    res.json(results);
  }
});

app.listen(8000, () => {
  console.log('Listening on PORT 8000');
});
