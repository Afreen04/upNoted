
function configureStates($stateProvider) 
{
   $stateProvider

   .state('app', {    // 
      url: '/app',
      
      abstract: true,
      templateUrl: 'templates/menu.html',
      resolve: {
        function(User) {
          return User;
        }
      }
    
    })
    
   .state('app.login', {    // Login for the first time, or log in as returning user
      url: '/login',
      
        views: {
        'menuContent': {
          templateUrl: 'templates/login.html',
          controller: 'LoginController'
        }
      }

      
    
    })
    
   .state('app.story', {    // The narrative that sets up the treasure hunt
      url: '/story',
      
        views: {
        'menuContent': {
          templateUrl: 'templates/story.html',
          controller: 'StoryController'
        }
      }

      
    
    })
    
   .state('app.newuser', {    // Choose a character to play through the hunt
      url: '/newuser',
      
        views: {
        'menuContent': {
          templateUrl: 'templates/newuser.html',
          controller: 'NewUserController'
        }
      }

      
    
    })
    
   .state('app.puzzle', {    // Contains photo, hint, and "I found it!" button
      url: '/puzzle',
      
        views: {
        'menuContent': {
          templateUrl: 'templates/puzzle.html',
          controller: 'PuzzleController'
        }
      }

      
    
    })
    
   .state('app.treat', {    // Upon completion of puzzle, user receives treat (increased discount) and earns points for leaderboard
      url: '/treat',
      
        views: {
        'menuContent': {
          templateUrl: 'templates/treat.html',
          controller: 'TreatController'
        }
      }

      
    
    })
    
   .state('app.gameover', {    // Congratulations! You finished the hunt. You were the nth finisher.
      url: '/gameover',
      
        views: {
        'menuContent': {
          templateUrl: 'templates/gameover.html',
          controller: 'GameOverController'
        }
      }

      
    
    })
    
   .state('app.leaderboard', {    // Lists usernames and points earned for the player's hunt.
      url: '/leaderboard',
      
        views: {
        'menuContent': {
          templateUrl: 'templates/leaderboard.html',
          controller: 'LeaderboardController'
        }
      }

      
    
    })
    
   .state('app.lifecode', {    // Enter code from vendor to gain a new life
      url: '/lifecode',
      
        views: {
        'menuContent': {
          templateUrl: 'templates/lifecode.html',
          controller: 'LifecodeController'
        }
      }

      
    
    })
    
   .state('app.redeem', {    // Redeem discount code at vendor.  The vendor can see the coupon - and validate it with a mobile device - if they choose.
      url: '/redeem',
      
        views: {
        'menuContent': {
          templateUrl: 'templates/redeem.html',
          controller: 'RedeemController'
        }
      }

      
    
    })
    
   .state('app.dashboard', {    // User home page - lists possible hunts?
      url: '/dashboard',
      
        views: {
        'menuContent': {
          templateUrl: 'templates/dashboard.html',
          controller: 'DashboardController'
        }
      }

      
    
    })
    
   .state('app.settings', {    // User preferences and settings
      url: '/settings',
      
        views: {
        'menuContent': {
          templateUrl: 'templates/settings.html',
          controller: 'SettingsController'
        }
      }

      
    
    })
    
   .state('app.logout', {    // Logout
      url: '/logout',
      
        views: {
        'menuContent': {
          templateUrl: 'templates/logout.html',
          controller: 'LogoutController'
        }
      }

      
    
    })
    
}
            