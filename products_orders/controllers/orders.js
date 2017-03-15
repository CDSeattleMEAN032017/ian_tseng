app.controller('orderController', function($scope, productFactory) {
  $scope.products = productFactory.products
  $scope.buy = function(index) {
    productFactory.buy(index, function() {
      $scope.products = productFactory.products;
    })
  }
})
