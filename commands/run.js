var child = require('child_process');
var fs = require('fs');
var path = require('path');
var state = require('../lib/state');
var docker = require('../lib/docker');

module.exports = function(topic) {
  return {
    topic: topic,
    command: 'run',
    description: 'runs the built docker image',
    help: `help text for ${topic}:run`,
    variableArgs: true,
    run: function(context) {
      var imageId = state.get(context.cwd).runImageId;
      runCommand(imageId, context.cwd, context.args);
    }
  };
};

function runCommand(imageId, cwd, args) {
  var command = args.join(' ');
  var execString = `docker run -p 3000:3000 -v ${cwd}:/app/src -w /app/src --rm -it ${imageId} ${command} || true`;
  console.log(execString);
  child.execSync(execString, {
    stdio: [0, 1, 2]
  });
}
