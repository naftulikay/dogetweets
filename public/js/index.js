// styles
import styles from '../css/app.less';
// stuff
import dogeAnimations from './animations';
import dogeControllers from './controllers';
import dogeServices from './services';

import angular from 'angular';

const dogeApp = angular.module('dogeApp', [
    dogeAnimations.name,
    dogeControllers.name,
    dogeServices.name
]);
