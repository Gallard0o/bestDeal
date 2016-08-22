(function() {
  'use strict';

  angular
    .module('bestdeal')
    .controller('PrincipalController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, $window, $scope, $mdSidenav, $log) {
    var vm = this;
    vm.items = [];
    createItems();


function createItems(){
  for (var i = 0; i < 100; i++) {
    vm.items.push(i);
  }
};

  /*busqueda ebay*/

    //cierres
  }
})();
