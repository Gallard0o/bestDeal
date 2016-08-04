(function() {
  'use strict';

  angular
    .module('bestdeal')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, $scope, $window) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1470059445439;
    vm.showToastr = showToastr;

    init();

    function init() {
      angular.extend($scope, vm);
      angular.element($window).bind('resize', function() {
        resizeMainContent();
      });

    }


    function resizeMainContent() {
      $scope.navBarHeight = getnavBarHeight('mainNavBar');
      console.log('navbar: ', $scope.navBarHeight );
    }


    function getnavBarHeight(navBarClass) {
      var navBarHeight = angular.element(document.getElementsByClassName(navBarClass)[0].offsetHeight);
      if (navBarHeight.length>0) {
        return navBarHeight[0] + 'px';
      }
    }

    activate();

    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
})();
