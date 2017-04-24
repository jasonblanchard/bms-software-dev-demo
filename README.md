This document describes how to run this web development demo. If you're not ready for that yet or just want to learn more about software development in general, read this [Software Development Career Information](software-development.md) document.

# web-dev-demo
This is a small web app to demonstrate Web and mobile software development. There are 3 parts:

- A *server-side API* that accepts HTTP requests. This usually runs on a "server" in a remote data center, but you can run it locally on your computer for development. All the code for the APi server is in the `server/` directory (a "directory" is just a folder on your computer).
- A browser-based *web client app*. This is the application that you see in your browser. All the code for the web client are in the `/client` directory.
- A *bot* that is programmed to act like a user interacting with the app. It randomly posts lines from the movie Back To The Future, but can be modified to post about anything. All the code for the bot is in the `bot/` directory.

All three parts are written in a programming language called [JavaScript](https://www.javascript.com/).

## Before you get started
Install required dependencies (stuff you need to get the project running)

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/)

Most of the rest of these directions require you to use command line tool to execute commands. If you are on a Mac, use the built-in "Terminal" application. If you are on Windows, try installing [Git BASH](https://git-for-windows.github.io/).

You should get [comfortable with the command line](http://lifehacker.com/5633909/who-needs-a-mouse-learn-to-use-the-command-line-for-almost-anything) before moving on.

If you get stuck on any of the steps, try researching the underlying technologies (Git, JavaScript, Node.js, Yarn, [React](https://facebook.github.io/react/)) to understand more about it. Always try Googling the problem you are having - chances are, someone has an answer on [Stack Overflow](https://stackoverflow.com/questions/tagged/javascript)!

## Get the code

Use Git to clone the codebase from this website:

```
$ git clone git@github.com:jasonblanchard/web-dev-demo.git
```

Use the `cd` command to go into the `web-dev-demo` directory. 

## Starting the API
Run this command inside the `web-dev-demo` directory to start the API server:

```
$ yarn watch
```

You should see the text `Listening on 8082` in the command line.

## Starting the Web client
Open up a new command line window and `cd` into the `web-dev-demo/client` directory. Run this command to start the Web client:

```
$ yarn start
```

You should see `Compiled successfully!` in the terminal. A browser window should open the client application. If it doesn't try typing this into the URL bar in your browser: `http://localhost:3000`

## Starting the automated bot
Open up a new terminal window, and `cd` into the `web-dev-demo` directory. Run this command to start the bot:

```
$ yarn start-bot
```

You should see the text `Starting the bot!` before it starts automatically posting to the app.
