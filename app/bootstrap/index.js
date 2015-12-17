import loader from './loader';

export default (app) => {
  app.loader = loader;
  app.loader.autoload(`${__dirname}/../controllers`, app);
}
