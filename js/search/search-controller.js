
angular.module('bestbuyApp')

.controller('SearchCtrl', function($scope, $log, SearchService, $ionicSlideBoxDelegate, LocalStorageService){
    
    //sync $scope with $localStorage 'logList'
    if(LocalStorageService.getStorageList('logList')){
        $scope.logs = JSON.parse(LocalStorageService.getStorageList('logList'));
    }
    else{
        $scope.logs = [];
    }
    //upon receiving the data
	$scope.data = {search: ''};
	$scope.products = [];
	$scope.search = function(term){
		if(term){
			SearchService.search(term)
				.success(function(data){
					$log.info(data);
					$scope.products = data.products;
                    //to make slide box work properly
                    setTimeout(function() {
                        $ionicSlideBoxDelegate.slide(0);
                        $ionicSlideBoxDelegate.update();
                        $scope.$apply();
                    });
                    //save success into localstorage
                    $scope.message = "Searched: " + term + " and returned " + data.total + " results."
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