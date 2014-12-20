var ChainOf = require("chainof"),
    curl = require("node-curl"),
    extender = require("extender"),
    chain = new ChainOf();


function run(event, context) {

    function init(){
        chain.clear();
        chain.use(geo);
        chain.use(store);

    }

    function store(obj, next){
         //send args to s3 store
        context.done(null, 'out:'+JSON.stringify(obj,null,'   '));
    }

    function geo(obj, next){

        try{
            curl("ipinfo.io/"+obj.ip, function() {
                obj.geo = JSON.parse(this.body);
                next(obj);
            });
        } catch( e ){
            console.log(e);
            next(obj);
        }

    }

    init();
    chain.run(event);

};


function handler(event, context) {
    console.log("in: "+JSON.stringify(event, null, '  '));
    run( event, context );
}

exports.handler = handler;