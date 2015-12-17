export default (app) => {
  app.get('/', app.MainController.index);

  app.get('/*', (req, res) => {
    res.send(404);
  });
}
