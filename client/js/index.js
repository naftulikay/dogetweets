// styles
import '../less/app.less';

import dogeAnimations from './animations';
import dogeControllers from './controllers';
import dogeServices from './services';

import angular from 'angular';

const dogeApp = angular.module('dogeApp', [
    dogeAnimations.name,
    dogeControllers.name,
    dogeServices.name,
]);

export default dogeApp;
