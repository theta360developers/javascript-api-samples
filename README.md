THETA S API JavaScript Examples
===============================

Refer to the
[Unofficial API Guide](http://codetricity.github.io/theta-s/index.html)
from the THETA Developers community for more information.

JavaScript will not work from within the browser directly. You must
use Node.js or equivalent.

The THETA S will accept a standard HTTP POST command. You can
access the THETA directly with POST. You do not need these modules.
To get you started faster, there are two different node modules
with source code available that handle the connection and parameters:

1. [osc-client](https://www.npmjs.com/package/osc-client) from turbobeast
2. [osc-client-theta_s](https://www.npmjs.com/package/osc-client-theta_s) from horihiro

Sample code using the node modules in this repository

* osc-client-video-sample.js by Nate Levine
* osc-client-theta_s-example.js by [HoriHiro](https://gitlab.com/u/horihiro)

Information below is from [HoriHiro](https://gitlab.com/u/horihiro), the author
of the code.

# OSC(Open Spherical Camera) APIs client for RICOH THETA S

## Overview

This module is OSC(Open Spherical Camera) APIs client for RICOH THETA S, and based on osc-client.

## Installation

  npm install osc-client-theta_s

## Usage

All of the usage of this module is the same as that of the osc-client, except capturing and download movies.
Following code is example of capturing and download movies.

  var ThetaSOscClient = require('osc-client-theta_s').ThetaSOscClient;

  var _thetaClient = new ThetaSOscClient();
  var sessionId;

  // 1. Get session-id
  _thetaClient.startSession().then(function(res){
    sessionId = res.body.results.sessionId;
    // 2. Change captureMode to "_video"
    return _thetaClient.setOptions(_sessionId, {captureMode:"_video"})
  }).then(function(res){
    // 3. Start capturing
    return _thetaClient.startCapture(_sessionId);
  }).catch(function (error) {
    console.log(error);
  });



  // 1. Stop capturing
  _thetaClient.stopCapture(_sessionId)
  .then(function(res){
    // 2. Get list of contents in a device
    return _thetaClient.listAll({entryCount:1, sort:"newest"});
  }).then(function(res){
    // 3. Download a movie
    return _thetaClient.getVideo(res.body.results.entries[0], "full");
  }).then(function(res){
    // 4. Store the movie
    fs.writeFile(filename, res.body);
  }).then(function(err){
    // 5. Close session
    return client.closeSession(sessionId);
  }).catch(function (error) {
    console.log(error);
  });
