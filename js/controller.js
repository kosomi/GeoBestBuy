// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('ionicController', function($scope, $cordovaGeolocation, StoreService){

    //obtain geolocation data
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
  
    $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
            $scope.lat  = position.coords.latitude;
            $scope.long = position.coords.longitude; 


            StoreService.getLatLon($scope.lat, $scope.long)
                .success(function(data){ 
                    $scope.results = data.stores;
                    //save success into localstorage
                    $scope.message = data.total + " stores within 5000 miles according to current position: lat: " + $scope.lat + " long: " + $scope.long;
                })

            //save success into localstorage
            $scope.message = "Current position: lat: " + $scope.lat + " long: " + $scope.long;  
        }, function(error) { 
        });

    //upon obtaining geolocation data
    $scope.findNearestStores = function(){ 
        if($scope.lat && $scope.long){
            StoreService.getLatLon($scope.lat, $scope.long)
                .success(function(data){ 
                    $scope.results = data.stores;
                    //save success into localstorage
                    $scope.message = data.total + " stores within 5000 miles according to current position: lat: " + $scope.lat + " long: " + $scope.long;
                })
                .error(function(error){ 
                });
        }
    };
})

.factory('StoreService', function($http){

  var bestBuyAPIpoint = 'http://api.bestbuy.com/v1';
  var key = '5byuvkzrxzdeajsny2tq3bxh';
    
  return{
    getStores: function(city){
      return $http.get(bestBuyAPIpoint + '/stores(city=' + city + ')?format=json&apiKey='+ key);
    },
    getLatLon: function(lat, lon){
        return $http.get(bestBuyAPIpoint + '/stores(area(' + lat + ',' + lon + ',5000))?format=json&show=storeId,name,distance&apiKey=' + key);
    },
    num : 3
  };

});

