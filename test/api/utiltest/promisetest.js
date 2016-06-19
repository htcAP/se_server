var Promise = require('bluebird');
console.log(Promise)
Promise.resolve('1')
  .then(function(res){
    console.log(res)
    return Promise.resolve('2')
  })
  .then(function(res){
    console.log(res)
  })
