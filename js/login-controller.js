angular.module('bestbuyApp')

.controller('LoginCtrl', function($scope, $ionicModal, $timeout, $log, FacebookService, $ionicLoading, $auth, $ionicPopup, LocalStorageService, AuthService) {

    //sync $scope with $localStorage 'logList'
    if(LocalStorageService.getStorageList('logList')){
        $scope.logs = JSON.parse(LocalStorageService.getStorageList('logList'));
    }
    else{
        $scope.logs = [];
    }
    
    $timeout(function() {
        AuthService.checkLogin();
    }, 1000);

    // Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('templates/login.html', function(modal) {
        $scope.modal = modal;
        }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    $scope.$on('app.loggedIn', function(event) {
        $log.info('LOGGED IN!');
        $scope.modal.hide();
         //save into localstorage
        $scope.logs.push({"message": "LOGGED IN!"});
        LocalStorageService.setStorageList('logList', JSON.stringify($scope.logs));
    });

    $scope.$on('app.loggedOut', function(event) {
        $log.info('NOT LOGGED IN!');
        $scope.modal.show();
        //save into localstorage
        $scope.logs.push({"message": "NOT LOGGED IN!"});
        LocalStorageService.setStorageList('logList', JSON.stringify($scope.logs));
    });
    
    //facebook authetication
    $scope.authenticate = function(provider) {
        $auth.authenticate(provider)
        .then(function(){
             //save into localstorage
            $scope.logs.push({"message": "You have logged in to Facebook"});
            LocalStorageService.setStorageList('logList', JSON.stringify($scope.logs));
            //alert
            $ionicPopup.alert({
            title:'Success',
            content:'You have logged in to Facebook'
           
            });
        })
        .catch(function(response){
            //save into localstorage
            $scope.logs.push({"message": "Error logging in to Facebook"});
            LocalStorageService.setStorageList('logList', JSON.stringify($scope.logs));
            //alert
            $ionicPopup.alert({
            title:'Error',
            content:response.data ? response.data ||
                    response.data.message : response
            });
        });
    };
    
     $scope.isAuthenticated = function(){
        return $auth.isAuthenticated();
    };
    
     $scope.logout = function(){
        return $auth.logout();
    };
    
    $scope.doLogin = function() {    
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);   
    };
    
    //guest login authentication
    $scope.name = "";
    $scope.pass = "";
    $scope.isChecked = false;
    $scope.doGuestLogin = function(){
        if($scope.name == "guest" && $scope.pass == "password"){
            $scope.isChecked = true;
        }
    };
    
    $scope.submit = function(){
        $log.info('Guest login success');
        $scope.closeLogin();
        //save into localstorage
        $scope.logs.push({"message": "Guest login success"});
        LocalStorageService.setStorageList('logList', JSON.stringify($scope.logs));

    };
    
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    //show/hide aunthetication httpInterceptor
    $scope.$on("authentication-failed", function(){
        $auth.logout();
        $scope.login();
    });
    
    $scope.$on("loader_show", function(){
        $ionicLoading.show({template: "loading..."});
    });
    
    $scope.$on("loader_hide", function(){
        $ionicLoading.hide();
    });

});
