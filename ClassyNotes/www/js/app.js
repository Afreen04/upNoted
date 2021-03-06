// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var ionicApp = angular.module('starter', ['ionic', 'starter.controllers', 'starter.factories', 'starter.directives',
  'firebase'])

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

.run(['$rootScope', '$state', 'User', function($rootScope, $state, User) {
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireSignIn promise is rejected
    // and redirect the user back to the home page
    if (error === 'AUTH_REQUIRED') {
      console.log('not authenticated');
      $state.go('app.login');
    }
  });

  // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, error) {
  //   // Prevent going back to the login page after a successful authentication
  //   if (toState.name === 'app.login' && auth !== undefined && auth.authData !== null && auth.authData !== undefined) {
  //     event.preventDefault();
  //   }
  // })
}])

// .config(function($ionicConfigProvider) {
//   $ionicConfigProvider.scrolling.jsScrolling(false);
// })

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      resolve: {
        function(User) {
          return User;
        }
      }
    })

    .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html',
          controller: 'LoginController'
        }
      }
    })

    .state('app.story', {
      url: '/story',
      views: {
        'menuContent': {
          templateUrl: 'templates/story.html',
          controller: 'StoryController'
        }
      },
    })

    .state('app.newuser', {
      url: '/newuser',
      views: {
        'menuContent': {
          templateUrl: 'templates/newuser.html',
          controller: 'NewUserController'
        }
      },
    })

    .state('app.dashboard', {
      url: '/dashboard',
      views: {
        'menuContent': {
          templateUrl: 'templates/dashboard.html',
          controller: 'DashboardController'
        }
      },
    })


    .state('app.leaderboard', {
      url: '/leaderboard',
      views: {
        'menuContent': {
          templateUrl: 'templates/leaderboard.html',
          controller: 'LeaderboardController'
        }
      },
    })

    .state('app.openNote', {
      url: '/openNote',
      views: {
        'menuContent': {
          templateUrl: 'templates/openNote.html',
          controller: 'openNoteController'
        }
      },
    })

    .state('app.upload', {
      url: '/upload',
      views: {
        'menuContent': {
          templateUrl: 'templates/upload.html',
          controller: 'UploadController'
        }
      },
    })

    .state('app.documents', {
      url: '/documents',
      views: {
        'menuContent': {
          templateUrl: 'templates/documents.html',
          controller: 'documentsController'
        }
      },
    })
    
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
})

;
