
angular.module('bestbuyApp')

.factory('SearchService', function($http){
	var bestBuyAPIpoint = 'http://api.bestbuy.com/v1';
	var key = '5byuvkzrxzdeajsny2tq3bxh';
	return{
		search:function(term){
		  return $http.get(bestBuyAPIpoint + '/products((search=' + term + '))?show=name,sku,salePrice,image&format=json&apiKey='+ key);
		}
	};
});