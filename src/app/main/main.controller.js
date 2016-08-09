(function() {
  'use strict';

  angular
    .module('bestdeal')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, $window, $scope, $mdSidenav, $log, httpService) {
    var vm = this;

    $scope.toggleRight = buildToggler;
    vm.products = [];

    $scope.close = function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close()
        .then(function() {
          $log.debug("close RIGHT is done");
          $scope.sidenavOpened = false;
        });
    };

function searchByCode(query){
  httpService.searchByCode(vm.selectedProduct.sku).then(function(response){
    console.log(response.data.products[0])
    vm.selectedProduct=response.data.products[0];
  })
}

    function buildToggler(index) {
      vm.selectedProductIndex = index;
          vm.selectedProduct = vm.products[index];
      searchByCode(vm.selectedProduct.sku);

      if (!$scope.sidenavOpened) {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('right')
          .toggle()
          .then(function() {
            $scope.sidenavOpened = !$scope.sidenavOpened;
            $log.debug("toggle " + 'right' + " is done");
          });
      }

    }

    vm.buildToggler = buildToggler

    vm.nextProduct = nextProduct;

    function nextProduct() {
      if (vm.selectedProductIndex < (vm.products.length - 1)) {
        vm.selectedProductIndex++;
        vm.selectedProduct = vm.products[vm.selectedProductIndex];
        searchByCode(vm.selectedProduct.sku);
      }
    }

    vm.previousProduct = previousProduct;

    function previousProduct() {
      if (vm.selectedProductIndex > 0) {
        vm.selectedProductIndex--;
        vm.selectedProduct = vm.products[vm.selectedProductIndex];
        searchByCode(vm.selectedProduct.sku);
      }
    }

    vm.search = search;

    function search(query) {
      if (query) {
        httpService.searchByName(query).then(function(data){
          vm.products=data.data.products;
          console.log(data.data.products)
        });
      }
    }
    /*busqueda ebay*/

    //cierres
  }
})();
