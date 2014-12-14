var lambda = require('./lambda');

lambda.handler({
    host: "localhost"
}, {
    done: function(a,b){ console.log(b) }
});
