![](https://jwt.io/img/pic_logo.svg)

Reference: https://jwt.io

# Json Webtokens Demo Application

Demo: https://jwt-sessions.herokuapp.com/login

## Clone the repos

```sh
$ git clone https://github.com/EarthenLynx/jwt-demo-app
```

## Navigate into the directory and run the npm dev - command

```sh
$ npm run dev
```

## Open your browser at 127.0.0.1:3000

- This demo uses mongodb atlas for data storage. 
- For a local environment, you'll need to use the [Node dotenv package](https://www.npmjs.com/package/dotenv) and use an .env file to store: 
  - DB_URL=[Your mongodb URL]
  - SECRET=[The signature to verify your JWT with]
- See https://jwt.io for more information on the topic
