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

3. Deploying to heroku
Create a branch for heroku (for example: heroku_branch)
Make a commit to add (public/dist/bundle.js) that was generated from step 1  
```git push heroku heroku_branch:master```
