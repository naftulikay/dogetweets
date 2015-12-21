// libraries
import _ from 'lodash';
import Bottle from 'bottlejs';
import Redis from 'ioredis';
import winston from 'winston';
// local
import { mergeConfiguration } from './utils/config';
import Server from './server';

// instantiate bottle instance
const bottle = new Bottle();

const configuration = mergeConfiguration(process.env, {
    HTTP_PORT: 8080,
    NODE_ENV: 'dev',
    TWITTER_API_KEY: '',
    TWITTER_API_SECRET: '',
});

// define configuration options in bottle
_.forEach(configuration, (value, key) => bottle.value(key, value));

winston.level = configuration.NODE_ENV === 'dev' ? 'debug' : 'warn';

// define bottle services
bottle.service('redis', Redis);
bottle.service('server', Server, 'HTTP_PORT', 'NODE_ENV', 'TWITTER_API_KEY', 'TWITTER_API_SECRET', 'redis');

// start the server
bottle.container.server.start().then(stop => {
    process.on('SIGTERM', () => stop());

    console.log('such http very traffic');
});
