describe('Testing topic queue', function () {
  var $topicQueue;
  it('Testing addItem String', function () {
    module('ngTopicQueue');
    inject(function ($injector) {
      $topicQueue = $injector.get('$topicQueue');
      $topicQueue.topic('string').addQueue(function (item) {
        console.log('string ' + item)
        expect(item).toBe('testing string');
        this.ack();
      })
      $topicQueue.topic('string').addItem('testing string');
    });
  });
  it('Testing addItem Integer', function () {
    $topicQueue.topic('[0-9]').addQueue(function (item) {
      console.log('integer ' + item)
      expect(item).toBe('testing integer')
      this.ack();
    })
    $topicQueue.topic(1).addItem('testing integer');
  });
  it('Testing addItem multiple arguments', function () {
    $topicQueue.topic('multiple').addQueue(function (item) {
      expect(arguments.length).toBe(5)
      this.ack();
    })
    $topicQueue.topic('multiple').addItem(1, 2, 3, 4, 5);
  });
})

