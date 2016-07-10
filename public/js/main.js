/*global angular, localStorage*/

angular.module('deliverance', [ ])
.controller('DeliveranceController', function ($http, $scope) {
  var lastOrder

  $scope.dishes = []

  $http.get('/v1/menu').success(function (data) {
    $scope.dishes = data
  })

  function calculateTotals (price) {
    $scope.maxPrice = parseFloat($scope.maxPrice)
    $scope.orderTotal += price
    $scope.maxPrice -= price
    $scope.maxPrice = $scope.maxPrice.toFixed(2)
  }

  $scope.clearOrder = function () {
    $scope.maxPrice = (15).toFixed(2)
    $scope.order = []
    $scope.orderTotal = 0
  }

  $scope.saveOrder = function () {
    localStorage.setItem('lastOrder', angular.toJson({
      'maxPrice': $scope.maxPrice,
      'orderTotal': $scope.orderTotal,
      'order': $scope.order
    }))
  }

  $scope.addToOrder = function (dish) {
    calculateTotals(dish.price)
    $scope.order.push(angular.copy(dish))
    if (dish.extra) {
      dish.extra.forEach(function (el) {
        el.selected = false
      })
    }
  }

  $scope.removeFromOrder = function (dish) {
    calculateTotals(-dish.price)
    var index = $scope.order.indexOf(dish)
    $scope.order.splice(index, 1)
  }

  $scope.addExtra = function (extra, dish, e, order) {
    e.stopPropagation()
    if (extra.selected) {
      extra.selected = false
      dish.price -= extra.price
      if (order) {
        calculateTotals(-extra.price)
      }
    } else {
      if ((order ? 0 : dish.price) + $scope.orderTotal + extra.price > 15) { return false }
      extra.selected = true
      dish.price += extra.price
      if (order) {
        calculateTotals(extra.price)
      }
    }
  }

  if ((lastOrder = localStorage.getItem('lastOrder'))) {
    lastOrder = angular.fromJson(lastOrder)
    $scope.maxPrice = lastOrder.maxPrice
    $scope.orderTotal = lastOrder.orderTotal
    $scope.order = lastOrder.order
  } else {
    $scope.clearOrder()
  }
})

.filter('lt', function () {
  return function (items, value) {
    var filteredItems = []
    angular.forEach(items, function (item) {
      if (item.price <= value) {
        filteredItems.push(item)
      }
    })
    return filteredItems
  }
})
