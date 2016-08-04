(function() {
  'use strict';

  angular
    .module('bestdeal')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('principal', {
        url: '/principal',
        templateUrl: 'app/principal/principal.html',
        controller: 'PrincipalController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
