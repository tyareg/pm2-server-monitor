const {pm2API} = require('./pm2.js');
const result = new pm2API();
result.list().then(function(data){
    console.log(data);
});

// result.restart('index').then(function(data){
//     console.log(data);
// });

// result.stop('index').then(function(data){
//     console.log(data);
// });