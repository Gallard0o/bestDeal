(function() {
  'use strict';

  angular
    .module('bestdeal')
    .controller('MainController', MainController);

    /** @ngInject */
    function MainController($timeout, webDevTec, toastr, $window, $scope, $mdSidenav, $log) {
      var vm = this;
      $scope.toggleRight = buildToggler;
      vm.products = [
    {title: 'CHAMARRA DE PIEL', price: '$300 - $900', img: 'assets/images/chamarra1.jpg'
    },
    {title: 'CHAMARRA DE PIEL', price: '$300 - $900', img: 'assets/images/chamarra2.jpg'
    },
    {title: 'CHAMARRA DE PIEL', price: '$300 - $900', img: 'assets/images/chamarra3.jpg'
    },
    {title: 'CHAMARRA DE PIEL', price: '$300 - $900', img: 'assets/images/chamarra4.jpg'
    },
    {title: 'CHAMARRA DE PIEL', price: '$300 - $900', img: 'assets/images/chamarra5.jpg'
    },
    {title: 'CHAMARRA DE PIEL', price: '$300 - $900', img: 'assets/images/chamarra6.jpg'
    },
    {title: 'CHAMARRA DE PIEL', price: '$300 - $900', img: 'assets/images/chamarra7.jpg'
    },
    {title: 'CHAMARRA DE PIEL', price: '$300 - $900', img: 'assets/images/chamarra8.jpg'
    }
    ];

    $scope.close = function () {
       // Component lookup should always be available since we are not using `ng-if`
       $mdSidenav('right').close()
         .then(function () {
           $log.debug("close RIGHT is done");
          $scope.sidenavOpened=false;
         });
     };

     function buildToggler(product) {
        vm.selectedProduct = product;
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('right')
          .toggle()
          .then(function () {
            $scope.sidenavOpened = !$scope.sidenavOpened;
            $log.debug("toggle " + 'right'+ " is done");
          });

    }

    vm.buildToggler = buildToggler

    /*busqueda ebay*/

      //cierres
    }
  })();
