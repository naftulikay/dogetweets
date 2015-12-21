// animations
var dogeAnimations = angular.module('dogeAnimations', ['ngAnimate']);

// services
var dogeServices = angular.module('dogeServices', ['ngResource']);

dogeServices.factory('Tweet', ['$resource', function($resource) {
    return $resource('/api/wow!', {}, { isArray: true });
}]);

// controllers
var dogeControllers = angular.module('dogeControllers', ['dogeServices']);

dogeControllers.controller('TweetController', ['$scope', 'Tweet', function($scope, Tweet) {
    $scope.tweets = Tweet.query();
}]);

// main
var dogeApp = angular.module('dogeApp', ['dogeAnimations', 'dogeServices', 'dogeControllers']);
