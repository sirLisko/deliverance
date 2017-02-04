import template from './dish.directive.html'

export default class DishDirective {
  constructor () {
    this.template = template
    this.restrict = 'E'
    this.replace = true
  }

  link (scope, elm, attr) {
    scope.order = attr.dishMenuOrder
  }
}
