angular.module('bestbuyApp')

.factory("httpInterceptor", function($q, $rootScope, $log){
        var numLoading = 0;
        return {
            request: function(config){
                numLoading++;
                $rootScope.$broadcast("loader_show");
                return config || $q.when(config)
            },
            response: function(response){
                if((--numLoading) == 0){
                    $rootScope.$broadcast("loader_hide");
                }
                return response || $q.when(response);
            },
            responseError: function(response){
                if(!(--numLaoding)){
                    $rootScope.$broadcast("loader_hide");
                }
                return $q.reject(response);
            }
        };
})

.factory('AuthService', function ($rootScope, LocalStorageService) {
        return {
            checkLogin: function() {
                // Check if logged in and fire events
                if(this.isLoggedIn()) {
                    $rootScope.$broadcast('app.loggedIn');
                } else {
                    $rootScope.$broadcast('app.loggedOut');
                }
            },
            isLoggedIn: function() {
                // Check auth token here from localStorage
                if (LocalStorageService.getStorageList('satellizer-token') === null || LocalStorageService.getStorageList('token') === "undefined") {
                    return true;
                } 
                else {
                    return false;
                };
            },
            logout: function(email, pass) {
                // Same thing, log out user
                $rootScope.$broadcast('app.loggedOut');
            }
        }
    })

.factory('FacebookService', function($auth, $http, $ionicPopup){
    var facebookApiURL = 'https://graph.facebook.com/v2.2';
    
    return {
        me: function(){
            if($auth.isAuthenticated()){
                return $http.get(facebookApiURL + '/me',
                                 { 
                                    params: {
                                            access_token: $auth.getToken(),
                                            fields: 'id, name, link, gender, location, website, picture, relationship_status',
                                            format: 'json'
                                            }
                                });       
            }
            else{
                $ionicPopup.alert({
                    title: 'error',
                    content: 'user not authenticated'   
                });
            }
        }      
    };
});