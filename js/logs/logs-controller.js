angular.module('bestbuyApp')

.controller('LogsCtrl', function($scope, LocalStorageService) {
    
    if(LocalStorageService.getStorageList('logList')){
        $scope.logs = JSON.parse(LocalStorageService.getStorageList('logList'));
    }
    else{
        $scope.logs = [];
    }
});
