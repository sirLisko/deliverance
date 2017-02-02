export default class MenuController {
  constructor (menuService) {
    this.lastOrder
    menuService.getMenu().then(dishes => { this.dishes = dishes })
    if ((this.lastOrder = localStorage.getItem('lastOrder'))) {
      this.lastOrder = angular.fromJson(this.lastOrder)
      this.maxPrice = this.lastOrder.maxPrice
      this.orderTotal = this.lastOrder.orderTotal
      this.order = this.lastOrder.order
    } else {
      this.clearOrder()
    }
  }

  calculateTotals (price) {
    this.maxPrice = parseFloat(this.maxPrice)
    this.orderTotal += price
    this.maxPrice -= price
    this.maxPrice = this.maxPrice.toFixed(2)
  }

  clearOrder () {
    this.maxPrice = (15).toFixed(2)
    this.order = []
    this.orderTotal = 0
  }

  saveOrder () {
    localStorage.setItem('lastOrder', angular.toJson({
      'maxPrice': this.maxPrice,
      'orderTotal': this.orderTotal,
      'order': this.order
    }))
  }

  addToOrder (dish) {
    this.calculateTotals(dish.price)
    this.order.push(angular.copy(dish))
    if (dish.extra) {
      dish.extra.forEach(el => { el.selected = false })
    }
  }

  removeFromOrder (dish) {
    this.calculateTotals(-dish.price)
    var index = this.order.indexOf(dish)
    this.order.splice(index, 1)
  }

  addExtra (extra, dish, e, order) {
    e.stopPropagation()
    if (extra.selected) {
      extra.selected = false
      dish.price -= extra.price
      order && this.calculateTotals(-extra.price)
    } else {
      if ((order ? 0 : dish.price) + this.orderTotal + extra.price > 15) { return false }
      extra.selected = true
      dish.price += extra.price
      order && this.calculateTotals(extra.price)
    }
  }
}

MenuController.$inject = ['menuService']
