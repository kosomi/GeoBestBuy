angular.module('bestbuyApp')

.factory('StoreService', function($http){
	var bestBuyAPIpoint = 'http://api.bestbuy.com/v1';
	var key = '5byuvkzrxzdeajsny2tq3bxh';
    
	return{
		getStores: function(city){
			return $http.get(bestBuyAPIpoint + '/stores(city=' + city + ')?format=json&apiKey='+ key);
		},
        getLatLon: function(lat, lon){
            return $http.get(bestBuyAPIpoint + '/stores(area(' + lat + ',' + lon + ',5000))?format=json&show=storeId,name,distance&apiKey=' + key);
        }
	};
});