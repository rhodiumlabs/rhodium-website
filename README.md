# Rhodium's website
Repo for Rhodium's Website

#Install dependencies
Make sure you have ruby/bundler and node/npm installed
```
 $ cd client && npm install
 $ bundle install
```

#Developing (webpack, hotreload, react, etc)
On one terminal, run the webpack builder

1. On one terminal, start building the client
```
  $ cd client 
  $ node devServer.js
```
2. Run server on the second terminal
``` 
  $ ruby app.rb 
```


#Running/building for production
1.Build client
```
  $ cd client 
  $ npm install
  $ npm run build
```
2. Run server
``` RACK_ENV=production ruby app.rb ```

