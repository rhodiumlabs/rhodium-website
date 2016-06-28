# rhodium-website
Repo for Rhodium's Website

#Install dependencies
Make sure you have ruby/bundler and node/npm installed
```
 $ cd client && npm install
 $ bundle install
```

#Running prod
1.Build client
```
  $ cd client 
  $ npm install
  $ npm run build
```
2. Run server
``` RACK_ENV=production ruby app.rb ```

#Developing (webpack, hotreload, react, etc)
On one terminal, run the webpack builder
1.Build client
```
  $ cd client 
  $ npm install
  $ node devServer.js
```
2. Run server
``` RACK_ENV=production ruby app.rb ```

