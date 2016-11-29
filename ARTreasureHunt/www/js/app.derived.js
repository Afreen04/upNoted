
function configureStates($stateProvider) 
{
   $stateProvider

   .state('app', {    // Abstract App Root
      url: '/app',
      
      abstract: true,
      templateUrl: 'templates/menu.html',
      resolve: {
        function(User) {
          return User;
        }
      }
    
    })
    
   .state('app.home', {    // User home page - lists possible hunts?
      url: '/home',
      
        views: {
        'menuContent': {
          templateUrl: 'templates/dashboard.html',
          controller: 'DashboardController'
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
    
   .state('app.admin', {    // Abstract Admin Root
      url: '/admin',
      
      abstract: true,
      templateUrl: 'templates/admin-menu.html',
      resolve: {
        function(User) {
          return User;
        }
      }
    
    })
    
   .state('app.admin.home', {    // Administrative home page
      url: '/home',
      
        views: {
        'menuContent': {
          templateUrl: '',
          controller: ''
        }
      }

      
    
    })
    
   .state('app.admin.users', {    // A list of users planing the game (and all their associated meta data)
      url: '/users',
      
        views: {
        'menuContent': {
          templateUrl: 'templates/users.html',
          controller: 'UsersController'
        }
      }

      
    
    })
    
   .state('app.admin.users.user', {    // A hunt taking place in a city
      url: '/:user',
      
        views: {
        'menuContent': {
          templateUrl: 'templates/user.html',
          controller: 'UserController'
        }
      }

      
    
    })
    
   .state('app.admin.hunts', {    // A list of hunts, taking place in some city
      url: '/hunts',
      
        views: {
        'menuContent': {
          templateUrl: 'templates/hunts.html',
          controller: 'HuntsController'
        }
      }

      
    
    })
    
   .state('app.admin.hunts.hunt', {    // A hunt taking place in a city
      url: '/:hunt',
      
        views: {
        'menuContent': {
          templateUrl: 'templates/hunt.html',
          controller: 'HuntController'
        }
      }

      
    
    })
    
   .state('app.admin.hunts.hunt.huntplanner', {    // A hunt planner which allows one to easily add/edit puzzles for a hunt
      url: '/huntplanner',
      
        views: {
        'menuContent': {
          templateUrl: 'templates/huntplanner.html',
          controller: 'HuntPlannerController'
        }
      }

      
    
    })
    
   .state('app.admin.cities', {    // A list of cities where hunts are
      url: '/cities',
      
        views: {
        'menuContent': {
          templateUrl: 'templates/cities.html',
          controller: 'CitiesController'
        }
      }

      
    
    })
    
   .state('app.admin.cities.city', {    // A city in which a hunt may (or may not) take place.
      url: '/:city',
      
        views: {
        'menuContent': {
          templateUrl: 'templates/city.html',
          controller: 'CityController'
        }
      }

      
    
    })
    
   .state('app.admin.characters', {    // A list of charcter templates used
      url: '/characters',
      
        views: {
        'menuContent': {
          templateUrl: 'templates/chracters.html',
          controller: 'CharactersController'
        }
      }

      
    
    })
    
   .state('app.admin.characters.character', {    // A character available in a hunt
      url: '/:character',
      
        views: {
        'menuContent': {
          templateUrl: 'templates/chracter.html',
          controller: 'CharacterController'
        }
      }

      
    
    })
    
   .state('app.admin.locations', {    // A list of locations a hunt might happen in
      url: '/locations',
      
        views: {
        'menuContent': {
          templateUrl: 'templates/locations.html',
          controller: 'LocationsController'
        }
      }

      
    
    })
    
   .state('app.admin.locations.location', {    // A location within a city.
      url: '/:location',
      
        views: {
        'menuContent': {
          templateUrl: 'templates/location.html',
          controller: 'LocationController'
        }
      }

      
    
    })
    
}
            