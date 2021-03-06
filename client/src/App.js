import { Card, CardHeader, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import classNames from 'classnames';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import http from 'superagent';
import io from 'socket.io-client';
import moment from 'moment';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

import './App.css';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#D32F2F'
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      posts: [],
      isPosting: false,
      newPostId: undefined
    };
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <AppBar iconElementLeft={<div />} />
          <div className="App-main">
            <form className="App-postForm" onSubmit={this._handleSubmit}>
              <div className="App-textInputContainer">
                <TextField
                  className="App-textInput"
                  disabled={this.state.isPosting}
                  id="App-textInput"
                  value={this.state.text}
                  onChange={this._handleChangeTextInput}
                  fullWidth hintText="Say something!"
                  autoComplete="off"
                  errorText={this.state.text.length > 140 ? "Must be fewer than 140 characters" : undefined}
                />
                <div className="App-postFormActions">
                  <span>{140 - this.state.text.length}</span>
                  <RaisedButton type="submit" primary label="Post" disabled={this.state.isPosting || this.state.text.length === 0 || this.state.text.length > 140} />
                </div>
              </div>
            </form>
            <div className="App-posts">
              {this.state.posts.slice(0, 20).map(this._renderPost)}
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }

  _renderPost = post => {
    const className = classNames('App-post', { isNew: post.id === this.state.newPostId });
    return (
      <Card className={className} key={post.id}>
        <CardHeader title={post.isBot ? 'Bot' : 'Human'} subtitle={moment(post.timeCreated).fromNow()} avatar={post.isBot ? '/bot.png' : '/anon.png'} />
        <CardText>
          {post.text}
        </CardText>
      </Card>
    );
  }

  componentDidMount() {
    const socket = io();
    socket.on('newPost', post => {
      this.setState(prevState => ({
        ...prevState,
        posts: [ post, ...prevState.posts ],
        newPostId: post.id,
      }));

      setTimeout(() => {
        this.setState(prevState => ({
          ...prevState,
          newPostId: undefined
        }));
      }, 50);
    });

    http.get('http://localhost:8082/api/posts')
      .send()
      .then(response => {
        this.setState(prevState => ({
          ...prevState,
          posts: response.body
        }));
      });
  }

  _handleChangeTextInput = (event) => {
    const text = event.target.value;
    this.setState(prevState => ({
      ...prevState,
      text
    }));
  }

  _handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ isPosting: true}, () => {
      http.post('http://localhost:8082/api/posts')
        .send({ text: this.state.text })
        .then(response => {
          this.setState(prevState => ({
            ...prevState,
            text: '',
            isPosting: false,
          }));
        });
    });
  }
}

export default App;
