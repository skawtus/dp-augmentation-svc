var ChainOf = require("chainof"),
    curl = require("node-curl"),
    extender = require("extender"),
    weathers = require("weathers"),
    chain = new ChainOf();


function run(event, context) {

    function init(){
        chain.clear();
        chain.use(geo);
        chain.use(weather);
        chain.use(store);

    }

    function store(obj, next){
         //send args to s3 store
       // next(obj);
        context.done(null, 'out:'+JSON.stringify(obj,null,'   '));
    }

    function weather(obj, next){

        try{
            weathers.getWeather(obj.geo.lat,obj.geo.lon, function(err, data){
                obj.weather = data.currentobservation;
                next(obj);
            });
        } catch( e ){
            console.log(e);
            next(obj);
        }
    }
    function geo(obj, next){

        try{
            curl("ipinfo.io/"+obj.ip, function() {
                obj.geo = JSON.parse(this.body);
                var coords = obj.geo.loc.split(",");
                obj.geo.lat = coords[0];
                obj.geo.lon = coords[1];
                delete obj.geo.loc;
                delete obj.geo.ip;
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