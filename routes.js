angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('tabsController.editarTarjeta', {
    url: '/page3',
    views: {
      'tab2': {
        templateUrl: 'templates/editarTarjeta.html',
        controller: 'editarTarjetaCtrl'
      }
    }
  })

  .state('pantalla2', {
    url: '/page4',
    templateUrl: 'templates/pantalla2.html',
    controller: 'pantalla2Ctrl'
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

$urlRouterProvider.otherwise('/page1/page3')


});