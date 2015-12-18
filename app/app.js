// libraries
import _ from 'lodash';
import Bottle from 'bottlejs';
// local
import { mergeConfiguration } from './utils/config';
import Server from './server';

// instantiate bottle instance
const bottle = new Bottle();

const configuration = mergeConfiguration(process.env, {
    HTTP_PORT: 8080,
    NODE_ENV: 'dev',
});

// define configuration options in bottle
_.forEach(configuration, (value, key) => bottle.value(key, value));

// define bottle services
bottle.service('server', Server, 'HTTP_PORT');

// start the server
bottle.container.server.start().then(stop => {
    process.on('SIGTERM', () => stop());

    console.log('such http very traffic');
});
