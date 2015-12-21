import express from 'express';
import logger from 'winston';
import morgan from 'morgan';
import request from 'request';

function getBearerToken(redis, TWITTER_API_KEY, TWITTER_API_SECRET) {
    return redis.get('twitter/bearer_token').then((result) => {
        if (result !== null) {
            // return a promise with the result inside
            logger.debug('redis has a bearer token, sticking with that');
            return new Promise((resolve, reject) => {
                resolve(result);
            });
        } else {
            logger.debug("redis does not have a bearer token, acquiring new oauth token from twitter");

            return new Promise((resolve, reject) => {
                request.post({
                    'url': 'https://api.twitter.com/oauth2/token',
                    'auth': {
                        user: TWITTER_API_KEY,
                        pass: TWITTER_API_SECRET,
                        sendImmediately: true,
                    },
                    'form': {
                        'grant_type': 'client_credentials'
                    },
                }, (error, response, body) => {
                    if (!error) {
                        const accessToken = JSON.parse(body)['access_token'];

                        logger.debug('successfully retrieved oauth access token from twitter');

    //                  set key with TTL of 5 minutes
                        redis.multi().set('twitter/bearer_token', accessToken).expire('twitter/bearer_token', 300)
                            .exec();

    //                  return promise with access token
                        resolve(accessToken);
                    } else {
                        logger.warn('unable to get oauth access token from twitter');
                        logger.debug(body.toString());
                        reject(error, response, body);
                    }
                });
            });
        }
    });
}

export default (HTTP_PORT, NODE_ENV, TWITTER_API_KEY, TWITTER_API_SECRET, redis) => {
    // magic?
    const app = express();
    app.use('/', express.static(__dirname + '../../../public'));
    app.use(morgan(NODE_ENV !== 'dev' ? 'combined' : 'dev'));

    app.get('/api/wow!', (req, resp) => {
        getBearerToken(redis, TWITTER_API_KEY, TWITTER_API_SECRET).then((token, error) => {
            logger.debug('requesting doge tweets');
            request.get({
                'url': 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=DogeTheDog',
                'auth': {
                    bearer: token,
                    sendImmediately: true,
                }
            }, (error, response, body) => {
                if (!error) {
                    resp.status(200).json(body);
                }
            });
        });
    });

    return {
        start() {
            return new Promise((resolve, reject) => {
                app.listen(HTTP_PORT, error => {
                    if (error) {
                        reject(error);
                    } else {
                        // what do
                    }
                });
            });
        },
    };
};
