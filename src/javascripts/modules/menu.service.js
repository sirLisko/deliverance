export default ($http) => {
  return {
    getMenu: () => $http.get('/v1/menu').then(data => data.data)
  }
}
