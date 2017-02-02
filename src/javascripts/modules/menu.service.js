export default class MenuService {
  constructor ($http) {
    this.$http = $http
  }

  getMenu () {
    return this.$http.get('/v1/menu').then(data => data.data)
  }
}

MenuService.$inject = ['$http']
