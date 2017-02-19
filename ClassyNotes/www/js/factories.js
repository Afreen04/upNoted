angular.module('starter.factories', [])

.factory('User', ['$firebaseAuth', '$firebaseObject', '$firebaseArray', '$q', '$state', function($firebaseAuth, $firebaseObject,
  $firebaseArray, $q,  $state) {
    var deferred = $q.defer();

    // Init firebase 3.x.x
    var config = {
      apiKey: "AIzaSyBPaRtyxK_yQgDDG-hxI_YroZeh-ClWW94",
      authDomain: "classynotes-3bcc4.firebaseapp.com",
      databaseURL: "https://classynotes-3bcc4.firebaseio.com",
      storageBucket: "classynotes-3bcc4.appspot.com",
      messagingSenderId: "675537432970"
    };
    firebase.initializeApp(config);

    var auth = $firebaseAuth();
    var notes;
    var settings;
    var storage;
    var classes;

    // any time auth status updates, add the user data to scope
    auth.$onAuthStateChanged(function(authData) {
      auth.authData = authData;

      if (authData === null || authData === undefined) {
        deferred.resolve(
          {
            auth: auth,
            notes: notes,
            settings: settings,
            storage: storage,
            classes:classes
          }
        );

        $state.go('app.login');
      } else {
        var USER = authData.uid;
        var ref = firebase.database().ref('users/' + USER + '/');
        settings = $firebaseObject(ref);

        var ref1 = firebase.database().ref('users/' + USER + '/notes');
        notes = $firebaseArray(ref1);

        var storageRef = firebase.storage().ref();
        storage = storageRef.child('users/' + USER + '/uploads');

        var classesRef = firebase.database().ref('classes');
        classes = $firebaseObject(classesRef);

        settings.$loaded().then(function() {
          deferred.resolve(
            {
              auth: auth,
              notes: notes,
              settings: settings,
              storage: storage,
              classes:classes
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
              notes: notes,
              settings: settings,
              storage: storage,
              classes:classes
            }
          );

          $state.go('app.login');
        });
      }
    });

    return deferred.promise;
  }
])


.factory('Favorites', ['$firebaseArray', 'Auth', 'Storage',
  function($firebaseArray, Auth, Storage) {
    var favorites = null;
    var storage = Storage;

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
          if (favorites[i].filename !== undefined && favorites[i].filename !== null) {
            storage().child(favorites[i].filename).delete();
          }
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