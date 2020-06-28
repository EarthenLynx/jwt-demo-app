![](https://jwt.io/img/pic_logo.svg)

Reference: https://jwt.io

# Json Webtokens Demo file

Demo: https://jwt-auth-demo.herokuapp.com/login

## Clone the repos

```sh
$ git clone https://github.com/EarthenLynx/jwt-demo-app
```

## Navigate into the directory and run the npm dev - command

```sh
$ npm run dev
```

## Open your browser at 127.0.0.1:3000

- This demo uses lowdb for data storage. 
- The login credentials are base64 encoded, saved, and decoded when needed to fetch the username. 
- You can find the database under store/users.json.
- The token is automatically saved in the client's localstore as a cookie and can be sent back and forth for verification
- The key to verify the jwt itself is stored under store/signature.key
- See https://jwt.io for more information on the topic
