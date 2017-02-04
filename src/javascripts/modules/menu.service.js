export default class MenuService {
  constructor ($http) {
    this.$http = $http
  }

  getMenu () {
    return this.$http.get('/v1/menu').then(data => data.data)
  }

  static menuServiceFactory ($http) {
    return new MenuService($http)
  }
}

MenuService.menuServiceFactory.$inject = ['$http']
