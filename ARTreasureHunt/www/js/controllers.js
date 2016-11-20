angular.module('starter.controllers', [])

.controller('AppController', function($scope) {
})

.controller('MenuController', ['$scope', '$state', 'User', function($scope, $state, User) {
  User.then(function(data) {
    $scope.auth = data.auth;
    $scope.settings = data.settings;
  });

  $scope.signOut = function() {
    $scope.settings.$destroy();
    $scope.auth.$signOut();
  }

  $scope.reset = function() {
    var response = confirm("Are you sure you want to reset your account?");
    if (response) {
      $scope.settings.$remove().then(function() {
        $state.go('app.story');
      });
    }
  }
}])

.controller('LoginController', ['$scope', 'User', function($scope, User) {
  User.then(function(data) {
    $scope.auth = data.auth;
  });
}])


.controller('RedeemController', ['$scope', 'User', function($scope, User) {
  User.then(function(data) {
    $scope.settings = data.settings;
  });

  var today = new Date();
  var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
  var dd = nextweek.getDate();
  var mm = nextweek.getMonth()+1; //January is 0!
  var yyyy = nextweek.getFullYear();
  if(dd<10) {
      dd='0'+dd
  }
  if(mm<10) {
      mm='0'+mm
  }
  $scope.nextweek = mm+'/'+dd+'/'+yyyy;


  $scope.sponsor = app_hunts.HuntData.TreaureHunt[app_hunts.current_hunt].Sponsor;

  JsBarcode("#barcode", "123456789012", {format: "upc", background: "none"});
}])

.controller('LifeCodeController', ['$scope', '$state', 'User', function($scope, $state, User) {
  User.then(function(data) {
    $scope.settings = data.settings;
  });

  $scope.sponsor = app_hunts.HuntData.TreaureHunt[app_hunts.current_hunt].Sponsor;
  $scope.minamt = "$1";
  $scope.code = "";

  $scope.verifyCode = function() {
    if ($scope.code === "CODE") {
      $scope.settings.user.lives += 1;
      $scope.settings.$save();
    }

    $scope.code = "";
  }
}])

.controller('LeaderboardController', ['$scope', '$state', 'User', function($scope, $state, User) {
  User.then(function(data) {
    $scope.settings = data.settings;
  });

  $scope.users = [
    {
      "name": "User 3",
      "characterName": "Anna Rodriguez",
      "image": "hunt_data/Hunt2/AvatarIcons/AnnaRodriguez.svg",
      "points": 25
    },
    {
      "name": "User 1",
      "characterName": "Hal White",
      "image": "hunt_data/Hunt2/AvatarIcons/HalWhite.svg",
      "points": 20
    },
    {
      "name": "User 5",
      "characterName": "George Beaufort",
      "image": "hunt_data/Hunt2/AvatarIcons/GeorgeBeaufort.svg",
      "points": 15
    },
    {
      "name": "User 4",
      "characterName": "Diamond Jones",
      "image": "hunt_data/Hunt2/AvatarIcons/DiamondJones.svg",
      "points": 10
    },
    {
      "name": "User 2",
      "characterName": "Danny Chang",
      "image": "hunt_data/Hunt2/AvatarIcons/DannyChang.svg",
      "points": 5
    }
  ]
}])

.controller('StoryController', ['$scope', '$state', function($scope, $state) {
  $scope.story = app_hunts.HuntData.TreaureHunt[app_hunts.current_hunt].Description;

  $scope.continue = function() {
    $state.go('app.newuser');
  }
}])

.controller('NewUserController', ['$scope', '$state', 'User', function($scope, $state, User) {
  $scope.name = "";
  $scope.currentIndex = 0;
  $scope.selectedIndex = 0;

  User.then(function(data) {
    $scope.settings = data.settings;
  });

  $scope.characters = app_hunts.HuntData.TreaureHunt[app_hunts.current_hunt].Characters;

  $scope.characterChanged = function(index) {
    $scope.currentIndex = index;
  }

  $scope.complete = function() {
    $scope.settings.user = {
      characterName: $scope.name,
      characterIndex: $scope.selectedIndex,
      huntIndex: 0,
      puzzleIndex: 0,
      lives: 3,
      discount: 0,
      points: 0,
      email: $scope.auth.authData.email
    };

    $scope.settings.$save();
    $state.go('app.dashboard');
  }

  $scope.select = function(index) {
    $scope.selectedIndex = index;
  }
}])

.controller('DashboardController', ['$scope', '$state', 'User', function($scope, $state, User) {
  User.then(function(data) {
    data.settings.$bindTo($scope, "settings").then(function(unbind) {
      $scope.$on('$ionicView.beforeLeave', function() {
        unbind();
      });

      $scope.character = app_hunts.HuntData.TreaureHunt[app_hunts.current_hunt].Characters[data.settings.user.characterIndex];
    });
  });

  $scope.position = "1st";

  $scope.start = function() {
    $state.go('app.puzzle');
  }
}])

.controller('PuzzleController', ['$scope', 'User', 'geolocationSvc', function($scope, User, geolocationSvc) {
  User.then(function(data) {
    data.settings.$bindTo($scope, "settings").then(function(unbind) {
      $scope.$on('$ionicView.beforeLeave', function() {
        unbind();
      });

      $scope.huntName = app_hunts.HuntData.TreaureHunt[app_hunts.current_hunt].Name;
      $scope.puzzle = app_hunts.HuntData.TreaureHunt[app_hunts.current_hunt].Puzzles[$scope.settings.user.puzzleIndex];
      $scope.location = app_hunts.HuntData.TreaureHunt[app_hunts.current_hunt].Locations[$scope.settings.user.puzzleIndex];
    });
  });

  /* Taken from http://stackoverflow.com/questions/27928/ - this formula calculates the distance between lat/lon (in km) */
  $scope.distance = function(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 +
            c(lat1 * p) * c(lat2 * p) *
            (1 - c((lon2 - lon1) * p))/2;

    return 12742 * Math.asin(Math.sqrt(a)) * 1000; // 2 * R; R = 6371 km * 1000 = m
  }

  $scope.checkLoc = function() {
    geolocationSvc.getCurrentPosition().then(function(position) {
      var dist = $scope.distance(position.coords.latitude, position.coords.longitude, $scope.location.Latitude, $scope.location.Longitude);

      console.log(position);
      alert("accuracy: " + position.coords.accuracy + "m, distance: " + dist + "m");

      if (dist < $scope.puzzle.RadiusMeters || dist < position.coords.accuracy) {
        $scope.verify();
      } else {
        alert("Sorry, there is no puzzle nearby :(");
      }
    });
  }

  $scope.verify = function() {
    if ($scope.settings.user.lives > 0) {
      var response = prompt($scope.puzzle.Question + "\nPlease enter your answer", "");
      if (response != null) {
        var lower = response.toLowerCase();
        var answer = $scope.puzzle.Answer.toLowerCase();

        if (answer === lower) {
          $scope.settings.user.puzzleIndex +=1 ;

          // Just in case ;)
          if ($scope.settings.user.discount < 50) {
            $scope.settings.user.discount += 5;
          }

          $scope.settings.user.points += $scope.settings.user.puzzleIndex * 5;

          alert("You are correct!");

          // Update reference to the puzzle
          $scope.puzzle = app_hunts.HuntData.TreaureHunt[app_hunts.current_hunt].Puzzles[$scope.settings.user.puzzleIndex];
        } else {
          $scope.settings.user.lives -= 1;
          alert("You guessed wrongly.\nYou have lost 1 life");
        }
      }
    } else {
      alert("Oh no! You are out of lives.\nYou should go buy some from the store.");
    }
  }
}])

;
