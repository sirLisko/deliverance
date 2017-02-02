export default ($scope, menuService) => {
  const vm = $scope
  let lastOrder

  vm.addExtra = addExtra
  vm.addToOrder = addToOrder
  vm.clearOrder = clearOrder
  vm.removeFromOrder = removeFromOrder
  vm.saveOrder = saveOrder

  menuService.getMenu().then(dishes => { vm.dishes = dishes })

  function calculateTotals (price) {
    vm.maxPrice = parseFloat(vm.maxPrice)
    vm.orderTotal += price
    vm.maxPrice -= price
    vm.maxPrice = vm.maxPrice.toFixed(2)
  }

  function clearOrder () {
    vm.maxPrice = (15).toFixed(2)
    vm.order = []
    vm.orderTotal = 0
  }

  function saveOrder () {
    localStorage.setItem('lastOrder', angular.toJson({
      'maxPrice': vm.maxPrice,
      'orderTotal': vm.orderTotal,
      'order': vm.order
    }))
  }

  function addToOrder (dish) {
    calculateTotals(dish.price)
    vm.order.push(angular.copy(dish))
    if (dish.extra) {
      dish.extra.forEach(function (el) {
        el.selected = false
      })
    }
  }

  function removeFromOrder (dish) {
    calculateTotals(-dish.price)
    var index = vm.order.indexOf(dish)
    vm.order.splice(index, 1)
  }

  function addExtra (extra, dish, e, order) {
    e.stopPropagation()
    if (extra.selected) {
      extra.selected = false
      dish.price -= extra.price
      order && calculateTotals(-extra.price)
    } else {
      if ((order ? 0 : dish.price) + vm.orderTotal + extra.price > 15) { return false }
      extra.selected = true
      dish.price += extra.price
      order && calculateTotals(extra.price)
    }
  }

  if ((lastOrder = localStorage.getItem('lastOrder'))) {
    lastOrder = angular.fromJson(lastOrder)
    vm.maxPrice = lastOrder.maxPrice
    vm.orderTotal = lastOrder.orderTotal
    vm.order = lastOrder.order
  } else {
    clearOrder()
  }
}
