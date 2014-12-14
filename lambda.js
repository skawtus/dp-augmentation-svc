console.log('Loading snowball.  preparing snowpack');

exports.handler = function(event, context) {
    console.log(event);
    context.done(null, 'snowpack complete');  // SUCCESS with message
};