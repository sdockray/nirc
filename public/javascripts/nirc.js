angular.module('nirc', ['ngSanitize'])

  .controller('MainCtrl', function($scope, Client, Mousetrap) {
    $scope.client = Client;

    /* these are kind of ugly.  perhaps refactor the statusChannel to be inside the
     * channels[] array to remove some pain here */
    Mousetrap.bind('command+left', function(e) {
      var index = _.indexOf($scope.client.channels, $scope.client.activeChannel);
      var next;

      e.preventDefault();

      if (!Client.channels.length) {
        return;
      }

      if (index > 0) {
        next = Client.channels[index - 1];
      } else if (index === 0) {
        next = Client.statusChannel;
      } else {
        next = Client.channels[Client.channels.length - 1];
      }

      Client.setActive(next);
    });

    Mousetrap.bind('command+right', function(e) {
      var index = _.indexOf($scope.client.channels, $scope.client.activeChannel);
      var next;

      e.preventDefault();

      if (!Client.channels.length) {
        return;
      }

      if (index < 0) {
        next = Client.channels[0];
      } else if (index === Client.channels.length - 1) {
        next = Client.statusChannel;
      } else {
        next = Client.channels[index +  1];
      }
      Client.setActive(next);
    });

  })

  .controller('TabCtrl', function($scope) {

    $scope.iconFor = function(ch) {
      return ch.activity && !$scope.isActive(ch) ? 'fa-comment' : 'fa-comment-o';
    };

    $scope.isActive = function(ch) {
      return $scope.client.activeChannel === ch;
    };

    $scope.setActive = function(ch) {
      return $scope.client.setActive(ch);
    };

  });
