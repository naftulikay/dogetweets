import angular from 'angular';
import dogeServices from './services';

class TweetController {
    constructor($scope, Tweet) {
        $scope.tweets = Tweet.query();
    }
}

const controllers = angular.module('dogeControllers', [dogeServices.name]);

// register controllers
controllers.controller('TweetController', TweetController);

export default controllers;
