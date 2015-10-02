/**
 * Angular Topic Queue
 * @version v0.0.1
 * @author Milos Bejda
 * @twitter http://twitter.com/notmilobejda
 * @license MIT License, http://jseppi.mit-license.org
 */
(function (window, angular, undefined) {
  'use strict';
  angular.module('ngTopicQueue', []).factory('$topicQueue',
    ['$timeout', '$q',
      function ($timeout, $q) {
        var self = this;
        var promises = [];
        self._topics;
        self.topics = [];
        self.queues = {};
        self.delay = 500;
        /**
         *  Private variables
         */
        var processing = false,
          timeoutProm = null;

        var stop = function () {
          if (timeoutProm) {
            $timeout.cancel(timeoutProm);
          }
          processing = false;
          timeoutProm = null;
        };
        var start = function () {
          processing = true;
          timeoutProm = $timeout(self.processQueue, self.delay);
        };

        /**
         * Sets context
         * @param <String>topic
         * @returns {*}
         */
        self.topic = function (topic) {
          self._topic = topic;
          return self;
        };

        /**
         * Creates a new queue
         * @param callback
         * @returns {*}
         */
        self.addQueue = function (callback) {
          self.queues[self._topic] = callback;
          return self;
        };

        /**
         * Adds item to queue
         */
        self.addItem = function () {
          for (var queue in self.queues) {
            var pattern = new RegExp(queue);
            if (pattern.test(self._topic)) {
              self.topics.push({
                args: arguments,
                queue: queue
              });
              if (!processing) {
                start();
              }
            }
          }
        };


        /**
         * Returns size of queue
         * @returns {Number}
         */
        self.size = function () {
          return self.topics.length;
        };


        /**
         * processes queue
         * @returns {boolean}
         */
        self.processQueue = function () {
          if (self.topics.length == 0) {
            return false;
          }
          stop();
          var topicItem = self.topics.shift();
          if (topicItem && self.queues[topicItem.queue]) {
            var wrapper = function (topicItem) {
              var deferred = $q.defer();
              self.queues[topicItem.queue].apply({ack: deferred.resolve}, topicItem.args);
              return deferred.promise;
            };
            var working = wrapper.call(this, topicItem);
            working.then(function (data) {
              processing = false;
              self.processQueue();
            })
          }
        };
        return self;
      }]);

})(window, window.angular);
