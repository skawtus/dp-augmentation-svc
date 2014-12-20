snowpack
========

__A lambda function written in NodeJs that runs in [AWS Lambda](http://aws.amazon.com/lambda/)__

![Snowpack](snowpack.jpg)

1. Augments stored tracking data with additional information (geo, weather, etc) following the patterns
   * [chain of responsibility](http://en.wikipedia.org/wiki/Chain-of-responsibility_pattern) using [chainof](https://www.npmjs.com/package/chainof)
   * [decorator](http://en.wikipedia.org/wiki/Decorator_pattern) using [extender](https://www.npmjs.com/package/extender)
2. Stores result in [S3](http://aws.amazon.com/s3/)
