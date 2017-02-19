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


.controller('UploadController', ['$scope', '$state', 'User', function($scope, $state, User) {
  User.then(function(data) {
    $scope.notes = data.notes;
    $scope.storage = data.storage;
    $scope.classes = data.classes;
    $scope.settings = data.settings;
  });
  console.log("Upload controller called");

  $scope.upload = function() {
    if ($scope.files == undefined && $scope.files.length > 0) {
      console.error("No file selected to upload!");
      return;
    }

    console.log($scope.storage)
    console.log("name: " , $scope.settings);

    var file = $scope.files[0];    
    var name = new Date().getTime().toString() + '.' + file.name.split('.').pop();
    var uploadTask = $scope.storage.child(name).put(file);

    console.log("Upload starting");

    uploadTask.on('state_changed', function(snapshot) {
      // Observe state change events such as progress, pause, and resume
      $scope.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      $scope.$apply();
    }, function(error) {
      // Handle unsuccessful uploads
    }, function() {
      // Handle successful uploads
      var downloadURL = uploadTask.snapshot.downloadURL;
      // Remove token from the url
      downloadURL = downloadURL.substring(0, downloadURL.indexOf('&token'));
      console.log();
      // TODO: Save url without auth, maybe it expires?

      var avatarURLs = ['http://i.imgur.com/PyPhSCs.png','http://i.imgur.com/lPDwzaX.png','http://i.imgur.com/muJxeDj.png','http://i.imgur.com/M6dH3fT.png','http://i.imgur.com/HUpFsdW.png'];
      var itemAvatarURL = avatarURLs[Math.floor(Math.random()*avatarURLs.length)];


      var notes = {
        url: downloadURL,
        filename: name, 
        votes : 0,
        avatarURL: itemAvatarURL
      }

      $scope.files = [];

      $scope.notes.$add(notes);

      $scope.uploadProgress = 0;
      console.log($scope.classes);
      //$scope.classes.class123 = { "notes": [notes] };
      var refTemp = $scope.classes.class123;

      //console.log(refTemp);
      //console.log("classes: " , $scope.classes.class123.notes);
      //console.log("innerClasses: " , $scope.classes.class123.notes[1].url);

      if(refTemp == null || refTemp == undefined)
      {
        $scope.classes.class123 = { "notes": [notes] };
      }
      else
      {
        $scope.classes.class123.notes.push(notes);
      }
      $scope.classes.$save();

     // $scope.modal.hide();

    });
    console.log("Upload done");
  }


}])

.controller('LoginController', ['$scope', 'User', function($scope, User) {
  User.then(function(data) {
    $scope.auth = data.auth;
  });
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







.controller('openNoteController', ['$scope', '$state', 'User', function($scope, $state, User) {
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








.controller('documentsController', ['$scope', '$state','$ionicModal', 'User', function($scope, $state,$ionicModal, User) {
  User.then(function(data) {
    $scope.settings = data.settings;
    $scope.classes = data.classes.class123.notes;
    $scope.classes2 = data.classes;
    //$scope.preview = previewData;
    $scope.customimg = { imgUrl: $scope.classes2.class123.notes[0].url, tags: [], failed: false };
  });

  //var refTemp = $scope.classes.class123;

      //console.log(refTemp);
      //console.log("classes: " , $scope.classes.class123.notes);
      //console.log("innerClasses: " , $scope.classes.class123.notes[0].url);
      //refTemp = refTemp.notes;
      $scope.upvote = function(tempFileName)
      {
        console.log("Awesome voting to happen here" + tempFileName);
        for (var i=0;i<$scope.classes2.class123.notes.length;i++)
        {
          console.log("This iterator is working " + tempFileName + " This filename is " + $scope.classes2.class123.notes[i].filename);
           
          
          if(tempFileName == $scope.classes2.class123.notes[i].filename)
          {
            console.log("Coming inside to vote");
            $scope.classes[i].votes++;
            $scope.classes2.class123.notes[i].votes++;
          }
          $scope.classes2.$save();

        } 
      }



$ionicModal.fromTemplateUrl('templates/custom-gif.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
    //$scope.classes2 = data.classes;
    
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  // Reset modal on hide
  $scope.$on('modal.hidden', function() {
    $scope.customimg = { imgUrl: $scope.classes2.class123.notes[0].url, tags: [], failed: false };
  });
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
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
  $scope.story = app_hunts.HuntData.TreaureHunt[app_hunts.HuntData.current_hunt].Description;

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

  $scope.characters = app_hunts.HuntData.TreaureHunt[app_hunts.HuntData.current_hunt].Characters;

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
    $state.go('app.openNote');
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

     // $scope.character = app_hunts.HuntData.TreaureHunt[app_hunts.HuntData.current_hunt].Characters[data.settings.user.characterIndex];
    });
  });

  //$scope.position = "1st";

}])

;
