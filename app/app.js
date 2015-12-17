import bootstrap from './bootstrap';
import bodyParser from 'body-parser';
import express from 'express';
import errorHandler from 'errorhandler';
import http from 'http';
import morgan from 'morgan';
import routes from './routes';

import main from './controllers/main';

const port = process.env.PORT || 8000;
const environment = process.env.NODE_ENV || 'dev';

const app = express();


app.MainController = new main.MainController();

app.set('port', port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined'));

if (environment === 'dev') {
  app.use(errorHandler());
}

routes(app);

http.createServer(app).listen(app.get('port'), () => {
  console.log(`Server started on port ${app.get('port')} for ${environment} environment.`);
});
