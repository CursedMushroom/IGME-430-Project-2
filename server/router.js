const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/mushroom', mid.requiresLogin, controllers.Mushroom.gamePage);

  app.post('/updateGameInfo', mid.requiresLogin, controllers.Mushroom.updateGameInfo);

  app.post('/updateAds', mid.requiresLogin, controllers.Mushroom.updateAds);

  app.get('/loadGameData', mid.requiresLogin, controllers.Mushroom.getGameData);

  app.post('/changePassword', mid.requiresLogin, controllers.Mushroom.changePassword);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);

  // 404
  app.get('/*', controllers.Account.notFound);
};

module.exports = router;
