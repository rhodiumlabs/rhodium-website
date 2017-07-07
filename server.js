import express from 'express';

import React from 'react';
import {renderToString} from 'react-dom/server';
import { RoutingContext, match } from 'react-router';
import { Provider } from 'react-redux';
import os from 'os';
import createLocation from 'history/lib/createLocation';

import configureStore from './src/store/configureStore.prod';
import routes from './src/routes';

const port = process.env.PORT || 8080;
const hostname = os.hostname();
const PUBLIC_DEV_SERVER = `http://${hostname}:4000`
const app = express();
const renderFullPage = (html, initialState) => {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Rhodium Labs</title>
        <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/favico/apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/favico/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/favico/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/favico/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon-precomposed" sizes="60x60" href="/favico/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon-precomposed" sizes="120x120" href="/favico/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon-precomposed" sizes="76x76" href="/favico/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/favico/apple-touch-icon-152x152.png" />
        <link rel="icon" type="image/png" href="/favico/favicon-196x196.png" sizes="196x196" />
        <link rel="icon" type="image/png" href="/favico/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/png" href="/favico/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/favico/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" type="image/png" href="/favico/favicon-128.png" sizes="128x128" />
        <meta name="application-name" content="&nbsp;"/>
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-TileImage" content="/favico/mstile-144x144.png" />
        <meta name="msapplication-square70x70logo" content="/favico/mstile-70x70.png" />
        <meta name="msapplication-square150x150logo" content="/favico/mstile-150x150.png" />
        <meta name="msapplication-wide310x150logo" content="/favico/mstile-310x150.png" />
        <meta name="msapplication-square310x310logo" content="/favico/mstile-310x310.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="rhodium is a technology studio with expertise in ambient intelligence and decentralized systems. We assemble multidisciplinary teams to tackle challenges in healthcare, education, and financial services.">
          
        <!-- for Facebook -->          
        <meta property="og:image" content="/favico/mstile-310x310.png" />


        <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css">
        ${(process.env.NODE_ENV === 'production') ? '<link rel="stylesheet" href="/dist/styles.css">' : '' }
        <script>
         (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        ga('create', 'UA-82046656-1', 'auto');
        ga('send', 'pageview');
        </script>
	<!-- Start of HubSpot Embed -->
          <script type="text/javascript" src="//js.hs-scripts.com/2707047.js" id="LeadinEmbed-2707047" crossorigin="use-credentials" async defer></script>
        <!-- End of HubSpot Embed -->
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}; 
        </script>
        ${(process.env.NODE_ENV === 'production') ? '<script src="/dist/bundle.js"></script>': '<script src="'+PUBLIC_DEV_SERVER+'/bundle.js"></script>'}
      </body>
    </html>
  `;
}

app.use('/', express.static(__dirname + '/public/'));

app.get('/*', function (req, res) {

  const location = createLocation(req.url);


  match({ routes, location }, (err, redirectLocation, renderProps) => {

    if(err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if(!renderProps)
      return res.status(404).end('Not found');

    const store = configureStore();

    const InitialView = (
      <Provider store={store}>
          <RoutingContext {...renderProps} />
      </Provider>
    );
    const componentHTML = renderToString(InitialView);
    const initialState = store.getState();
    res.send(renderFullPage(componentHTML,initialState))

  });

});


const server = app.listen(port, function () {
  console.log('Example app listening at http://%s:%s', '0.0.0.0', port);
});
