/*global angular, localStorage*/

(function(){
	'use strict';

	var app = angular.module('deliverance', [ ]);

	app.controller('DeliveranceController', ['$http', '$scope', function($http, $scope){
    	var lastOrder;

		$scope.dishes = [];

    	$scope.maxPrice = 15.00;
		$scope.orderTotal = 0;
		$scope.order = [];

		if(lastOrder = localStorage.getItem('lastOrder')) {
			lastOrder = JSON.parse(lastOrder);
			$scope.maxPrice = lastOrder.maxPrice;
			$scope.orderTotal = lastOrder.orderTotal;
			$scope.order = lastOrder.order;
		}

		$http.get('/v1/menu').success(function(data){
			$scope.dishes = data;
		});

		$scope.clearOrder = function(){
			$scope.maxPrice = 15.00;
			$scope.order = [];
			$scope.orderTotal = 0;
		};

		$scope.saveOrder = function(){
			localStorage.setItem('lastOrder', JSON.stringify({
				'maxPrice': $scope.maxPrice,
				'orderTotal': $scope.orderTotal,
				'order': $scope.order
			}));
		};

		$scope.addToOrder = function(dish){
			$scope.orderTotal += dish.price;
			$scope.maxPrice -= dish.price;
			$scope.order.push(angular.copy(dish));
			if (dish.extra) {
				dish.extra.forEach(function(el){
					el.selected = false;
				});
			}
		};

		$scope.removeFromOrder = function(dish){
			$scope.orderTotal -= dish.price;
			$scope.maxPrice += dish.price;
			var index = $scope.order.indexOf(dish);
			$scope.order.splice(index, 1);
		};

		$scope.addExtra = function(extra, dish, e, order){
			e.stopPropagation();
			if (extra.selected) {
				extra.selected = false;
				dish.price -= extra.price;
				if (order) {
					$scope.orderTotal -= extra.price;
					$scope.maxPrice += extra.price;
				}
			} else {
				if ((order ? 0 : dish.price) + $scope.orderTotal + extra.price > 15) { return false; }
				extra.selected = true;
				dish.price += extra.price;
				if (order) {
					$scope.orderTotal += extra.price;
					$scope.maxPrice -= extra.price;
				}
			}
		};
	}]);

	app.filter('lt', function () {
		return function ( items, value ) {
			var filteredItems = [];
			angular.forEach(items, function ( item ) {
				if ( item.price <= value ) {
					filteredItems.push(item);
				}
			});
			return filteredItems;
		};
	});

})();
