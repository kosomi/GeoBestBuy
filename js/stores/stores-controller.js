angular.module('bestbuyApp')

.controller('StoresCtrl', function($scope, $log, LocalStorageService, StoreService, $cordovaGeolocation) {
    
    //sync $scope with $localStorage 'logList'
    if(LocalStorageService.getStorageList('logList')){
        $scope.logs = JSON.parse(LocalStorageService.getStorageList('logList'));
    }
    else{
        $scope.logs = [];
    }
    
    //obtain geolocation data
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
            $scope.lat  = position.coords.latitude
            $scope.long = position.coords.longitude
            $log.info($scope.lat + ',' + $scope.long);
            //save success into localstorage
            $scope.message = "Current position: lat: " + $scope.lat + " long: " + $scope.long;
            $scope.logs.push({"message": $scope.message});
            LocalStorageService.setStorageList('logList', JSON.stringify($scope.logs));
        }, function(error) {
            $log.error(error);
            //save errors into localstorage
            $scope.message = "Geolocation error: " + $log.error(error);
            $scope.logs.push({"message":  $scope.error});
            LocalStorageService.setStorageList('logList', JSON.stringify($scope.logs));
        });
   
    
    //upon obtaining geolocation data
    $scope.findNearestStores = function(){
        if($scope.lat && $scope.long){
            StoreService.getLatLon($scope.lat, $scope.long)
                .success(function(data){
                    $log.info(data);
                    $scope.results = data.stores;
                    //save success into localstorage
                    $scope.message = data.total + " stores within 5000 miles according to current position: lat: " + $scope.lat + " long: " + $scope.long;
                    $scope.logs.push({"message": $scope.message});
                    LocalStorageService.setStorageList('logList', JSON.stringify($scope.logs));
                })
                .error(function(error){
                    $log.error(error);
                    //save errors into localstorage
                    $scope.error = $log.error(error);
                    $scope.logs.push({"message":  $scope.error});
                    LocalStorageService.setStorageList('logList', JSON.stringify($scope.logs));
                });
        }
    }
       
    //upon receiving store data
    $scope.data = {search: ''};
    $scope.stores = [];
    $scope.search = function(city){
        if(city){
            StoreService.getStores(city)
                .success(function(data){
                    $log.info(data);
                    $scope.stores = data.stores;
                    //save success into localstorage
                    $scope.message = "Searched: " + city + " and returned " + data.total + " results."
                    $scope.logs.push({"message": $scope.message});
                    LocalStorageService.setStorageList('logList', JSON.stringify($scope.logs));
                })
                .error(function(error){
                    $log.error(error);
                    //save errors into localstorage
                    $scope.error = $log.error(error);
                    $scope.logs.push({"message":  $scope.error});
                    LocalStorageService.setStorageList('logList', JSON.stringify($scope.logs));
                });
        }
        else{
            $log.error('some errors');
        }
    }
});