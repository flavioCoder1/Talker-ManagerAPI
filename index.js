const express = require('express');
const bodyParser = require('body-parser');
const loginController = require('./controllers/loginController');
const talkerController = require('./controllers/talkerController');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/login', loginController);
app.use('/talker', talkerController);

app.listen(PORT, () => {
  console.log('Online');
});
