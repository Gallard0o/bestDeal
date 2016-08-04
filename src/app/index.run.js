(function() {
  'use strict';

  angular
    .module('bestdeal')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
