import angular from 'angular'

import menuController from './modules/menu.controller'
import menuService from './modules/menu.service'

angular.module('deliverance', [])
  .factory('menuService', menuService)
  .controller('DeliveranceController', menuController).name
