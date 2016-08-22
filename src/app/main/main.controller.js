(function() {
  'use strict';

  angular
    .module('bestdeal')
    .filter('byCondition', function() {
      return function(options, filters) {
        var items = {
          filters: filters,
          out: []
        };
        angular.forEach(options, function(value, key) {
          if (this.filters[value.condition] === true) {
            this.out.push(value);
          }
        }, items);
        return items.out;
      };
    })
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, $window, $scope, $mdSidenav, $log, httpService) {
    var vm = this;
    vm.isNew = false;
    $scope.toggleRight = buildToggler;
    var originatorEv;
    vm.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
    vm.products = [];
    vm.filters = [{
      title: 'mejor coincidencia',
      sort: '',
      reverse: false
    }, {
      title: 'mejor calificación',
      sort: 'rating',
      reverse: true
    }, {
      title: 'mayor a menor precio',
      sort: 'options[0].price',
      reverse: true
    }, {
      title: 'menor a mayor precio',
      sort: 'options[0].price',
      reverse: false
    }, {
      title: 'de la A a la Z',
      sort: 'title',
      reverse: false
    }, {
      title: 'de la Z a la A',
      sort: 'title',
      reverse: true
    }];

    vm.sortBy = function(propertyName, reverse, title) {
      vm.propertyName = propertyName;
      vm.reverseOrder = reverse;
      vm.filterTitle = title;
    };

    vm.secondfilters = [{
      title: 'Todo'
    }, {
      title: 'Nuevo'
    }, {
      title: 'Usado'
    }];

    vm.productlinks = [{
      logo: 'assets/images/bestbuylogo.png',
      condition: 'usedProduct'
    }, {
      logo: 'assets/images/ebay.png',
      condition: 'refurbushedProduct'
    }, {
      logo: 'assets/images/amazon.png',
      condition: 'newProduct'
    }];

    vm.checkboxes = [{
      title: 'NUEVO',
      class: 'checkNew',
      checked: true,
      label: 'Nuevo',
      condition: 'New'
    }, {
      title: 'USADO',
      class: 'checkUsed',
      checked: true,
      label: 'Usado',
      condition: 'Used'
    }, {
      title: 'REACONDICIONADO',
      class: 'checkRefurbished',
      checked: true,
      label: 'Reacondicionado',
      condition: 'Refurbished'
    }, {
      title: 'UNKNOWN',
      class: 'checkUnknown',
      checked: true,
      label: 'Desconocido',
      condition: 'Unknown'
    }];

    vm.conditionFilters = {
      Unknown: true,
      New: true
    }


    function checkAll() {
      vm.checkboxes.forEach(function(checkbox) {
        checkbox.checked = true;
      });
    }

    vm.checkboxChanged = checkboxChanged

    function checkboxChanged(item) {
      switch (item.condition) {
        case 'Unknown':
          vm.conditionFilters.Unknown = item.checked;
          break;
        case 'New':
          vm.conditionFilters.New = item.checked;
          break;
        case 'Used':
          vm.conditionFilters.Used = item.checked;
          break;
        case 'Refurbished ':
          vm.conditionFilters.Refurbished = item.checked;
          break;
        default:
          break;
      }
    }

    vm.selectedFilter = vm.filter;

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
        checkAll();
        vm.selectedProductIndex = vm.products.indexOf(product);
        vm.selectedProduct = vm.products[vm.selectedProductIndex];
        vm.selectedImage = '';
        if (vm.selectedProduct.images) {
          if (vm.selectedProduct.images[0].length > 0)
            vm.selectedImage = vm.selectedProduct.images[0];
        }
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
      checkAll();
      if (vm.selectedProductIndex < (vm.products.length - 1)) {
        vm.selectedProductIndex++;
        vm.selectedProduct = vm.products[vm.selectedProductIndex];
        vm.selectedImage = '';
        if (vm.selectedProduct.images) {
          if (vm.selectedProduct.images[0].length > 0)
            vm.selectedImage = vm.selectedProduct.images[0];
        }
        //searchByCode(vm.selectedProduct.sku);
      }
    }

    vm.previousProduct = previousProduct;

    function previousProduct() {
      checkAll();
      if (vm.selectedProductIndex > 0) {
        vm.selectedProductIndex--;
        vm.selectedProduct = vm.products[vm.selectedProductIndex];
        vm.selectedImage = '';
        if (vm.selectedProduct.images) {
          if (vm.selectedProduct.images[0].length > 0)
            vm.selectedImage = vm.selectedProduct.images[0];
        }
        //searchByCode(vm.selectedProduct.sku);
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

    $scope.$watch(function() {
      return vm.searchText;
    }, function(current, original) {
      $scope.close();
    });

    /*busqueda ebay*/

    //cierres
  }
})();
