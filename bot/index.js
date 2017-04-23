import fs from 'fs';
import isEmpty from 'lodash.isempty';
import random from 'lodash.random';
import http from 'superagent';

const API_BASE_URL = 'http://localhost:8082';

const text = fs.readFileSync(__dirname + '/bttf.txt', 'utf8');
const lines = text.split('\n\n').filter(text => !isEmpty(text));
let timeoutDuration;

function sendPost() {
  const randomIndex = random(0, lines.length);
  const text = lines[randomIndex]
  timeoutDuration = random(2000, 10000);

  http.post(API_BASE_URL + '/api/posts')
    .send({
      text,
      isBot: true
    }).then(response => {
      console.log('\n');
      console.log('Response body: ', response.body);
      console.log('Response status: ', response.status);
      console.log('Next request in: ', timeoutDuration, 'ms');
      console.log('\n');
    }).catch(error => {
      console.log(error.message);
    });

    setTimeout(sendPost, timeoutDuration);
}

sendPost();
