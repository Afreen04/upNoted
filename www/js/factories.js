angular.module('starter.factories', [])

.factory('Auth', ['$firebaseAuth', '$state', function($firebaseAuth, $state) {
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

    // any time auth status updates, add the user data to scope
    auth.$onAuthStateChanged(function(authData) {
      auth.authData = authData;

      if (authData === null || authData === undefined) {
        $state.go('tab.login');
      } else {
        $state.go('tab.dash');
      }
    });

    return auth;
  }
])
