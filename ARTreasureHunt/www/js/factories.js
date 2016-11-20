angular.module('starter.factories', [])

.factory('User', ['$firebaseAuth', '$firebaseObject', '$q', '$state', function($firebaseAuth, $firebaseObject, $q,  $state) {
    var deferred = $q.defer();

    // Init firebase 3.x.x
    var config = {
      apiKey: "AIzaSyC93WY_4dJ2LXpRE8oGExenhM3HdhnHUuo",
      authDomain: "ar-treasure-hunt.firebaseapp.com",
      databaseURL: "https://ar-treasure-hunt.firebaseio.com",
      storageBucket: "ar-treasure-hunt.appspot.com",
      messagingSenderId: "872770693402"
    };
    firebase.initializeApp(config);

    var auth = $firebaseAuth();
    var settings;

    // any time auth status updates, add the user data to scope
    auth.$onAuthStateChanged(function(authData) {
      auth.authData = authData;

      if (authData === null || authData === undefined) {
        deferred.resolve(
          {
            auth: auth,
            settings: settings
          }
        );

        $state.go('app.login');
      } else {
        var USER = authData.uid;
        var ref = firebase.database().ref('users/' + USER + '/');
        settings = $firebaseObject(ref);

        settings.$loaded().then(function() {
          deferred.resolve(
            {
              auth: auth,
              settings: settings
            }
          );

          if (settings.user) {
            $state.go('app.dashboard');
          } else {
            $state.go('app.story');
          }
        }).catch(function(error) {
          deferred.resolve(
            {
              auth: auth,
              settings: settings
            }
          );

          $state.go('app.login');
        });
      }
    });

    return deferred.promise;
  }
])

.factory('geolocationSvc', ['$q', '$window', function ($q, $window) {
  function getCurrentPosition() {
    var deferred = $q.defer();

    if (!$window.navigator.geolocation) {
      deferred.reject('Geolocation not supported.');
    } else {
      $window.navigator.geolocation.getCurrentPosition(
        function (position) {
          deferred.resolve(position);
        },
        function (err) {
          deferred.reject(err);
        });
    }

    return deferred.promise;
  }

  return {
    getCurrentPosition: getCurrentPosition
  };
}])
