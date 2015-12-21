import angular from 'angular';
import ngResource from 'angular-resource';

const services = angular.module('dogeServices', [ngResource]);

services.factory('Tweet', ['$resource', ($resource) => {
    return $resource('/api/wow!', {}, { isArray: true });
}]);

export default services;
