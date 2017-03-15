app.controller('productController', function($scope, productFactory) {
  $scope.products = productFactory.products
  $scope.add = function() {
    productFactory.add($scope.newProduct, function() {
      $scope.products = productFactory.products;
    });
    $scope.newProduct = {}
  }
  $scope.remove = function(index){
    productFactory.remove(index, function() {
      $scope.products = productFactory.products;
    });
  }
})
