'use strict';
module.exports = function (app, web3) {
  var controller = require('../controllers/controller')(web3);
  // todoList Routes
  // app.route('/register')
  //   .post(controller.register);
  app.route('/regisSuperAdmin')
    .post(controller.regisSuperAdmin);
  app.route('/regisAdmin')
    .post(controller.regisAdmin);
   app.route('/regisStaff')
    .post(controller.regisStaff);
  app.route('/login')
    .post(controller.login);
  app.route('/logout')
    .post(controller.logout);
  app.route('/verify')
    .get(controller.verify);
 app.route('/user')
    .get(controller.getUser);
};
