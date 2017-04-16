import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import moment from 'moment';
import uuid from 'uuid/v4';

const app = express();
app.use(bodyParser.json());

const server = http.Server(app);

const posts = [
  {
    id: uuid(),
    text: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras mattis consectetur purus sit amet fermentum.',
    timeCreated: '2017-04-16T11:27:39-04:00'
  },
  {
    id: uuid(),
    text: 'Curabitur blandit tempus porttitor.',
    timeCreated: '2017-04-14T11:27:13-04:00',
  },
];

app.get('/', (request, response) => {
  response.send('working');
});

app.get('/api/posts', (request, response) => {
  response.json(posts);
});

app.post('/api/posts', (request, response) => {
  const post = {
    id: uuid(),
    text: request.body.text,
    timeCreated: moment().format()
  }
  posts.unshift(post);
  response.json(post);
});

server.listen(8082, () => {
  console.log('Listening on 8082');
});
