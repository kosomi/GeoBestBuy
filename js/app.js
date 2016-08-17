
angular.module('bestbuyApp', ['ionic', 'satellizer', 'ngStorage', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

//connect to facebook
.config(function($authProvider) {
    $authProvider.facebook({
        clientId: '703928026409537',
        scope: 'email',
        responseType: 'token'
    });
})

//inject httpInterceptor service
.config(function($httpProvider){
    $httpProvider.interceptors.push("httpInterceptor");
})


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

// setup an abstract state for the tabs directive
.state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'LoginCtrl'
  })

  // Each tab has its own nav history stack:
  .state('tab.search', {
    url: '/search',
    views: {
      'tab-search': {
        templateUrl: 'templates/tab-search.html',
        controller: 'SearchCtrl'
      }
    }
  })

  .state('tab.stores', {
      url: '/stores',
      views: {
        'tab-stores': {
          templateUrl: 'templates/tab-stores.html',
          controller: 'StoresCtrl'
        }
      }
    })
    
  .state('tab.logs', {
    url: '/logs',
    views: {
      'tab-logs': {
        templateUrl: 'templates/tab-logs.html',
        controller: 'LogsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('tab/search');

});
