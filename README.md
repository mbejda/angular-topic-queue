# Angular Queue with topic routing and acknowledgement 


## Installation <br>

Bower <br>
`bower install angluar-topic-queue --save`



Add `ngTopicQueue` to your Angular app.
```
angular
  .module('app', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngTopicQueue'
  ])
  
```
Load the `$topicQueue` in your controller.
```
angular.module('app')
  .controller('MainCtrl', function ($topicQueue) {
  /// code
  
  })

```

## Example Usage

Routing to specific topic queues.
```
    $topicQueue.topic('cat').addQueue(function(item){
      console.log('cat ',arguments)
      var self = this;
      self.ack();
    });
    $topicQueue.topic('cat').addItem('cat','cat');
```
Routing to String only queues.
```
    $topicQueue.topic('[a-z]').addQueue(function(item){
      var self = this;
        self.ack();
    });
    $topicQueue.topic('string').addItem('testing','testing');
```
Routing to Number only queues.
```
    $topicQueue.topic('[0-9]').addQueue(function(item){
      var self = this;
        self.ack();
    });
    $topicQueue.topic(3).addItem('5','5');
```

### If you find a problem please open a issue or tweet at me. 


Milos Bejda
http://twitter.com/notmilobejda
http://mbejda.com
