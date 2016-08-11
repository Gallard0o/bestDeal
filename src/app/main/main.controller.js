(function() {
  'use strict';

  angular
    .module('bestdeal')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, $window, $scope, $mdSidenav, $log, httpService) {
    var vm = this;
    vm.isNew=false;
    $scope.toggleRight = buildToggler;
    vm.products = [];
    vm.filters = [
        {title: 'mejor coincidencia'},
        {title: 'mejor calificación'},
        {title: 'mayor a menor precio'},
        {title: 'menor a mayor precio'},
        {title: 'de la A a la Z'},
        {title: 'de la Z a la A'}
      ];

      vm.secondfilters = [
          {title: 'Todo'},
          {title: 'Nuevo'},
          {title: 'Usado'}
        ];

        vm.productlinks = [
            {logo: 'assets/images/bestbuylogo.png', condition:'usedProduct'},
            {logo: 'assets/images/ebay.png', condition:'refurbushedProduct'},
            {logo: 'assets/images/amazon.png', condition:'newProduct'}
          ];

        vm.checkboxes = [
            {title: 'NUEVO', class:'checkNew', model:vm.isNew, label:'Nuevo'},
            {title: 'USADO', class:'checkUsed', model:'isUsed', label:'Usado'},
            {title: 'REACONDICIONADO', class:'checkRefurbished', model:'isRefurbished', label:'Reacondicionado'}
          ];


      vm.selectedFilter=vm.filter ;

    $scope.close = function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close()
        .then(function() {
          $log.debug("close RIGHT is done");
          $scope.sidenavOpened = false;
        });
    };

    function searchByCode(query) {
      httpService.searchByCode(vm.selectedProduct.sku).then(function(response) {
        console.log(response.data.products[0])
        vm.selectedProduct = response.data.products[0];
      })
    }

    function buildToggler(product) {
      if (product) {
        vm.selectedProductIndex = vm.products.indexOf(product);
        vm.selectedProduct = vm.products[vm.selectedProductIndex];
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
        return httpService.searchByName(query).then(function(data) {
          vm.products = data.data.products;
          console.log(data.data.products)
          return vm.products;
        });
      }
    }



    /*busqueda ebay*/

    //cierres
  }
})();
