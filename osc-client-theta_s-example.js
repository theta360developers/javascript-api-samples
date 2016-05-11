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
