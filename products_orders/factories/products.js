app.factory('productFactory', function() {
  var factory = {};
  factory.products = [];
  factory.add = function(product, callback) {
    factory.products.push({
      name: product.name,
      price: product.price,
      quant: 50,
      date_added: new Date()
    })
    callback();
  }
  factory.remove = function(index, callback) {
    factory.products.splice(index,1)
    callback();
  }
  factory.buy = function(index, callback) {
    if(factory.products[index].quant > 0) {
      factory.products[index].quant--;
    }
    callback();
  }
  return factory;
})
