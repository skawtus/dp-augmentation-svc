var lambda = require('./lambda');

lambda.handler({
    host: "localhost",
    ip: process.env.LOCAL_IP
}, {
    done: function(a,b){ console.log(b) }
});
