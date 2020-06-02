const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.Port || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/customers', (req, res) => {
    res.send([
        {
          'id': 1,
          'image': 'https://placeimg.com/63/63/1',
          'name': '가길동',
          'birth': '300000',
          'gender': 'M',
          'job': 'student'
        },
        {
          'id': 2,
          'image': 'https://placeimg.com/63/63/2',
          'name': '나길동',
          'birth': '4000000',
          'gender': 'F',
          'job': 'grammer'
        },
        {
          'id': 3,
          'image': 'https://placeimg.com/63/63/3',
          'name': '다길동',
          'birth': '5000000',
          'gender': 'FF',
          'job': 'student'
        }
      ]);
}); 

app.listen(port, () => console.log(`Listening on port ${port}`));