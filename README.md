# React-Seed-Basic With Redux

This is a fully functional basic React app seed. It comes with Redux already set up, and uses Node, Express, Massive, and SQL for the back end.

## To Use This Seed

1. Clone this seed
2. In the terminal, navigate to the project folder and run 'npm i'
3. Create a 'config.js' file in the server folder (It is already ignored).

#### Should look something like this
```javascript
module.exports = {
  secret: "aetbmjljfcbn!%$*$nkrlhlkhnannalvlwher#$%66345nlk",
  connection: {
    host: //host (you'll find this info in your heroku db),
    port: //port,
    database: //database,
    user: //user,
    password: //password
    ssl: true
  },
  port: 3000
};
```

4. Use npm start while building the front end
5. Navigate to the project folder and run nodemon to connect to your back end
