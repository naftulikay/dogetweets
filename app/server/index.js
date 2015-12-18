import express from 'express';
import morgan from 'morgan';

export default (HTTP_PORT, NODE_ENV) => {
    // magic?
    const app = express();
    app.use('/', express.static(__dirname + '../../../public'));
    app.use(morgan(NODE_ENV !== 'dev' ? 'combined' : 'dev'));

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
