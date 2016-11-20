angular.module('starter.controllers', [])

.controller('TabCtrl', ['$scope', 'Auth', function($scope, Auth) {
  $scope.auth = Auth;
}])

.controller('DashCtrl', function($scope) {})

.controller('AccountCtrl', ['$scope', 'Auth', function($scope, Auth) {
  $scope.settings = {
    enableFriends: true
  };

  $scope.auth = Auth;
}])

.controller('LoginCtrl', ['$scope', 'Auth', function($scope, Auth) {
  $scope.auth = Auth;
}])

;
