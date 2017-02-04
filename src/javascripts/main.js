import angular from 'angular'

import 'bootstrap-only-css'
import '../stylesheets/main.css'

import menuController from './modules/menu.controller'
import MenuService from './modules/menu.service'
import DishDirective from './modules/dish.directive'

angular.module('deliverance', [])
  .controller('DeliveranceController', menuController)
  .factory('menuService', MenuService.menuServiceFactory)
  .directive('dishMenu', () => new DishDirective())
