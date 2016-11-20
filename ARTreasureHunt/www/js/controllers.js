angular.module('starter.controllers', [])

.controller('AppController', function($scope) {
})

.controller('MenuController', ['$scope', 'User', function($scope, User) {
  User.then(function(data) {
    $scope.auth = data.auth;
  });
}])

.controller('LoginController', ['$scope', 'User', function($scope, User) {
  User.then(function(data) {
    $scope.auth = data.auth;
  });
}])

.controller('StoryController', ['$scope', '$state', function($scope, $state) {
  $scope.story = app_hunts.HuntData.TreaureHunt[0].Description;

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

  $scope.characters = app_hunts.HuntData.TreaureHunt[0].Characters;

  $scope.characterChanged = function(index) {
    $scope.currentIndex = index;
  }

  $scope.complete = function() {
    $scope.settings.user = {
      characterName: $scope.name,
      characterIndex: $scope.selectedIndex,
      huntIndex: 0,
      puzzleIndex: 0
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
    $scope.character = app_hunts.HuntData.TreaureHunt[data.settings.user.huntIndex].Characters[data.settings.user.characterIndex];
  });

  $scope.start = function() {
    $state.go('app.puzzle');
  }
}])

.controller('PuzzleController', ['$scope', 'User', function($scope, User) {
  User.then(function(data) {
    $scope.settings = data.settings;
    $scope.huntName = app_hunts.HuntData.TreaureHunt[data.settings.user.huntIndex].Name;
    $scope.puzzle = app_hunts.HuntData.TreaureHunt[data.settings.user.huntIndex].Puzzles[data.settings.user.puzzleIndex];
  });

  $scope.verify = function() {
    var response = prompt($scope.puzzle.Question + "\nPlease enter your answer", "");
    if (response != null) {
      var lower = response.toLowerCase();
      var answer = $scope.puzzle.Answer.toLowerCase();

      if (answer === lower) {
        alert("You are correct!");
        $scope.settings.user.puzzleIndex += 1;
        $scope.settings.$save();
      } else {
        alert("You guessed wrongly.\nYou have lost 1 life");
      }
    }
  }
}])

;
