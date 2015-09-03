import angular from 'angular'
import 'bootstrap/dist/css/bootstrap.css'

import '../stylesheets/main.css'

import menuController from './modules/menu.controller'
import menuService from './modules/menu.service'

angular.module('deliverance', [])
  .factory('menuService', menuService)
  .controller('DeliveranceController', menuController)
