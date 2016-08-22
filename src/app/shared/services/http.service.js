(function() {
  'use strict';
  angular.module('bestdeal').service('httpService', Service);
  Service.$inject = ['$http', 'API_CONFIG', '$q'];
  /* @ngInject */
  function Service($http, API_CONFIG, $q) {
    this.searchByName = searchByName;
    this.searchByCode = searchByCode;

    function searchByName(query) {
      var results= []
      if (query) {
        /*return $http.get('https://api.bestbuy.com/v1/products(('+queryString+'))?apiKey='+API_CONFIG.bestbuyAPIkey+'&format=json').success(function(response){
          return response.products;
        });*/
        return $http.get('http://192.168.15.8:8080/api/search/?search='+query).success(function(response){
          return response.products;
        });
      }
    }
    function searchByCode(query) {
      //var results= []
        return $http.get('https://api.bestbuy.com/v1/products(sku='+query+')?format=json&sort=regularPrice.asc&apiKey='+API_CONFIG.bestbuyAPIkey).success(function(response){
          return response.products;
        });

    }

    function queryToKeywords(string) {
      return string.split(" ");
    }

    function builQueryString(keywordArray){
      var queryString='';
      keywordArray.forEach(function(keyword, index, array){
        if(index === array.length-1){
          queryString+='search='+keyword;
        } else {
          queryString+='search='+keyword+'&';
        }
      });
      return queryString;
    }
  }
})();
