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
        $state.go('app.login');
      } else {
        $state.go('app.newuser');
      }
    });

    return auth;
  }
])

.factory('Settings', ['$firebaseObject', 'Auth',
  function($firebaseObject, Auth) {
    var settings = null;

    Auth.$onAuthStateChanged(function(authData) {
      if (authData !== null) {
        var USER = authData.uid;
        var ref = firebase.database().ref('users/' + USER + '/settings');
        settings = $firebaseObject(ref);
      }
    });

    function getSettings() {
      return settings;
    }

    return getSettings;
  }
])

.factory('Favorites', ['$firebaseArray', 'Auth',
  function($firebaseArray, Auth) {
    var favorites = null;

    Auth.$onAuthStateChanged(function(authData) {
      if (authData !== null) {
        var USER = authData.uid;
        var ref = firebase.database().ref('users/' + USER + '/favorites');
        favorites = $firebaseArray(ref);
      }
    });

    function addFavorite(image) {
      // Strip out stuff that isn't important
      var customImage = {
        imgUrl: image.imgUrl,
        hqImgUrl: image.hqImgUrl,
        originalImgUrl: image.originalImgUrl,
        favorite: image.favorite,
        tags: image.tags,
        // Only used with custom uploaded files
        filename: image.filename || null
      }
      favorites.$add(customImage);
    }

    function removeFavorite(image) {
      for (var i = 0; i < favorites.length; i++) {
        if (favorites[i].originalImgUrl === image.originalImgUrl) {
          favorites.$remove(i);
          return;
        }
      }
      console.error('unable to remove favorite');
    }

    function updateTags(value) {
      var image = value.image;
      var tag = value.tag;

      for (var i = 0; i < favorites.length; i++) {
        if (favorites[i].originalImgUrl === image.originalImgUrl) {
          image.tags = image.tags || [tag];
          favorites[i].tags = image.tags;
          favorites.$save(i);
        }
      }
    }

    function getFavorites() {
      if (favorites === null) {
        return [];
      }
      return favorites;
    }

    function isFavorite(image) {
      for (var i = 0; i < favorites.length; i++) {
        if (favorites[i].originalImgUrl === image.originalImgUrl) {
          return true;
        }
      }

      return false;
    }

    function getTags(image) {
      for (var i = 0; i < favorites.length; i++) {
        if (favorites[i].originalImgUrl === image.originalImgUrl) {
          return favorites[i].tags;
        }
      }

      return [];
    }

    return {
      addFavorite: addFavorite,
      removeFavorite: removeFavorite,
      updateTags: updateTags,
      getFavorites: getFavorites,
      isFavorite: isFavorite,
      getTags: getTags,
    };
  }
])
