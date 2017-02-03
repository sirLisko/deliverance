import angular from 'angular'
import 'bootstrap/dist/css/bootstrap.css'

import '../stylesheets/main.css'

import menuController from './modules/menu.controller'
import menuService from './modules/menu.service'
import dishDirective from './modules/dish.directive'

angular.module('deliverance', [])
  .factory('menuService', menuService)
  .directive('dishMenu', dishDirective)
  .controller('DeliveranceController', menuController)
