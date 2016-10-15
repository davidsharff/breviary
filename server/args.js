'use strict';

const {ArgumentParser} = require('argparse');
const packageJson = require('../package.json');

let parsedArgs;

function getArgs() {
  return parsedArgs = parsedArgs || parseArgs();
}

module.exports = {
  getArgs
};

function parseArgs() {
  const {NODE_ENV} = process.env;
  if (NODE_ENV && (NODE_ENV != 'development' && NODE_ENV != 'production')) {
    throw new Error(
      `Unrecognized value for environmental variable NODE_ENV: "${NODE_ENV}".\n` +
      `NODE_ENV must be "development" or "production"`
    );
  }

  const argParser = new ArgumentParser({
    version: packageJson.version,
    description: packageJson.description,
    addHelp: true
  });

  argParser.addArgument(
    ['-dev', '--development' ],
    {
      help: 'Run in development mode',
      action: 'storeTrue'
    }
  );

  argParser.addArgument(
    ['-prod', '--production'],
    {
      help: 'Run in production mode',
      action: 'storeTrue'
    }
  );

  argParser.addArgument(
    ['-p', '--port'],
    {
      help: 'Port',
      defaultValue: '8080'
    }
  );

  const args = argParser.parseArgs();

  if (args.production && args.development) {
    console.error('Both production and development modes were specified');
    process.exit();
  }

  return {
    isDevEnv: args.development || args.production
      ? args.development
      : (NODE_ENV ? NODE_ENV === 'development' : true),
    port: args.port
  };
}