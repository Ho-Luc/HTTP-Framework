'use strict'

var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
var request = chai.request;
var expect = chai.expect;

require(__dirname + '/../server.js');
var customModule = require(__dirname + '/../server');
var router = customModule();
var fs = require('fs');
var isDeleted = false;

//router methods used for testing
router.get('/people', (req, res) => {
  fs.readdir(__dirname + '/../data', (err, files) => {
    if (err) {throw err}
    res.writeHead(200, {'content-type': 'application/json'});
    res.write(' ' +  data);
    res.end();
  })
})

router.post('/people', (req, res) => {
  res.writeHead(200, {'content-type': 'application/json'});
  req.on('data', (data) => {
    var newPerson = JSON.parse(data);
    console.log('before PUT -> ' + data.toString());
    fs.writeFile(__dirname + '/../data/' + newPerson.name + '.json', JSON.stringify('name: ' + newPerson.name), (err) => {
      if (err) {throw err}
    });
    res.end();
  })
})

router.put('/people', (req, res) => {
  res.writeHead(200, {'content-type': 'text/html'});
  req.on('data', (data) => {
    fs.readdir(__dirname + '/../data', (err, files) => {
      if(err) {throw err}
      var readfile = files;
      fs.writeFile(__dirname + '/../data/' + readfile, data.toString(), (err) => {
        if(err) {throw err}
        console.log('after PUT -> ' + data.toString());
        res.write(data.toString());
        res.end();
      })
    })
  })
})

router.delete('/people', (req, res) => {
  fs.readdir(__dirname + '/../data', (err, files) => {
    if(err) {throw err}
    fs.unlink(__dirname + '/../data/' + files[0], (err) => {
      if(err) {throw err}
      isDeleted = true;
    })
  })
  res.end();
})
//end of functions


describe('Server test suite on POST, GET, PUT, DELETE', () => {
  before(function() {
    router.listen(3000, () => {
      console.log('server started');
    })
  })

  //POSTS
  it('should respond newly created sam.json file in data dir, on POST', (done) => {
    request('localhost:3000')
    .post('/people')
    .send({"name":"sam"})
    .end((err, req) => {
      fs.readdir(__dirname + '/../data', (err, files) => {
        if (err) {throw err}
        expect(err).to.eql(null);
        expect(files.toString()).to.eql('sam.json');
        done();
      })
    })
  })
  // ~~end of post~~

  // GETS
  it('should respond with sam.json, on GET', (done) => {
    request('localhost:3000')
    .get('people')
    .send({"name":"sam"})
    .end((err, res) => {
      fs.readdir(__dirname + '/../data', (err, files) => {
        if (err) {throw err}
        expect(err).to.eql(null);
        expect(files.toString()).to.eql('sam.json');
        done();
      })
    })
  })
  // ~~ end of get~~

  //PUTS
  it('expect name:sam to be name:david, on PUT', (done) => {
    request('localhost:3000')
    .put('/people')
    .send({"name":"david"})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.text).to.eql('{"name":"david"}')
      done();

    })
  })
  // ~~end of put~~


  it('expect global isDeleted boolean set to true, only on DELETE', (done) => {
    request('localhost:3000')
    .delete('/people')
    .end((err, res) => {
      fs.readdir(__dirname + '/../data', (err, files) => {
        if (err) {throw err}
        expect(err).to.eql(null);
        expect(isDeleted).to.eql(true)
        done();
      })
    })
  })

})
