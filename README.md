# HTTP-Framework

To install npm package: npm i Luc-basic-routing

### Summary
This simple HTTP framework will handle routing for all REST methods. This package will do basic routing for on a http server.

### Setup
To initialize the server and the necessary modules, first create a JS file in the root and put in:

```javascript
'use strict'
var customModule = require(__dirname + '/../server');
var router = customModule();
var fs = require('fs');
```

You can name var router anything you want, but you have to keep the naming convention consistent. In my example I'll make a route to /projects. To make a POST request you would:

```javascript
router.post('/projects', (req, res) => {
  req.on('data', (data) => {
    //run code here
    res.end();
  })
})
```

Similarly if you wanted to make GET requests, you would do:

```javascript
router.get('/projects', (req, res) => {
  req.on('data', (data) => {
    //run code here
    res.end();
  })
})
```

Once you have all your methods set up you need to get your server started. You need to insert a few lines of code in whereever you require in the server module file to invoke the server function. for example:
```javascript
function() {
  router.listen(3000, () => {
    console.log('server started');
  })
}
```

Lastly these routes to a data directory that isn't included with the package. Make sure to make a directory in the root named 'data'. More sample requests are also listed in the test directory for more reference material.
